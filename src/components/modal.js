// import {
//   popupEditProfile,
//   popupNewCard,
//   popupFullScreen,
//   profileName,
//   profileDesc,
//   editForm,
// } from "../index.js";

// import { editInfo, addCard } from "../index.js";

// export let popup;
// let closeButton;

export function openPopup(evt) {
  const e = evt.currentTarget;
  if (e.className.includes("card")) {
    popup = popupFullScreen;
    popup.querySelector(".popup__image").src = evt.target.src;
    popup.querySelector(".popup__image").alt = evt.target.alt;
    popup.querySelector(".popup__caption").textContent = evt.target.alt;
  } else if (e.className.includes("edit")) {
    popup = popupEditProfile;
    editForm.name.value = profileName.textContent;
    editForm.description.value = profileDesc.textContent;
    popup.querySelector(".popup__button").addEventListener("click", editInfo);
  } else {
    popup = popupNewCard;
    popup.querySelector(".popup__button").addEventListener("click", addCard);
  }
  popup.classList.add("popup_is-animated", "popup_is-opened");
  closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", closePopup);
  popup.addEventListener("click", catchClick);
  document.addEventListener("keydown", tapEscape);
}

export function catchClick(event) {
  if (event.target === event.currentTarget) {
    closeButton.click();
  }
}

export function tapEscape(evv) {
  if (evv.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup); 
  }
}

export function closePopup(event) {
  event.currentTarget.closest(".popup").classList.remove("popup_is-opened");
  document.removeEventListener("keydown", tapEscape);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened"); //не забыть добавить всем попапам в глобальном файле "ис анимейтед"
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", closePopup);
  popup.addEventListener("click", catchClick);
  document.addEventListener("keydown", tapEscape);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", tapEscape);
}