import React from 'react';
import './_input.scss';

const Input = (props) => {
  const prop = props;
  const inputType = prop.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;

  const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && shouldValidate && touched;
  };

  let addClass = '';

  if (isInvalid(prop)) {
    addClass = 'form-group_invalid';
  }

  return (
    <div className={`form-group ${addClass}`}>
      <label htmlFor={htmlFor}>
        {prop.label}
        <input
          type={prop.type}
          className="form-control"
          id={htmlFor}
          name={prop.name}
          onChange={prop.onChange}
          value={prop.value}
        />
      </label>
      {isInvalid(prop) && <span className="form-group__span">{prop.errorMessage}</span>}
    </div>
  );
};

export default Input;
