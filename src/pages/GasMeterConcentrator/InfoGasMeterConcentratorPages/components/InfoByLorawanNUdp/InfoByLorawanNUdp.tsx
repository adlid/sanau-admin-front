import { FC, useEffect, memo } from "react";

//components
import { ConcentratorsList } from "./components/ConcentratorsList";
import { ConcentratorDetailListHeader } from "./components/ConcentratorDetailListHeader";
import { ConcentratorMetersList } from "./components/ConcentratorMetersList";

//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { setSelectedConcentrator } from "../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { getAllConcentrators } from "../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";

export const InfoByLorawanNUdp: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { selectedConcentrator, allConcentrators } = useTypedSelector(
    (state) => state.waterMeterLorawanUdpDeviceConcentrator
  ); 

  const setSelectedConcentratorCallBack = (id: string) => {
    allConcentrators.forEach((c) => {
      if (c.id === id) dispatch(setSelectedConcentrator(c));
    });
  };

  useEffect(() => {
    dispatch(getAllConcentrators());
  }, []);

  return (
    <div className="info-gas-lorawan ">
      <div className="info-gas-lorawan__wrap d-flex ">
        <ConcentratorsList
          setSelectedConcentratorCallBack={setSelectedConcentratorCallBack}
          allConcentrators={allConcentrators}
        />
        <div className="flex-grow-1">
          <ConcentratorDetailListHeader
            isConcentratorSelected={Boolean(selectedConcentrator)}
            selectedConcentrator={selectedConcentrator}
          />
          {selectedConcentrator && <ConcentratorMetersList id={selectedConcentrator.id} />}
        </div>
      </div>
    </div>
  );
});
