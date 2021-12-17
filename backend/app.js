const express = require("express");
const mongoose = require("mongoose");

const helmet = require("helmet");
const cors = require("cors");

const { errors } = require("celebrate");

const cards = require("./routes/cards");
const users = require("./routes/users");
const auth = require("./middleware/auth");
const { login, createUser } = require("./controllers/users");

const { requestLogger, errorLogger } = require("./middleware/Logger");

require("dotenv").config();

const NotFoundError = require("./utils/errors/NotFoundError");

mongoose.connect("mongodb://localhost:27017/aroundb");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors());
app.options("*", cors());

app.use(requestLogger);
app.post("/signin", login);
app.post("/signup", createUser);

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
