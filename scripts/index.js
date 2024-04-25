// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;

function createCard(card, deleteCard) {
  const card = template.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__image").src = card.link;
  card.querySelector(".card__image").alt = card.name;
  card.querySelector(".card__title").textContent = card.name;
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

initialCards.forEach((item) => {
  container.append(createCard(item, deleteCard));
});
