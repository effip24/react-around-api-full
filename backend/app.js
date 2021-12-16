const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cards = require("./routes/cards");
const users = require("./routes/users");
const auth = require("./middleware/auth");
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middleware/Logger");

mongoose.connect("mongodb://localhost:27017/aroundb");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());

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
