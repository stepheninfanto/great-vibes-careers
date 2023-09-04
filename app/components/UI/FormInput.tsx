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
            type="number"
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
            min={0}
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
        {(field.mandatory || true) && (
          <>
            <span className="text-errorFont">*</span>
            {invalidInput && (
              <span className="text-errorFont text-xs">
                {`Please Enter Valid ${field.label}`}
              </span>
            )}
          </>
        )}
      </label>
      {renderInput()}
    </div>
  );
}
