import { FC, useEffect, memo, useRef, useState } from "react";

//components
import { ConcentratorsList } from "./components/ConcentratorsList";
import { ConcentratorDetailListHeader } from "./components/ConcentratorDetailListHeader";
import { ConcentratorMetersList } from "./components/ConcentratorMetersList";

//redux
import { useAppDispatch, useTypedSelector, useWindowSize } from "../../../../../utils/hooks/reduxHooks";
import {
  activateLoraConcentratorMeters,
  deactivateActivateLoraConcentrator,
  deactivateLoraConcentratorMeters,
  getPowerLorawanAllConcentrators,
} from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { setPowerLorawanSelectedConcentrator } from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { Modal } from "react-bootstrap";
import { DeactivateConcentratorPopup } from "../InfoByTransmissionDevice/components/DeactivateConcentratorPopup";
import { ActivateConcentratorPopup } from "../InfoByTransmissionDevice/components/ActivateConcentratorPopup";
import { DeactivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/DeactivateConcentratorMeterPopup";
import { ActivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/ActivateConcentratorMeterPopup";
import { isFetchingModalAC } from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";

export const InfoByLorawanNUdp: FC = memo(() => {
  // hooks
  const [width, height] = useWindowSize(); // on window resize listener
  const dispatch = useAppDispatch();

  // state handlers
  const [deleteConcentratorPopup, toggleDeleteConcentratorPopup] = useState(false);
  const [activateConcentratorPopup, toggleActivateConcentratorPopup] = useState(false);

  const [deactivateConcentratorMeter, toggleDeactivateConcentratorMeter] = useState(false);
  const [activateConcentratorMeter, toggleActivateConcentratorMeter] = useState(false);

  // data from redux
  const { selectedConcentrator, allConcentrators, selectedMeters, selectedConcentratorMeters } = useTypedSelector(
    (state) => state.powerMeterLorawanUdpConcentrator
  );
  const { isFetchingModal } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  const setSelectedConcentratorCallBack = (id: string) => {
    allConcentrators.forEach((c) => {
      if (c.id === id) dispatch(setPowerLorawanSelectedConcentrator(c));
    });
  };

  useEffect(() => {
    dispatch(getPowerLorawanAllConcentrators());
  }, []);

  // height
  const filterRef: any = useRef();

  const [filterHeight, setFilterHeight] = useState<number>(0);

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
  }, [width, height]);

  const onDeactivateMeterClick = async () => {
    if (selectedConcentrator) {
      dispatch(isFetchingModalAC(true));
      await dispatch(deactivateLoraConcentratorMeters({ concentratorId: selectedConcentrator.id, id: selectedMeters }));
      dispatch(isFetchingModalAC(false));
    }
  };

  const onActivateMeterClick = async () => {
    if (selectedConcentrator) {
      dispatch(isFetchingModalAC(true));
      await dispatch(activateLoraConcentratorMeters({ concentratorId: selectedConcentrator.id, id: selectedMeters }));
      dispatch(isFetchingModalAC(false));
    }
  };

  return (
    <div className="info-by-power-lorawan-device">
      <div className="info-by-power-lorawan-device__wrap d-flex ">
        <ConcentratorsList
          setSelectedConcentratorCallBack={setSelectedConcentratorCallBack}
          allConcentrators={allConcentrators}
          toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
          toggleActiveConcentratorPopup={toggleActivateConcentratorPopup}
        />
        <div className="flex-grow-1">
          <ConcentratorDetailListHeader
            filterRef={filterRef}
            isConcentratorSelected={Boolean(selectedConcentrator)}
            selectedConcentrator={selectedConcentrator}
          />
          
          {selectedConcentrator && (
            <ConcentratorMetersList
              id={selectedConcentrator.id}
              filterHeight={filterHeight}
              toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
              toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
            />
          )}
        </div>
      </div>

      <Modal
        show={deleteConcentratorPopup}
        onHide={() => toggleDeleteConcentratorPopup(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <DeactivateConcentratorPopup
          isFetchingModal={isFetchingModal}
          onClick={async () => {
            if (selectedConcentrator !== null) {
              dispatch(isFetchingModalAC(true));
              await dispatch(deactivateActivateLoraConcentrator(selectedConcentrator.id));
              dispatch(isFetchingModalAC(false));
            }
          }}
          toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
        />
      </Modal>

      <Modal
        show={activateConcentratorPopup}
        onHide={() => toggleActivateConcentratorPopup(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ActivateConcentratorPopup
          isFetchingModal={isFetchingModal}
          onClick={async () => {
            if (selectedConcentrator !== null) {
              dispatch(isFetchingModalAC(true));
              dispatch(deactivateActivateLoraConcentrator(selectedConcentrator.id));
              dispatch(isFetchingModalAC(false));
            }
          }}
          toggleDeleteConcentratorPopup={toggleActivateConcentratorPopup}
        />
      </Modal>

      <Modal
        show={deactivateConcentratorMeter}
        onHide={() => toggleDeactivateConcentratorMeter(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <DeactivateConcentratorMeterPopup
          toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
          selectedMeters={selectedMeters}
          selectedConcentratorMeters={selectedConcentratorMeters?.data}
          isFetchingModal={isFetchingModal}
          onClick={onDeactivateMeterClick}
        />
      </Modal>

      <Modal
        show={activateConcentratorMeter}
        onHide={() => toggleActivateConcentratorMeter(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ActivateConcentratorMeterPopup
          toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
          selectedMeters={selectedMeters}
          selectedConcentratorMeters={selectedConcentratorMeters?.data}
          isFetchingModal={isFetchingModal}
          onClick={onActivateMeterClick}
        />
      </Modal>
    </div>
  );
});
