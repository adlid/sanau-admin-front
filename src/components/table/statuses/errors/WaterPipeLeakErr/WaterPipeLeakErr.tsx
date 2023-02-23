import { FC, useState } from "react";
import { WaterPipeLeakErrIcon } from "../../../../../assets/imgs/WaterPipeLeakErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const WaterPipeLeakErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <WaterPipeLeakErrIcon />
          <span>Неисправность утечки водопровода</span>
        </div>
      }
    >
      <div>
        <WaterPipeLeakErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
