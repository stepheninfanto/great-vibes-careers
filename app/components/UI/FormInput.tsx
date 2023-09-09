import React from 'react';

export default function FormInput({
  field,
  onChange,
  inputValue,
  invalidInput,
  FormStyles,
}: any) {
  const { input: inputStyle, label: labelStyle } = FormStyles;

  // Function to render different input types
  const renderInput = () => {
    switch (field.inputType) {
      case 'text':
        return (
          <input
            type="text"
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
            maxLength={25}
            required={field.mandatory}
          />
        );
      case 'number':
        return (
          <input
            type="text"
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9]+"
          />
        );
      case 'radio':
        return (
          <input
            type="radio"
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={field.label}
            onChange={onChange}
            checked={inputValue}
          />
        );
      default:
        return (
          <input
            type="text"
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
            required={field.mandatory}
          />
        );
    }
  };

  return (
    <div key={field.htmlFor}>
      <label
        htmlFor={field.htmlFor}
        className={`${labelStyle} ${field.labelInVisible && 'invisible'}`}
      >
        {field.label}
        {field.mandatory && <span className="text-errorFont">*</span>}
        {invalidInput && (
          <span className="text-errorFont text-xs">
            {`Please Enter Valid ${field.label}`}
          </span>
        )}
      </label>
      {renderInput()}
    </div>
  );
}
