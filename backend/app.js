const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cards = require("./routes/cards");
const users = require("./routes/users");
const auth = require("./middleware/auth");
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middleware/Logger");

const allowedCors = [
  "www.effip24.students.nomoreparties.site",
  "effip24.students.nomoreparties.site",
  "api.effip24.students.nomoreparties.site",
  "localhost:3000",
];

mongoose.connect("mongodb://localhost:27017/aroundb");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "*");
  }

  if (method === "OPTIONS") {
    // allowing cross-domain requests of any type (default)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  }

  next();
});

app.use(requestLogger);
app.post("/signin", login);
app.post("/signup", createUser);

// protecting cards and useres
app.use(auth);
app.use("/", cards);
app.use("/", users);
app.get("*", (req, res) => {
  res.status(404);
  res.send({ message: "Requested resource not found" });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
