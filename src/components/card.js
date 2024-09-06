import { setLike, popLike, popCard } from "./api";

export function createCard(
  template,
  cardItem,
  deleteCard,
  liked,
  fill,
  userId
) {
  const card = template.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.addEventListener("click", () => fill({ cardImage }));
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  card.querySelector(".card__title").textContent = cardItem.name;
  if (cardItem.owner._id === userId) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__delete-button");
    cardImage.insertAdjacentElement("afterend", deleteButton);
    deleteButton.addEventListener("click", () => deleteCard(cardItem._id));
  }
  const likeButton = card.querySelector(".card__like-button");
  if (isLiked(cardItem, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => liked(cardItem));
  const likeCounter = card.querySelector(".like_button-label");
  counterLikes(likeCounter, cardItem.likes.length);
  return card;
}

function isLiked(card, id) {
  let perem = false;
  if (card.likes.length === 0) {
    return perem;
  } else {
    card.likes.forEach((like) => {
      if (like._id === id) {
        perem = true;
      }
    });
  }
  return perem;
}

export function liked(card) {
  let label = event.target.nextElementSibling;
  event.target.classList.toggle("card__like-button_is-active");
  if (event.target.classList.contains("card__like-button_is-active")) {
    setLike(card._id).then((result) => {
      counterLikes(label, result.likes.length);
    });
  } else {
    popLike(card._id).then((result) => {
      counterLikes(label, result.likes.length);
    });
  }
}

function counterLikes(label, value) {
  label.textContent = value;
}

export function deleteCard(id) {
  let card = event.target.closest(".places__item");
  popCard(id).then(() => {
    card.remove();
  });
}
