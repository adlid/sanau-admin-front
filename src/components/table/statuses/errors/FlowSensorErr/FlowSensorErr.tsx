import { FC } from "react";
import { FlowSensorErrIcon } from "../../../../../assets/imgs/FlowSensorErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const FlowSensorErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <FlowSensorErrIcon />
          <span>Неисправность датчика потока или ATC</span>
        </div>
      }
    >
      <div>
        <FlowSensorErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
