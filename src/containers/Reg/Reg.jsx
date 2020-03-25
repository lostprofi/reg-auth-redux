import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegForm from '../../components/RegForm/RegForm';
import { addUser, regFormControl, isRegFormValid } from '../../actions/actions';

const Reg = (props) => {
  const prop = props;
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputsList = event.target.querySelectorAll('input');
    const inputsArr = Array.from(inputsList);

    const userEmail = inputsArr[0].value;
    const userName = inputsArr[1].value;
    const userData = {
      userEmail,
      userName,
    };

    prop.addingUser(userData);
    prop.regFormControl(prop.initRegFormControls);
    prop.changeRegFormValid(false);
    history.push('/auth');
  };

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

    if (value === '') {
      isValid = false;
      errorMessage = '';
    }

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;

      if (isValid === false && value === '') {
        errorMessage = 'Fill in the field';
      }
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
      if (isValid === false && value !== '') {
        errorMessage = 'Invalid email';
      }
    }

    if (validation.unique) {
      prop.users.forEach((element) => {
        isValid = element.userEmail !== value && isValid;

        if (isValid === false && value !== '') {
          errorMessage = 'Email already exists';
        }
      });
    }
    return { isValid, errorMessage };
  };

  const handleChange = (event, controlName) => {
    const inputValue = event.target.value;
    const regInputsFormCtrls = { ...prop.regInputsFormCtrls };
    const control = { ...prop.regInputsFormCtrls[controlName] };

    control.value = inputValue;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    regInputsFormCtrls[controlName] = control;

    let isFormValid = true;

    Object.keys(regInputsFormCtrls).forEach((name) => {
      isFormValid = regInputsFormCtrls[name].valid.isValid && isFormValid;
    });

    prop.regFormControl(regInputsFormCtrls);
    prop.changeRegFormValid(isFormValid);
  };

  return (
    <RegForm
      onSubmit={handleSubmit}
      regInputsFormCtrls={prop.regInputsFormCtrls}
      onChange={handleChange}
      isRegFormValid={prop.isRegFormValid}
    />
  );
};

function mapStateToProps(store) {
  return {
    users: store.users,
    regInputsFormCtrls: store.formControls.regFormControls,
    initRegFormControls: store.initFormControls.regFormControls,
    isRegFormValid: store.isRegFormValid,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addingUser(user) {
    dispatch(addUser(user));
  },

  regFormControl(obj) {
    dispatch(regFormControl(obj));
  },

  changeRegFormValid(bool) {
    dispatch(isRegFormValid(bool));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
