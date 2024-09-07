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
    deleteButton.addEventListener("click", () =>
      deleteCard(cardItem, deleteButton)
    );
  }
  const likeButton = card.querySelector(".card__like-button");
  if (isLiked(cardItem, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const likeCounter = card.querySelector(".like_button-label");
  likeButton.addEventListener("click", () =>
    liked(cardItem, likeButton, likeCounter)
  );
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

export function liked(card, button, label) {
  if (!button.classList.contains("card__like-button_is-active")) {
    setLike(card._id)
      .then((result) => {
        counterLikes(label, result.likes.length);
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    popLike(card._id)
      .then((result) => {
        counterLikes(label, result.likes.length);
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function counterLikes(label, value) {
  label.textContent = value;
}

export function deleteCard(card, button) {
  popCard(card._id)
    .then((value) => {
      button.closest(".places__item").remove();
      console.log(value);
    })
    .catch((err) => {
      console.error(err);
    });
}
