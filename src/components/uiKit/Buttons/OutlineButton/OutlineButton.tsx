import { FC } from "react";
import { Button } from "react-bootstrap";

type PropsType = {
  name: string;
  selectedBtnValue: string
  btnValue: string
  onClick?: () => void
};

export const OutlineButton: FC<PropsType> = ({ name, selectedBtnValue, btnValue, onClick }) => {
  return <Button onClick={() => {
    if(onClick){
      onClick()
    }
  }} className={selectedBtnValue === btnValue ? "btn outline-btn outline-btn--active" : "btn outline-btn"}>{name}</Button>;
};
