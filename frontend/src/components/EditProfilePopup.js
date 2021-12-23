import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormAndValidation from "../utils/FormValidator.js";

const EditProfilePopup = ({ isSending, isOpen, onClose, onUserUpdate }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [isOpen, resetForm, setValues, currentUser.name, currentUser.about]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUserUpdate(values);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Edit profile"
      submit={isSending ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      submitButtonState={isValid ? "" : "popup__submit_inactive"}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        name="name"
        type="text"
        placeholder="name"
        className={`popup__input popup__input_type_text ${errors.name ? "popup__input_type_error" : ""}`}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>{errors.name}</span>
      <input
        required
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        name="about"
        type="text"
        placeholder="About me"
        className={`popup__input popup__input_type_text ${errors.occupation ? "popup__input_type_error" : ""}`}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${errors.occupation ? "popup__input-error_active" : ""}`}>
        {errors.occupation}
      </span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
