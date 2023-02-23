import { FC, useState } from "react";
import { ValveMalfunctionErrIcon } from "../../../../../assets/imgs/ValveMalfunctionErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const ValveMalfunctionErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <ValveMalfunctionErrIcon />
          <span>Неисправность клапана</span>
        </div>
      }
    >
      <div>
        <ValveMalfunctionErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
