import "../src/pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, liked, deleteCard } from "./components/card.js";
import { closeModal, openModal, catchClick } from "./components/modal.js";

const container = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector(".popup_type_edit");
const profilePopupSave = profilePopup.querySelector(".popup__button");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupSave = cardPopup.querySelector(".popup__button");
const imagePopup = document.querySelector(".popup_type_image");
const popups = [profilePopup, cardPopup, imagePopup];

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", catchClick);
  item
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(item));
});

const fullScreenName = imagePopup.querySelector(".popup__caption");
const fullScreenImage = imagePopup.querySelector(".popup__image");

profilePopupSave.addEventListener("click", editInfo);
cardPopupSave.addEventListener("click", addCard);

const fieldName = profilePopup.querySelector(".popup__input_type_name");
const fieldDesc = profilePopup.querySelector(".popup__input_type_description");

profileEditButton.addEventListener("click", () => openModal(profilePopup));
addCardButton.addEventListener("click", () => openModal(cardPopup));

const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const editForm = document.forms["edit-profile"];
const addForm = document.forms["new-place"];

editForm.name.value = profileName.textContent;
editForm.description.value = profileDesc.textContent;

initialCards.forEach((item) => {
  container.append(
    createCard(template, item, deleteCard, liked, fillingFullScreenModal)
  );
});

function fillingFullScreenModal(item) {
  fullScreenName.textContent = item.cardImage.alt;
  fullScreenImage.alt = item.cardImage.alt;
  fullScreenImage.src = item.cardImage.src;
  openModal(imagePopup);
}

function editInfo(evt) {
  evt.preventDefault();
  profileName.textContent = fieldName.value;
  profileDesc.textContent = fieldDesc.value;
  closeModal(profilePopup);
}

function addCard(evt) {
  evt.preventDefault();
  const addcard = new Object();
  addcard.name = addForm["place-name"].value;
  addcard.link = addForm.link.value;
  container.prepend(
    createCard(template, addcard, deleteCard, liked, fillingFullScreenModal)
  );
  addForm.reset();
  closeModal(cardPopup);
}
