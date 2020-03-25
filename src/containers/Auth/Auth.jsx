import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { authMailVal, authUser, authFormControl } from '../../actions/actions';

const Auth = (props) => {
  const prop = props;

  const history = useHistory();

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateControl = (value, validation) => {
    let isValid = true;
    let errorMessage = '';

    if (!validation) {
      return true;
    }

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (isValid === false && value === '') {
        errorMessage = 'Fill in the field';
      }
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
      if (isValid === false && value !== "") {
        errorMessage = 'Email does not exist';
      }
    }

    if (validation.exist) {
      isValid = prop.users.some((element) => {
        return element.userEmail === value;
      });

      if (isValid === false && value !== '') {
        errorMessage = 'Email is not registered';
      }
    }

    return { isValid, errorMessage };
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    prop.authMailToStore(inputValue);

    const control = { ...prop.authMailFormCtrl };

    control.value = inputValue;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    prop.authFormControl(control);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const usersArr = prop.users;
    const { authMail } = prop;

    usersArr.forEach((el) => {
      if (el.userEmail === authMail) {
        const storeJSON = JSON.stringify(el);
        localStorage.setItem('authUserData', storeJSON);

        prop.userAuth(true);

        history.push('/homepage');
      }
    });
  };

  return (
    <AuthForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      authMailFormCtrl={prop.authMailFormCtrl}
    />
  );
};

const mapStateToProps = (store) => ({
  users: store.users,
  store,
  authMail: store.authMail,
  authMailFormCtrl: store.formControls.authFormControls.email,
});

const mapDispatchToProps = (dispatch) => ({
  authMailToStore(mail) {
    dispatch(authMailVal(mail));
  },

  userAuth(bool) {
    dispatch(authUser(bool));
    const userAuthFlagJSON = JSON.stringify(bool);
    localStorage.setItem('userAuthFlag', userAuthFlagJSON);
  },

  authFormControl(obj) {
    dispatch(authFormControl(obj));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
