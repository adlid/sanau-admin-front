import React, { FC, ReactElement, useState } from "react";
import { PopperPlacementType } from "@material-ui/core";
import RichTooltip from "./RichTooltip";

interface IAppPopperProps {
  content: ReactElement | (() => ReactElement);
  children: ReactElement;
  disabled?: boolean;
  placement?: PopperPlacementType;
  gap?: string;
}

export const AppPopper: FC<IAppPopperProps> = (props) => {
  const { placement, content, children, disabled = false, gap = "0px" } = props;

  const [open, setOpen] = useState(false);

  if (disabled) {
    return React.cloneElement(children, { ...children.props, disabled: true });
  }

  const existingOnClick = children.props.onClick;
  const newOnClick = (e: MouseEvent) => {
    setOpen(!open);
    existingOnClick && existingOnClick(e);
  };

  const contentNode = typeof content === "function" ? content() : content;

  return (
    <RichTooltip
      open={open}
      onClose={() => setOpen(false)}
      placement={placement}
      content={contentNode}
      gap={gap}
    >
      {React.cloneElement(children, { ...children.props, onClick: newOnClick })}
    </RichTooltip>
  );
};
