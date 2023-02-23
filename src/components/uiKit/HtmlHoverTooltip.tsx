import { Theme, withStyles, Tooltip } from "@material-ui/core";

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#FFFFFF",
    padding: "0px",
    width: "200px",
  },
}))(Tooltip);
