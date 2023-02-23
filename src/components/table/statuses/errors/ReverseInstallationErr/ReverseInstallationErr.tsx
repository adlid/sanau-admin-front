import { FC } from "react";
import { ReverseInstallationErrIcon } from "../../../../../assets/imgs/ReverseInstallationErrIcon";
import { HtmlTooltip } from "../../../../uiKit/HtmlHoverTooltip";

export const ReverseInstallationErr: FC = () => {
  return (
    <HtmlTooltip
      placement="top-start"
      title={
        <div className="table-status-html__content">
          <ReverseInstallationErrIcon />
          <span>Обратное положение установки водопровода</span>
        </div>
      }
    >
      <div>
        <ReverseInstallationErrIcon className="table-status-html__icon" />
      </div>
    </HtmlTooltip>
  );
};
