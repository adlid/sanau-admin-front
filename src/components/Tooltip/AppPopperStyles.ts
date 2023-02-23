import { createStyles, makeStyles } from "@material-ui/core";

export const useAppPopperStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "16px",
      height: "16px",
      padding: "4px",
      marginLeft: "8px",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        border: "unset",
      },
      "&:hover $icon": {
        fill: theme.palette.common.white,
      },
    },
    tooltip: {
      maxHeight: "480px",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      padding: "10px",
    },
    icon: {
      fill: theme.palette.primary.main,
    },
    popoverRoot: {
      borderRadius: "0px", 
      boxShadow: "unset !important",
      marginBottom: "15px", 
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#828282",
        borderRadius: "2px",
      },
    },
    content: {},
    popper: {
      willChange: "unset !important",
      zIndex: 1,
      boxShadow: "unset !important",
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "0 100%",
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "100% 0",
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "100% 100%",
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "0 0",
        },
      },
    },
    arrow: {
      overflow: "hidden",
      position: "absolute",
      width: "1em",
      height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: "border-box",
      color: theme.palette.info.dark,
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "currentColor",
        transform: "rotate(45deg)",
      },
    },
  })
);
