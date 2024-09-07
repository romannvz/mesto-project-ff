export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
    if (formElement.name === "new-place") {
      disablingButton(
        formElement.querySelector(config.submitButtonSelector),
        config
      );
    }
  });
};

export const clearValidation = (form, config) => {
  const inputList = form.querySelectorAll(config.inputSelector);
  inputList.forEach((item) => {
    item.classList.remove(config.inputErrorClass);
    const errorElement = form.querySelector(`.${item.id}_error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const button = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, button, config);
    });
  });
};

const checkInputValidity = (formElement, inputElement, button, config) => {
  if (inputElement.validity.valueMissing) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.missValue,
      button,
      config
    );
  } else if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorPattern,
      button,
      config
    );
  } else if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      button,
      config
    );
  } else {
    hideInputError(formElement, inputElement, button, config);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  button,
  config
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  errorMessage = "";
  disablingButton(button, config.inactiveButtonClass);
};

const hideInputError = (formElement, inputElement, button, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  checkFormValidity(formElement, button, config);
};

const checkFormValidity = (formElement, button, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  let status = true;
  inputList.forEach((item) => {
    if (item.classList.contains(config.inputErrorClass) || !item.value) {
      status = false;
    }
  });
  if (status) {
    enablingButton(button, config);
  }
};

const enablingButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

export const disablingButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};
