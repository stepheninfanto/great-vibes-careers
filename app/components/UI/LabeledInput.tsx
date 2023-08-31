import React from "react";

export function LabeledInput({ field, labelStyle, inputStyle, onChange }: any) {
  return (
    <div key={field.htmlFor}>
      <label htmlFor={field.htmlFor} className={labelStyle}>
        {field.label}
        {field.mandatory && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        required
        className={inputStyle}
        placeholder={field.placeholder}
        name={field.name}
        defaultValue={field.value}
        onChange={() => onChange}
      />
    </div>
  );
}

export function RangeInputs({ field, labelStyle, inputStyle, onChange }: any) {
  return (
    <div key={field.htmlFor}>
      <label htmlFor={field.htmlFor} className={labelStyle}>
        {field.label}
      </label>
      <div className="flex flex-row gap-6">
        {field.placeholders.map((range: any, idx: any) => (
          <input
            key={idx}
            type="text"
            className={inputStyle}
            placeholder={Object.keys(range).toString()}
            name={field.name}
            value={Object.values(range)}
            onChange={() => onChange}
          />
        ))}
      </div>
    </div>
  );
}
