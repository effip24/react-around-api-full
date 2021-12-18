const Card = require("../models/card");
const NotFoundError = require("../utils/errors/NotFoundError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("No card was found with the given id");
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("No card was found with the given id");
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("No card was found with the given id");
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};
