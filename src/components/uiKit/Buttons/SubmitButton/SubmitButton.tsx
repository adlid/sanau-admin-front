import React, { FC } from "react";
import { Button, Spinner } from "react-bootstrap";

type PropsType = {
  title: string;
  fetching?: boolean;
  disabled?: boolean;
};

const SubmitButton: FC<PropsType> = ({ title, fetching, disabled = false }) => {
  return (
    <Button disabled={disabled} className="btn custom-btn" type="submit">
      {fetching && <Spinner animation="border" size="sm" />}

      {!fetching && <span>{title}</span>}
    </Button>
  );
};

export { SubmitButton };
