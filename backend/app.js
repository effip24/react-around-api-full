const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const { errors } = require("celebrate");

const cards = require("./routes/cards");
const users = require("./routes/users");
const auth = require("./middleware/auth");
const { login, createUser } = require("./controllers/users");

const { requestLogger, errorLogger } = require("./middleware/Logger");
const { validateUrl } = require("./utils/validateUrl");

require("dotenv").config();

const NotFoundError = require("./utils/errors/NotFoundError");

mongoose.connect("mongodb://localhost:27017/aroundb");
const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.json());
app.use(helmet());

app.use(cors());
app.options("*", cors());
app.use(limiter);
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateUrl),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);

// protecting cards and useres
app.use(auth);
app.use("/", cards);
app.use("/", users);

app.get("*", (req, res, next) => {
  next(new NotFoundError("requested resource not found"));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
