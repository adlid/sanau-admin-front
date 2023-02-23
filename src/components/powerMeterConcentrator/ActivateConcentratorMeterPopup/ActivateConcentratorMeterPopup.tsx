import { FC, useEffect, useState } from "react";
import { MainButton } from "../../uiKit/Buttons/MainButton";
import { ConcentratorMeterType } from "../../../ts/types/dataTransmissionsDevice.types";

type PropsType = {
  toggleActivateConcentratorMeter: (bool: boolean) => void;
  onClick: () => void;
  selectedConcentratorMeters?: Array<any>;
  isFetchingModal: boolean;
  selectedMeters: Array<string>;
};

export const ActivateConcentratorMeterPopup: FC<PropsType> = (props) => {
  const { toggleActivateConcentratorMeter, onClick, selectedConcentratorMeters, selectedMeters, isFetchingModal } =
    props;

  const [meterSerialNumber, setMeterSerialNumber] = useState<null | string>(null);

  const [metersLength, setMetersLength] = useState<null | number>(null);

  useEffect(() => {
    if (selectedConcentratorMeters && selectedMeters.length === 1) {
      selectedConcentratorMeters.forEach((m) => {
        if (m.id === selectedMeters[0]) {
          setMeterSerialNumber(m.serial?.toString() || m.deviceName || m.barcode || m.devEUI || m.ip);
        }
      });
    }
    if (selectedMeters.length === 1 && selectedConcentratorMeters === undefined) {
      setMeterSerialNumber(selectedMeters[0]);
    }
    if (selectedMeters.length > 1) {
      setMetersLength(selectedMeters.length);
    }
  }, []);

  return (
    <div className="delete-concentrator-popup__wrap">
      <div className="delete-concentrator-popup__header delete-concentrator-popup__header--green">
        {meterSerialNumber && `Активировать прибор учета ${meterSerialNumber}?`}
        {metersLength && `Активировать приборы учета (${metersLength})?`}
        <svg
          className="delete-concentrator-popup__icon"
          onClick={() => toggleActivateConcentratorMeter(false)}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="delete-concentrator-popup__body">
        {meterSerialNumber && `Прибор учета возобновит  автоматическое считывание данных по настроенному расписанию`}

        {metersLength && `Приборы учета возобновят  автоматическое считывание данных по настроенному расписанию`}
      </div>
      <div className="delete-concentrator-popup__footer d-flex justify-content-end">
        <div className="d-flex">
          <MainButton
            title="Отмена"
            isSecondary
            style={{ width: 86, height: 40, fontSize: 16 }}
            onClick={() => toggleActivateConcentratorMeter(false)}
          />
          <div className="mr8px"></div>
          <MainButton
            title="Активировать"
            fetching={isFetchingModal}
            style={{ width: 150, height: 40, fontSize: 16 }}
            onClick={() => onClick()}
          />
        </div>
      </div>
    </div>
  );
};
