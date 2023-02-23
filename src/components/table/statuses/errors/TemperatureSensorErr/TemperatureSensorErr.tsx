import { FC, useState } from "react";
import { TemperatureSensorErrIcon } from "../../../../../assets/imgs/TemperatureSensorErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const TemperatureSensorErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <TemperatureSensorErrIcon />
          <span>Неисправность датчика температуры</span>
        </div>
      }
    >
      <div>
        <TemperatureSensorErrIcon className="table-status-html__icon__icon" />
      </div>
    </HtmlTooltip>
  );
};
