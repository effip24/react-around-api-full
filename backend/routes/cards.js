const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { validateUrl } = require("../utils/validateUrl");

router.get("/cards", getCards);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().custom(validateUrl),
    }),
  }),
  createCard,
);
router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }),
  deleteCard,
);
router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }),
  dislikeCard,
);
router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }),
  likeCard,
);

module.exports = router;
