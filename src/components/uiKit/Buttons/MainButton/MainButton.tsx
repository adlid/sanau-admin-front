import React, { FC } from "react";
import { Button, Spinner } from "react-bootstrap";

type StylesType = {
  width: number | string;
  height: number;
  fontSize: number;
};

type PropsType = {
  title: any;
  isSecondary?: boolean;
  isDisabled?: boolean;
  isAlarm?: boolean;
  fetching?: boolean;
  style: StylesType;
  onClick?: (e: React.MouseEvent) => void;
};

const MainButton: FC<PropsType> = (props) => {
  const {
    title,
    isSecondary,
    isAlarm,
    isDisabled = false,
    fetching,
    style: { width, height, fontSize },
    onClick,
  } = props;

  return (
    <Button
      onClick={(e) => onClick && !isDisabled && onClick(e)}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        fontSize: `${fontSize}px`,
        whiteSpace: "nowrap",
        background: "#355169",
      }}
      className={
        isSecondary
          ? "btn main-btn main-btn--secondary"
          : isAlarm && !isDisabled
          ? "btn main-btn main-btn--alarm"
          : isDisabled
          ? "btn main-btn main-btn--disabled"
          : "btn main-btn"
      }
      type="submit"
    >
      {fetching && <Spinner animation="border" size="sm" />}

      {!fetching && <span>{title}</span>}
    </Button>
  );
};

export { MainButton };
