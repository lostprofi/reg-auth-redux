import React from 'react';
import Input from '../Input/Input';

const AuthForm = (props) => {
  const prop = props;

  return (
    <form onSubmit={prop.onSubmit}>
      <Input
        type={prop.authMailFormCtrl.type}
        label={prop.authMailFormCtrl.label}
        onChange={prop.onChange}
        name={prop.authMailFormCtrl.name}
        value={prop.authMailFormCtrl.value}
        shouldValidate={!!prop.authMailFormCtrl.validation}
        valid={prop.authMailFormCtrl.valid.isValid}
        touched={prop.authMailFormCtrl.touched}
        errorMessage={prop.authMailFormCtrl.valid.errorMessage}
      />
      <button type="submit" className="btn btn-primary" disabled={!prop.authMailFormCtrl.valid.isValid}>
        Sign in
      </button>
    </form>
  );
};

export default AuthForm;
