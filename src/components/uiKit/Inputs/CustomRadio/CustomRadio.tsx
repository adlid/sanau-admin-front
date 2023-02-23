import { FC } from "react";

type PropsType = {
  title: string;
  value: string;
  selectedRadioValue: string;
  isSecondary?: boolean;
  onClick: (target: string) => void;
  disabled?: boolean;
};

export const CustomRadio: FC<PropsType> = ({
  title,
  value,
  selectedRadioValue,
  isSecondary = false,
  disabled,
  onClick,
  ...rest
}) => {
  const id = `${value + Math.random()}`;

  return (
    <div {...rest} className={!isSecondary ? "custom-radio " : "custom-radio custom-radio--secondary"}>
      <input
        disabled={disabled}
        onChange={(e) => onClick(e.target.value)}
        type="radio"
        id={id}
        value={value}
        checked={selectedRadioValue === value}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};
