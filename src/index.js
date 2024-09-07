import "../src/pages/index.css";
import { createCard, liked, deleteCard } from "./components/card.js";
import { closeModal, openModal, catchClick } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  disablingButton,
} from "./components/validation.js";
import {
  getProfileInfo,
  getCards,
  insertProfieInfo,
  insertNewCard,
  setNewAvatar,
} from "./components/api.js";

// объекты
const container = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;
let myId = "";
const validationConfig = new Object({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "input_error_active",
});

// кнопки на странице
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image-button");

// поля на странице
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// попапы и кнопки в них
const profilePopup = document.querySelector(".popup_type_edit");
const profilePopupSave = profilePopup.querySelector(
  `${validationConfig.submitButtonSelector}`
);
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupSave = cardPopup.querySelector(
  `${validationConfig.submitButtonSelector}`
);
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_new-avatar");
const avatarPopupSave = avatarPopup.querySelector(
  `${validationConfig.submitButtonSelector}`
);
const popups = [profilePopup, cardPopup, imagePopup, avatarPopup];

// поля попапов
const fieldName = profilePopup.querySelector(
  `${validationConfig.inputSelector}_type_name`
);
const fieldDesc = profilePopup.querySelector(
  `${validationConfig.inputSelector}_type_description`
);
const fullScreenName = imagePopup.querySelector(".popup__caption");
const fullScreenImage = imagePopup.querySelector(".popup__image");

// формы
const editForm = document.forms["edit-profile"];
const addForm = document.forms["new-place"];
const avatarForm = document.forms["new-avatar"];

// слушатели на кнопки на странице
profileEditButton.addEventListener("click", () => {
  clearValidation(editForm, validationConfig);
  fieldName.value = profileName.textContent;
  fieldDesc.value = profileDesc.textContent;
  openModal(profilePopup);
});

addCardButton.addEventListener("click", () => {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(cardPopup);
});

avatarButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  disablingButton(
    avatarForm.querySelector(`${validationConfig.submitButtonSelector}`),
    validationConfig
  );
  openModal(avatarPopup);
});

// слушатели на кнопки попапов
profilePopupSave.addEventListener("click", editInfo);
cardPopupSave.addEventListener("click", addCard);
avatarPopupSave.addEventListener("click", updateAvatar);
popups.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", catchClick);
  item
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(item));
});

// колбеки на кнопки попапов
function editInfo(evt) {
  evt.preventDefault();
  profilePopupSave.textContent = "Сохранение...";
  insertProfieInfo(fieldName.value, fieldDesc.value)
    .then((value) => {
      profileName.textContent = fieldName.value;
      profileDesc.textContent = fieldDesc.value;
      closeModal(profilePopup);
      console.log(value);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopupSave.textContent = "Сохранить";
    });
}

function addCard(evt) {
  evt.preventDefault();
  cardPopupSave.textContent = "Сохранение...";
  const addcard = new Object();
  addcard.name = addForm["place-name"].value;
  addcard.link = addForm.link.value;
  insertNewCard(addcard)
    .then((card) => {
      container.prepend(
        createCard(
          template,
          card,
          deleteCard,
          liked,
          fillingFullScreenModal,
          myId
        )
      );
      addForm.reset();
      disablingButton(
        addForm.querySelector(`${validationConfig.submitButtonSelector}`),
        validationConfig
      );
      closeModal(cardPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardPopupSave.textContent = "Сохранить";
    });
}

function updateAvatar(evt) {
  evt.preventDefault();
  avatarPopupSave.textContent = "Сохранение...";
  setNewAvatar(avatarForm["avatar-link"].value)
    .then((value) => {
      profileImage.style = `background-image: url(${avatarForm["avatar-link"].value})`;
      closeModal(avatarPopup);
      console.log(value);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopupSave.textContent = "Сохранить";
    });
}

function fillingFullScreenModal(item) {
  fullScreenName.textContent = item.cardImage.alt;
  fullScreenImage.alt = item.cardImage.alt;
  fullScreenImage.src = item.cardImage.src;
  openModal(imagePopup);
}

// основной код
enableValidation(validationConfig);
Promise.all([getProfileInfo(), getCards()])
  .then(([res1, res2]) => {
    setProfileInfo(res1);
    setCards(res2);
  })
  .catch((err) => {
    console.error(err);
  });

function setProfileInfo(data) {
  profileName.textContent = data.name;
  profileDesc.textContent = data.about;
  profileImage.style = `background-image: url(${data.avatar})`;
  myId = data._id;
}

function setCards(data) {
  data.forEach((item) => {
    container.append(
      createCard(
        template,
        item,
        deleteCard,
        liked,
        fillingFullScreenModal,
        myId
      )
    );
  });
}
