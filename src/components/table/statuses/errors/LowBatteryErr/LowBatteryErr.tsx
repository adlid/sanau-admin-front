import { FC, useState } from "react";
import { LowBatteryErrIcon } from "../../../../../assets/imgs/LowBatteryErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const LowBatteryErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <LowBatteryErrIcon />
          <span>Низкий заряд батареи</span>
        </div>
      }
    >
      <div>
        <LowBatteryErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
