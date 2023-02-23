import { FC, useState } from "react";
import { ReverseFlowErrIcon } from "../../../../../assets/imgs/ReverseFlowErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const ReverseFlowErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <ReverseFlowErrIcon />
          <span>Обратный поток</span>
        </div>
      }
    >
      <div>
        <ReverseFlowErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
