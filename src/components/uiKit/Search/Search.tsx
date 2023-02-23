import { Input } from "@material-ui/core";
import { FC } from "react";

type PropsType = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnterPress?: any;
};

export const Search: FC<PropsType> = ({ value, onChange, placeholder, onEnterPress, ...rest }) => {
  return (
    <Input
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%" }}
      placeholder={placeholder || "Поиск"}
      className="search-input"
      value={value}
      onKeyPress={(e) => {
        if (onEnterPress && e.key === "Enter") onEnterPress();
      }}
      {...rest}
    />
  );
};
