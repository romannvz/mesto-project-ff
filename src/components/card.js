export function createCard(template, cardItem, deleteCard, liked, openPopup) {
  const card = template.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  card.querySelector(".card__title").textContent = cardItem.name;
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openPopup);
  likeButton.addEventListener("click", liked);
  return card;
}

export function liked(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(event) {
  event.target.closest(".places__item").remove();
}