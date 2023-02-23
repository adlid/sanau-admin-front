import { FC } from "react";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";

//redux
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../../../../utils/hooks/reduxHooks";
import { deleteConcentratorMeter } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { isFetchingModalAC } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";

type PropsType = {
  toggleDeleteConcentratorMeter: (deleteConcentratorPopup: boolean) => void;
};

export const DeleteConcentratorMeterPopup: FC<PropsType> = ({
  toggleDeleteConcentratorMeter,
}) => {
  const dispatch = useAppDispatch();

  const { selectedConcentrator, selectedMeterObj, isFetchingModal } =
    useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  return (
    <div className="delete-concentrator-popup__wrap">
      <div className="delete-concentrator-popup__header">
        Удалить прибор учета {selectedMeterObj?.serial}?
        <svg
          className="delete-concentrator-popup__icon"
          onClick={() => toggleDeleteConcentratorMeter(false)}
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
        Прибор учета полностью перестанет считывать данные и удалится со списка
        счетчиков данного УСПД. Считанные ранее данные будут доступны к
        просмотру в течение 8 лет после удаления.
      </div>
      <div className="delete-concentrator-popup__footer d-flex justify-content-end">
        <div className="d-flex">
          <MainButton
            title="Отмена"
            isSecondary
            style={{ width: 86, height: 40, fontSize: 16 }}
            onClick={() => toggleDeleteConcentratorMeter(false)}
          />
          <div className="mr8px"></div>
          <MainButton
            title="Удалить"
            isAlarm
            fetching={isFetchingModal}
            style={{ width: 150, height: 40, fontSize: 16 }}
            onClick={() => {
              if (selectedConcentrator !== null) {
                dispatch(isFetchingModalAC(true));
                dispatch(
                  deleteConcentratorMeter({
                    meterId:
                      selectedMeterObj !== null ? selectedMeterObj.id : "",
                    concentratorId: selectedConcentrator.id,
                  })
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
