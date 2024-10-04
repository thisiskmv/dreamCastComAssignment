import React from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';

const InputField = ({
  label,  
  name,   
  inputClass, 
  type = 'text',
  maxLength,   
  minLength,    
  shouldUppercase,  
  shouldUppercaseForCoupon, 
  disabled, 
  ...rest   
}) => {
  const { setFieldValue, values } = useFormikContext(); 

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (shouldUppercase) {
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }
    setFieldValue(name, inputValue); 
  };

  const errorStyle={
    color: 'red',
    fontSize: '12px',
    marginTop: '-2px',
    display: 'block',
  }

  return (
    <div className="form-group">
      {label && <label className='mt-1 mb-1' htmlFor={name}>{label}</label>}
      <Field
        name={name}
        id={name}
        className={inputClass ? inputClass : 'form-control'}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete="off"
        disabled={disabled}
        onChange={handleInputChange}
        value={values[name]} 
        {...rest} 
      />

      <ErrorMessage
        name={name}
        render={(msg) => (
          <span
            className="error-msg"
            style={errorStyle}
          >
            {msg}
          </span>
        )}
      />
    </div>
  );
};

export default InputField;
