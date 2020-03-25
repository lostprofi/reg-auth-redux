export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
});

export const authMailVal = (authMail) => ({
  type: 'AUTH_MAIL',
  payload: authMail,
});

export const authUser = (bool) => ({
  type: 'AUTH_USER',
  payload: bool,
});

export const authFormControl = (obj) => ({
  type: 'AUTH_FORM-CONTROL',
  payload: obj,
});

export const regFormControl = (obj) => ({
  type: 'REG_FORM-CONTROL',
  payload: obj,
});

export const isRegFormValid = (bool) => ({
  type: 'IS_REG-FORM_VALID',
  payload: bool,
});
