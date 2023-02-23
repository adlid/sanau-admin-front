import React, { FC } from "react";
import { Button } from "react-bootstrap";

type StylesType = {
  width: number;
  height: number;
  fontSize: number;
};

type PropsType = {
  title: string;
  isDisabled?: boolean;
  style: StylesType;
  onClick?: (e: React.MouseEvent) => void;
};

const AddButton: FC<PropsType> = ({
  isDisabled = false,
  title,
  style: { width, height, fontSize },
  onClick,
}) => {
  return (
    <Button
      onClick={(e) => {
        if (onClick && !isDisabled) {
          onClick(e);
        }
      }}
      style={{
        height: `${height}px`,
        minWidth: `${width}px`,
        width: `${width}px`,
        fontSize: `${fontSize}px`,
      }}
      className={
        isDisabled ? "btn main-btn main-btn--disabled" : "btn main-btn add-btn"
      }
      type="submit"
    >
     
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 4C7.69624 4 7.44521 4.22572 7.40548 4.51858L7.4 4.6V7.4H4.6C4.26863 7.4 4 7.66863 4 8C4 8.30376 4.22572 8.55479 4.51858 8.59452L4.6 8.6H7.4V11.4C7.4 11.7314 7.66863 12 8 12C8.30376 12 8.55479 11.7743 8.59452 11.4814L8.6 11.4V8.6H11.4C11.7314 8.6 12 8.33137 12 8C12 7.69624 11.7743 7.44521 11.4814 7.40548L11.4 7.4H8.6V4.6C8.6 4.26863 8.33137 4 8 4Z"
            fill="white"
          />
        </svg>

      <span>{title}</span>
    </Button>
  );
};

export { AddButton };
