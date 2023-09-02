import React from "react";
import { FormStyles } from "../JobForm";

export default function FormInput({ field, onChange, inputValue }: any) {
  const { input: inputStyle, label: labelStyle } = FormStyles;

  // Function to render different input types
  const renderInput = () => {
    switch (field.inputType) {
      case "text":
        return (
          <input
            type="text"
            required
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
          />
        );
      case "number":
        return (
          <input
            type="number"
            required
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
            min={0}
          />
        );

      default:
        // By default, render a text input
        return (
          <input
            type="text"
            required
            className={inputStyle}
            placeholder={field.placeholder}
            name={field.name}
            value={inputValue}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div key={field.htmlFor}>
      <label
        htmlFor={field.htmlFor}
        className={`${labelStyle} ${field.labelInVisible && "invisible"}`}
      >
        {field.label}
        {field.mandatory && <span className="text-red-500">*</span>}
      </label>

      {renderInput()}
    </div>
  );
}
