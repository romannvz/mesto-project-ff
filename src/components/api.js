const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "dabdb893-c1db-47a5-b9ab-3ce5d0407d83",
    "Content-Type": "application/json",
  },
};

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("Информация профиля получена.");
        return res.json();
      } else {
        return `Ошибка при запросе данных пользователя. Статус запроса: ${res.status}`;
      }
    })
    .catch((value) => {
      console.error(value);
    });
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("Карточки с сервера получены.");
        return res.json();
      } else {
        return `Ошибка при запросе карточек. Статус запроса: ${res.status}`;
      }
    })
    .catch((value) => {
      console.error(value);
    });
}

export function insertProfieInfo(newName, newDesc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDesc,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log(
        `Данные профиля отправлены. Сервер вернул статус: ${res.status}`
      );
    } else {
      console.error(
        `Ошибка при передаче данных профиля на сервер. Статус ответа: ${res.status}`
      );
    }
  });
}

export function insertNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log(
        `Данные карточки отправлены. Сервер вернул статус: ${res.status}`
      );
      return res.json();
    } else {
      console.error(
        `Ошибка при передаче данных карточки на сервер. Статус ответа: ${res.status}`
      );
      return res.json();
    }
  });
}

export function setNewAvatar(avatar_link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar_link,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log(`Аватар обновлён. Сервер вернул статус: ${res.status}`);
    } else {
      console.error(
        `Ошибка при обновлении аватара. Статус ответа: ${res.status}`
      );
    }
  });
}

export function setLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      console.log(`Лайк поставлен. Сервер вернул статус: ${res.status}`);
      return res.json();
    } else {
      return console.error(
        `Ошибка при лайке карточки. Статус ответа: ${res.status}`
      );
    }
  });
}

export function popLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      console.log(`Лайк убран. Сервер вернул статус: ${res.status}`);
      return res.json();
    } else {
      return console.error(
        `Ошибка при отмене лайка карточки. Статус ответа: ${res.status}`
      );
    }
  });
}

export function popCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return console.log(
        `Карточка удалена. Сервер вернул статус: ${res.status}`
      );
    } else {
      return console.error(
        `Ошибка при удалении карточки. Статус ответа: ${res.status}`
      );
    }
  });
}
