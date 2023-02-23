import { FC, useState, useEffect, memo, useRef } from "react";
import { Modal } from "react-bootstrap";

//components
import { ConcentratorsList } from "./components/ConcentratorsList";
import { ConcentratorDetailListHeader } from "./components/ConcentratorDetailListHeader";
import { DeactivateConcentratorPopup } from "./components/DeactivateConcentratorPopup";
import { ConcentratorDetailListAccordion } from "./components/ConcentratorDetailListAccordion";
import { ActivateConcentratorPopup } from "./components/ActivateConcentratorPopup";
import { DeactivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/DeactivateConcentratorMeterPopup";
import { ActivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/ActivateConcentratorMeterPopup/";
import { DeleteConcentratorMeterPopup } from "./components/DeleteConcentratorMeterPopup";
import { ResetConcentratorPopup } from "./components/ResetConcentratorPopup";
import { ChangeTimeConcentratorPopup } from "./components/ChangeTimeConcentratorPopup";

//redux
import {
  getAllConcentrators,
  activateConcentratorMeters,
  deactivateConcentratorMeters,
  getSidebarConcentratorDate,
  deactivateActivateConcentrator,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import {
  setSelectedConcentrator,
  setMeterType,
  setScheduleValues,
  isFetchingModalAC,
  toggleIsConcentratorReset,
  toggleIsConcentratorChangeDate,
  toggleIsSidebarOpen,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { useAppDispatch, useTypedSelector, useWindowSize } from "../../../../../utils/hooks/reduxHooks";

export const InfoByTransmissionDevice: FC = memo(() => {
  // hooks
  const [width, height] = useWindowSize(); // on window resize listener

  // state handlers
  const [deleteConcentratorPopup, toggleDeleteConcentratorPopup] = useState(false);
  const [activateConcentratorPopup, toggleActivateConcentratorPopup] = useState(false);
  const [resetConcentratorPopup, toggleResetConcentratorPopup] = useState(false);

  const [deactivateConcentratorMeter, toggleDeactivateConcentratorMeter] = useState(false);

  const [activateConcentratorMeter, toggleActivateConcentratorMeter] = useState(false);
  const [deleteConcentratorMeter, toggleDeleteConcentratorMeter] = useState(false);
  const [changeConcentratorDate, toggleChangeConcentratorDatePopup] = useState(false);

  const dispatch = useAppDispatch();
  const {
    selectedConcentrator,
    allConcentrators,
    selectedConcentratorMeters,
    selectedMeters,
    isFetchingModal,
    isConcentratorReset,
    sideBarConcentratorDate,
    isConcentratorChangeDate,
    isSidebarOpen,
  } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  const setSelectedConcentratorCallBack = (id: string) => {
    allConcentrators.forEach((c) => {
      if (c.id === id) {
        dispatch(setSelectedConcentrator(c));
        dispatch(
          setScheduleValues({
            zeroDay: c.zeroDay,
            zeroTime: c.zeroTime,
            startTime: c.startTime,
            pollsPerDay: c.pollsPerDay,
            interval: c.interval,
          })
        );
      }
    });
  };

  const setSelectedConcentratorSchedule = () => {
    if (selectedConcentrator !== null) {
      dispatch(
        setScheduleValues({
          zeroDay: selectedConcentrator.zeroDay,
          zeroTime: selectedConcentrator.zeroTime,
          startTime: selectedConcentrator.startTime,
          pollsPerDay: selectedConcentrator.pollsPerDay,
          interval: selectedConcentrator.interval,
        })
      );
    }
  };

  const searchUSPDCallback = (value: string) => dispatch(getAllConcentrators(value));

  const setMeterTypeCallback = () => dispatch(setMeterType("all"));

  const getSidebarConcentratorDateCallback = () => {
    if (selectedConcentrator) dispatch(getSidebarConcentratorDate(selectedConcentrator.id));
  };

  const toggleIsSidebarOpenCB = (bool: boolean) => dispatch(toggleIsSidebarOpen(bool));

  useEffect(() => {
    dispatch(getAllConcentrators(""));
  }, []);

  useEffect(() => {
    toggleActivateConcentratorPopup(false);
    toggleDeleteConcentratorPopup(false);
  }, [allConcentrators]);

  useEffect(() => {
    toggleActivateConcentratorMeter(false);
    toggleDeactivateConcentratorMeter(false);
    toggleDeleteConcentratorMeter(false);
  }, [selectedConcentratorMeters]);

  useEffect(() => {
    if (isConcentratorReset) {
      toggleIsConcentratorReset(false);
      toggleResetConcentratorPopup(false);
    }
  }, [isConcentratorReset]);

  useEffect(() => {
    dispatch(toggleIsConcentratorChangeDate(false));
    toggleChangeConcentratorDatePopup(false);
  }, [isConcentratorChangeDate]);

  // height
  const filterRef: any = useRef();

  const [filterHeight, setFilterHeight] = useState<number>(0);

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
  }, [width, height]);

  return (
    <div className="info-by-transmision-device">
      <div className="info-by-transmision-device__wrap d-flex">
        <ConcentratorsList
          searchUSPDCallback={searchUSPDCallback}
          toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
          toggleActiveConcentratorPopup={toggleActivateConcentratorPopup}
          setSelectedConcentratorCallBack={setSelectedConcentratorCallBack}
          setMeterTypeCallback={setMeterTypeCallback}
          allConcentrators={allConcentrators}
          toggleIsSidebarOpen={toggleIsSidebarOpenCB}
        />

        <div className="flex-grow-1">
          <ConcentratorDetailListHeader
            filterRef={filterRef}
            isConcentratorSelected={Boolean(selectedConcentrator)}
            selectedConcentrator={selectedConcentrator}
            sideBarConcentratorDate={sideBarConcentratorDate}
            isSidebarOpen={isSidebarOpen}
            toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
            toggleActivateConcentratorPopup={toggleActivateConcentratorPopup}
            setSelectedConcentratorSchedule={setSelectedConcentratorSchedule}
            toggleResetConcentratorPopup={toggleResetConcentratorPopup}
            toggleChangeConcentratorDatePopup={toggleChangeConcentratorDatePopup}
            getSidebarConcentratorDateCallback={getSidebarConcentratorDateCallback}
            toggleIsSidebarOpen={toggleIsSidebarOpenCB}
          />
          {selectedConcentrator && (
            <ConcentratorDetailListAccordion
              filterHeight={filterHeight}
              toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
              toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
              toggleDeleteConcentratorMeter={toggleDeleteConcentratorMeter}
              id={selectedConcentrator.id}
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
          onClick={() => {
            if (selectedConcentrator !== null) {
              dispatch(isFetchingModalAC(true));
              dispatch(deactivateActivateConcentrator(selectedConcentrator.id));
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
          onClick={() => {
            if (selectedConcentrator !== null) {
              dispatch(isFetchingModalAC(true));
              dispatch(deactivateActivateConcentrator(selectedConcentrator.id));
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
          selectedConcentratorMeters={selectedConcentratorMeters}
          isFetchingModal={isFetchingModal}
          onClick={() => {
            if (selectedConcentrator) {
              dispatch(isFetchingModalAC(true));
              dispatch(deactivateConcentratorMeters({ concentratorId: selectedConcentrator.id, id: selectedMeters }));
            }
          }}
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
          selectedConcentratorMeters={selectedConcentratorMeters}
          isFetchingModal={isFetchingModal}
          onClick={() => {
            if (selectedConcentrator) {
              dispatch(isFetchingModalAC(true));
              dispatch(activateConcentratorMeters({ concentratorId: selectedConcentrator.id, id: selectedMeters }));
            }
          }}
        />
      </Modal>

      <Modal
        show={deleteConcentratorMeter}
        onHide={() => toggleDeleteConcentratorMeter(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <DeleteConcentratorMeterPopup toggleDeleteConcentratorMeter={toggleDeleteConcentratorMeter} />
      </Modal>

      <Modal
        show={resetConcentratorPopup}
        onHide={() => toggleResetConcentratorPopup(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ResetConcentratorPopup toggleResetConcentratorPopup={toggleResetConcentratorPopup} />
      </Modal>

      <Modal
        show={changeConcentratorDate}
        onHide={() => toggleChangeConcentratorDatePopup(false)}
        dialogClassName="changeTimeConcentratorPopup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ChangeTimeConcentratorPopup toggleChangeConcentrator={toggleChangeConcentratorDatePopup} />
      </Modal>
    </div>
  );
});
