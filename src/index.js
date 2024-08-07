import "../src/pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, liked, deleteCard } from "./components/card.js";
import { closeModal, openModal, catchClick } from "./components/modal.js";

const container = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupFullScreen = document.querySelector(".popup_type_image");
const popups = [popupEditProfile, popupNewCard, popupFullScreen];

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", catchClick);
  item
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(item));
});

const fullScreenName = popupFullScreen.querySelector(".popup__caption");
const fullScreenImage = popupFullScreen.querySelector(".popup__image");

popupEditProfile
  .querySelector(".popup__button")
  .addEventListener("click", editInfo);
popupNewCard.querySelector(".popup__button").addEventListener("click", addCard);

const popupEditProfileName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const popupEditProfileDesc = popupEditProfile.querySelector(
  ".popup__input_type_description"
);

profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
addCardButton.addEventListener("click", () => openModal(popupNewCard));

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
  openModal(popupFullScreen);
}

function editInfo(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileDesc.textContent = popupEditProfileDesc.value;
  closeModal(popupEditProfile);
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
  closeModal(popupNewCard);
}
