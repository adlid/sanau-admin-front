import { FC } from "react";
import { ConcentratorMetersTypes } from "../../../../../../ts/types/dataTransmissionsDevice.types";

type PropsType = {
  allConcentratorMeters: Array<ConcentratorMetersTypes>;
};

export const ConcentratorLists: FC<PropsType> = ({ allConcentratorMeters }) => {
  return (
    <div className="concentrator-list">
      <div className="concentrator-list__header">
        <span className="concentrator-list__column">№</span>
        <span className="concentrator-list__column">Сер.№</span>
      </div>

      {allConcentratorMeters.map((meter) => (
        <div key={meter.serial} className="concentrator-list__item">
          <span className="concentrator-list__descr">{meter.svr}</span>
          <span className="concentrator-list__descr">{meter.serial}</span>
        </div>
      ))}
    </div>
  );
};
