// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector(".places__list");
const temp = document.querySelector("#card-template").content;

function createCard(card, def) {
  const inTemp = temp.querySelector(".places__item").cloneNode(true);
  inTemp.querySelector(".card__image").src = card.link;
  inTemp.querySelector(".card__title").textContent = card.name;
  const deleteButton = inTemp.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", def);
  return inTemp;
}

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

initialCards.forEach((item) => {
  container.append(createCard(item, deleteCard));
});
