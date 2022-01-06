const { NODE_ENV, JWT_SECRET, MONGO_ADDRESS } = process.env;
const rateLimit = require("express-rate-limit");

module.exports.MONGODB_ADDRESS = NODE_ENV === "production" ? MONGO_ADDRESS : "mongodb+srv://effip:Effi200494@cluster0.yfet8.mongodb.net/aroundb?retryWrites=true&w=majority";

module.exports.SECRET = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
