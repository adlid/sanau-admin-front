import { FC, useEffect, memo, useRef, useState } from "react";
//components
import { ConcentratorsList } from "./components/ConcentratorsList";
import { ConcentratorDetailListHeader } from "./components/ConcentratorDetailListHeader";
import { ConcentratorMetersList } from "./components/ConcentratorMetersList";
//redux
import { useAppDispatch, useTypedSelector, useWindowSize } from "../../../../../utils/hooks/reduxHooks";
import { setSelectedConcentrator } from "../../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";
import { getAllConcentrators } from "../../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.thunk";

export const InfoByUdp: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { selectedConcentrator, allConcentrators } = useTypedSelector((state) => state.gasMeterUdpDeviceConcentrator);

  const setSelectedConcentratorCallBack = (id: string) => {
    allConcentrators.forEach((c) => {
      if (c.id === id) dispatch(setSelectedConcentrator(c));
    });
  };

  const detailHeaderRef: any = useRef();
  const [detailHeaderHeight, setDetailHeaderHeight] = useState<number>(0);
  const [width, height] = useWindowSize(); // on window resize listener

  useEffect(() => {
    setDetailHeaderHeight(detailHeaderRef.current?.offsetHeight || 0);
  });
  useEffect(() => {
    setDetailHeaderHeight(detailHeaderRef.current?.offsetHeight || 0);
  }, [width, height]);

  return (
    <div className="info-gas-udp">
      <div className="info-gas-udp__wrap d-flex ">
        <ConcentratorsList
          setSelectedConcentratorCallBack={setSelectedConcentratorCallBack}
          allConcentrators={allConcentrators}
        />
        <div className="flex-grow-1">
          <ConcentratorDetailListHeader
            detailHeaderRef={detailHeaderRef}
            isConcentratorSelected={Boolean(selectedConcentrator)}
            selectedConcentrator={selectedConcentrator}
          />
          {/* {selectedConcentrator && ( */}
          <ConcentratorMetersList detailHeaderHeight={detailHeaderHeight} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
});
