import React from 'react';
import './_RegForm.scss';
import Input from '../Input/Input';

const RegForm = (props) => {
  const prop = props;
  const { regInputsFormCtrls } = prop;

  const renderInputs = () => {
    const inputsArr = Object.keys(regInputsFormCtrls).map((controlName) => {
      const control = regInputsFormCtrls[controlName];
      const change = (event) => {
        return prop.onChange(event, controlName);
      };
      return (
        <Input
          key={controlName}
          label={control.label}
          type={control.type}
          touched={control.touched}
          valid={control.valid.isValid}
          value={control.value}
          errorMessage={control.valid.errorMessage}
          shouldValidate={!!control.validation}
          onChange={change}
        />
      );
    });
    return inputsArr;
  };

  return (
    <form onSubmit={prop.onSubmit}>

      {renderInputs()}

      <button type="submit" className="btn btn-primary" disabled={!prop.isRegFormValid}>
        Sign up
      </button>
    </form>
  );
};

export default RegForm;
