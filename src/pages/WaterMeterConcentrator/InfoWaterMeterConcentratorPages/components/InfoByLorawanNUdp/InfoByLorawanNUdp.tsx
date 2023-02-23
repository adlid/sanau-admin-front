import { FC, useEffect, memo, useRef, useState } from "react";

//components
import { ConcentratorsList } from "./components/ConcentratorsList";
import { ConcentratorDetailListHeader } from "./components/ConcentratorDetailListHeader";
import { ConcentratorMetersList } from "./components/ConcentratorMetersList";

//redux
import { useAppDispatch, useTypedSelector, useWindowSize } from "../../../../../utils/hooks/reduxHooks";
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
    <div className="info-water-lorawan">
      <div className="info-water-lorawan__wrap d-flex ">
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
          {selectedConcentrator && (
            <ConcentratorMetersList id={selectedConcentrator.id} detailHeaderHeight={detailHeaderHeight} />
          )}
        </div>
      </div>
    </div>
  );
});
