import React from 'react';

export type Variant = 'primary' | 'secondary';

type BtnInput = {
  onClick: any;
  variant: Variant;
  btnText: string;
};

const styles = {
  primary: 'bg-primaryColor text-whiteFont rounded-md px-4 py-2',
  secondary:
    'border border-solid border-primaryColor text-primaryColor rounded-md px-4 py-2',
};

export function CardButton({
  onClick,
  variant = 'primary',
  btnText,
}: BtnInput) {
  return (
    <div>
      <button
        type="button"
        tabIndex={0}
        onClick={onClick}
        className={`flex content-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
       ${styles[variant]}`}
      >
        {btnText}
      </button>
    </div>
  );
}
