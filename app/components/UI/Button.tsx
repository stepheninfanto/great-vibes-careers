import React from "react";

export enum VariantType {
  Primary = "primary",
  Secondary = "secondary",
}

type BtnInput = {
  onClick: any;
  variant?: VariantType; // Use the enum type here
  btnText: string;
};

type Styles = {
  [key in VariantType]: string; // Define a type for the styles object
};

const styles: Styles = {
  primary: "bg-primaryColor text-whiteFont",
  secondary: "border border-solid border-primaryColor text-primaryColor",
};

function CustomButton({
  onClick,
  variant = VariantType.Primary,
  btnText,
}: BtnInput) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex content-center px-4 py-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
      rounded-md ${styles[variant]}`}
      >
        {btnText}
      </button>
    </div>
  );
}

export default CustomButton;
