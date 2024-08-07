import "../src/pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, liked, deleteCard } from "./components/card.js";
import { openModal } from "./components/modal.js";
import { openPopup, closePopup, popup } from "./components/popup.js";

export const container = document.querySelector(".places__list");
export const template = document.querySelector("#card-template").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", openModal);
addCardButton.addEventListener("click", openModal);

export const profileName = document.querySelector(".profile__title");
export const profileDesc = document.querySelector(".profile__description");

export const editForm = document.forms["edit-profile"];
const addForm = document.forms["new-place"];

let addcard = new Object();

export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFullScreen = document.querySelector(".popup_type_image");

initialCards.forEach((item) => {
  container.append(createCard(template, item, deleteCard, liked, openPopup));
});

export function editInfo(evt) {
  evt.preventDefault();
  profileName.textContent = popup.querySelector(
    ".popup__input_type_name"
  ).value;
  profileDesc.textContent = popup.querySelector(
    ".popup__input_type_description"
  ).value;
  closePopup(evt);
}

export function addCard(evt) {
  evt.preventDefault();
  addcard.name = addForm["place-name"].value;
  addcard.link = addForm.link.value;
  container.prepend(createCard(template, addcard, deleteCard, liked, openPopup));
  addForm["place-name"].value = "";
  addForm.link.value = "";
  closePopup(evt);
}
