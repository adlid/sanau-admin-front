import { Box, ClickAwayListener, Fade, Paper, Popper, PopperPlacementType } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useAppPopperStyles } from "./AppPopperStyles";

interface Props {
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  onClose?: () => void;
  placement?: PopperPlacementType;
  gap?: string;
}

const RichTooltip = ({ placement = "top", open, onClose = () => {}, content, children, gap }: Props) => {
  const classes = useAppPopperStyles();
  const [childNode, setChildNode] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      {React.cloneElement(children, { ...children.props, ref: setChildNode })}

      <Popper open={open} anchorEl={childNode} placement={placement} transition className={classes.popper}>
        {({ TransitionProps }) => (
          <>
            <div style={{ marginTop: gap }}></div>
            <Fade {...TransitionProps} timeout={50}>
              <Paper>
                <ClickAwayListener onClickAway={onClose}>
                  <Paper className={classes.popoverRoot}>
                    <Box className={classes.content}>{content}</Box>
                  </Paper>
                </ClickAwayListener>
              </Paper>
            </Fade>
          </>
        )}
      </Popper>
    </div>
  );
};

export default RichTooltip;
