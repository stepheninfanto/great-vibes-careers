import React from "react";

export default function LabeledInput({
  field,
  labelStyle,
  inputStyle,
  onChange,
}: any) {
  return (
    <div key={field.htmlFor}>
      <label
        htmlFor={field.htmlFor}
        className={`${labelStyle} ${field.labelInVisible && "invisible"}`}
      >
        {field.label}
        {field.mandatory && <span className="text-red-500">*</span>}
      </label>

      <input
        type={field.inputType || "text"}
        required
        className={inputStyle}
        placeholder={field.placeholder}
        name={field.name}
        value={field.value}
        onChange={onChange}
        min={0}
      />
    </div>
  );
}
