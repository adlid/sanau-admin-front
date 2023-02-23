import { FC, useState, useEffect } from "react";
import { AccordionItem } from "../AccordionItem";
import { Col, Row, Spinner } from "react-bootstrap";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Popover } from "react-tiny-popover";

//components
import { Search } from "../../../../../../../components/uiKit/Search";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { OutlineButton } from "../../../../../../../components/uiKit/Buttons/OutlineButton";
import { CustomRadio } from "../../../../../../../components/uiKit/Inputs/CustomRadio";

//redux
import { getСoncentratorMetersPower } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  setMeterType,
  setSelectedMeterObj,
  addOneMeterIdToArr,
  setMeterSettings,
  setMeterSettingsInitialValues,
} from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { setUser } from "../../../../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.slice";

import { ConcentratorMeterType } from "../../../../../../../ts/types/dataTransmissionsDevice.types";
import { getFilteredMeters } from "../../../../../../../store/selects/concentrator.selector";
import { ICreateConcentrtorMeter } from "../../../../../../../ts/interfaces/powerMeterConcentrator";
import { personalAccountInitialValuesType } from "../../../../../../../ts/types/powerMeterBluetooth.types";
import { AccordionSidebar } from "./AccordionSidebar";
import { Drawer } from "@material-ui/core";
import { Pagination } from "../../../../../../../components/uiKit/Pagination";

type PropsType = {
  filterHeight?: any;
  id: string;
  toggleDeactivateConcentratorMeter: (bool: boolean) => void;
  toggleActivateConcentratorMeter: (bool: boolean) => void;
  toggleDeleteConcentratorMeter: (bool: boolean) => void;
};

export const ConcentratorDetailListAccordion: FC<PropsType> = (props) => {
  const {
    id,
    toggleDeactivateConcentratorMeter,
    toggleActivateConcentratorMeter,
    toggleDeleteConcentratorMeter,
    filterHeight,
  } = props;

  // hooks
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getСoncentratorMetersPower({ id, search: "", queryType: "serial" }));
  }, [id]);

  const { selectedConcentratorMeters, selectedAllMeters, selectedMeters, meterType } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const meters = useTypedSelector(getFilteredMeters);
  const { isFetchingSelectedConcentratorMeters } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const [accordion, setAccordion] = useState<null | number>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("serial");
  const [categoryValueBtnTitle, setCategoryValueBtnTitle] = useState("Серийный №");

  const addOneMeterIdToArrCallback = (id: string) => dispatch(addOneMeterIdToArr(id));

  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));

  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  const setSelectedMeterObjCallback = (meter: ConcentratorMeterType) => dispatch(setSelectedMeterObj(meter));

  const setMeterSettingsCallBack = (meterSettings: ICreateConcentrtorMeter) => {
    const meterSettingsInitialValues = {
      meterName: meterSettings.meterName,
      setUpOrganization: meterSettings.setUpOrganization,
      manufacturer: meterSettings.manufacturer,
      meterGeneration: meterSettings.meterGeneration,
      serial: meterSettings.serial.toString(),
      box: meterSettings.box.toString(),
      mod: meterSettings.mod.toString(),
      pos: meterSettings.pos.toString(),
      primaryLine: meterSettings.primaryLine.toString(),
      firstLine: meterSettings.firstLine.toString(),
      secondLine: meterSettings.secondLine.toString(),
      thirdLine: meterSettings.thirdLine.toString(),
      phase: meterSettings.phase,
      type: meterSettings.type,

      residue: meterSettings.residue,
      creditResidue: meterSettings.creditResidue,
      password: meterSettings.password,
      head: meterSettings.head,
      //state
      state: meterSettings.state,
      prevDayEnd: meterSettings.prevDayEnd,
      saveMaxPower: meterSettings.saveMaxPower,
      activeEnergy: meterSettings.desc3.activeEnergy,
      reactiveEnergy: meterSettings.desc3.reactiveEnergy,
      threePhaseVoltage: meterSettings.desc3.threePhaseVoltage,
      threePhaseAmperage: meterSettings.desc3.threePhaseAmperage,
      activePower: meterSettings.desc3.activePower,
      eventLogs: meterSettings.desc3.eventLogs,
      errorFlagPrevDay: meterSettings.desc6.errorFlagPrevDay,
      relayState: meterSettings.desc3.relayState,
      dailyFixingTime: meterSettings.desc6.dailyFixingTime,
      monthlyFixingTime: meterSettings.desc6.monthlyFixingTime,
      relayingStatus: meterSettings.desc3.relayingStatus,
    };

    dispatch(setMeterSettings(meterSettings));
    dispatch(setMeterSettingsInitialValues(meterSettingsInitialValues));
  };

  const setUserCallBack = (user: personalAccountInitialValuesType | null) => {
    dispatch(setUser(user));
  };

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>();
  const sideBarToggle = (state: boolean, item?: any) => {
    setSideBarOpen(state);
    id && setCurrentItem(item);
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => sideBarToggle(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px", height: "100%" }}>
          <AccordionSidebar meter={currentItem} close={() => sideBarToggle(false)} />
        </div>
      </Drawer>

      <div
        className="concentrator-detail-list-accordion"
        style={{
          height: `calc(100% - ${filterHeight}px - 16px)`,
          background: "#ffffff",
          position: "relative",
        }}
      >
        <span className="concentrator-detail-list-accordion__title">
          Всего приборов учета: {selectedConcentratorMeters.length}
        </span>

        <div className="concentrator-detail-list-accordion__filter d-flex ">
          <InputGroup.Prepend>
            <Popover
              isOpen={isCategoryPopoverOpen}
              padding={5}
              positions={["bottom", "left"]}
              containerClassName="info-by-bluetooth__popover-sort-by-container"
              onClickOutside={() => setIsCategoryPopoverOpen(false)}
              content={
                <div className="info-by-bluetooth__sort-by">
                  <CustomRadio
                    title="Пользователь"
                    value="user"
                    selectedRadioValue={categoryValue}
                    onClick={(target) => {
                      setCategoryValue(target);
                      setCategoryValueBtnTitle("Пользователь");
                    }}
                  />
                  <div className="mb12px"></div>
                  <CustomRadio
                    title="Лицевой счет"
                    value="accountNumber"
                    selectedRadioValue={categoryValue}
                    onClick={(target) => {
                      setCategoryValue(target);
                      setCategoryValueBtnTitle("Лицевой счет");
                    }}
                  />
                  <div className="mb12px"></div>
                  <CustomRadio
                    title="Серийный №"
                    value="serial"
                    selectedRadioValue={categoryValue}
                    onClick={(target) => {
                      setCategoryValue(target);
                      setCategoryValueBtnTitle("Серийный №");
                    }}
                  />
                  <div className="mb12px"></div>
                  <CustomRadio
                    title="Адрес"
                    value="address"
                    selectedRadioValue={categoryValue}
                    onClick={(target) => {
                      setCategoryValue(target);
                      setCategoryValueBtnTitle("Адрес");
                    }}
                  />
                </div>
              }
            >
              <Button
                className="info-by-bluetooth__category-btn"
                variant="outline-secondary"
                onClick={() => setIsCategoryPopoverOpen(true)}
              >
                <span>{categoryValueBtnTitle}</span>

                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8644 0.125877C11.9074 0.165677 11.9415 0.212958 11.9648 0.265012C11.988 0.317066 12 0.37287 12 0.429228C12 0.485585 11.988 0.541389 11.9648 0.593443C11.9415 0.645497 11.9074 0.692779 11.8644 0.732579L6.32661 5.87412C6.28374 5.91402 6.23282 5.94568 6.17675 5.96728C6.12068 5.98888 6.06058 6 5.99988 6C5.93918 6 5.87907 5.98888 5.82301 5.96728C5.76694 5.94568 5.71602 5.91402 5.67315 5.87412L0.135336 0.732578C0.0486812 0.652125 -2.37356e-08 0.543006 -1.87621e-08 0.429227C-1.37887e-08 0.315449 0.0486813 0.20633 0.135336 0.125876C0.22199 0.0454223 0.339519 0.000223819 0.462067 0.000223824C0.584615 0.00022383 0.702144 0.0454224 0.788797 0.125876L5.99988 4.96493L11.211 0.125877C11.2538 0.0859754 11.3048 0.0543181 11.3608 0.032718C11.4169 0.011118 11.477 -2.28615e-08 11.5377 -2.02082e-08C11.5984 -1.75549e-08 11.6585 0.011118 11.7146 0.0327181C11.7706 0.0543181 11.8216 0.0859754 11.8644 0.125877Z"
                    fill="#8A93A2"
                  />
                </svg>
              </Button>
            </Popover>
          </InputGroup.Prepend>

          <Search
            value={searchValue}
            onChange={(value: string) => {
              setSearchValue(value);
              dispatch(getСoncentratorMetersPower({ id, search: value, queryType: categoryValue }));
            }}
          />
          <div className="mr12px "></div>

          <div className="d-flex">
            <MainButton
              title="Активировать"
              style={{ width: 158, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0 || meterType === "active" ? true : false}
              onClick={() => toggleActivateConcentratorMeter(true)}
            />
            <div className="mr12px "></div>
            <MainButton
              title="Деактивировать"
              isAlarm
              style={{ width: 175, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0 || meterType === "deactive" ? true : false}
              onClick={() => toggleDeactivateConcentratorMeter(true)}
            />
          </div>
        </div>

        <div className="concentrator-detail-list-accordion__category d-flex">
          <OutlineButton
            onClick={() => dispatch(setMeterType("all"))}
            selectedBtnValue={meterType}
            btnValue="all"
            name="Все"
          />
          <div className="mr12px"></div>
          <OutlineButton
            onClick={() => dispatch(setMeterType("active"))}
            selectedBtnValue={meterType}
            btnValue="active"
            name="Активные"
          />
          <div className="mr12px"></div>
          <OutlineButton
            onClick={() => dispatch(setMeterType("deactive"))}
            selectedBtnValue={meterType}
            btnValue="deactive"
            name="Неактивные"
          />
        </div>

        <div className="concentrator-detail-list-accordion__header ">
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={2} lg={2} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={selectedAllMeters}
                onChange={(e) => {
                  if (e.target.checked) dispatch(selectAllMeters());
                  else dispatch(removeSelectAllMeters());
                }}
              />
              <span style={{ marginLeft: "20px" }}>№</span>
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              Сер.№
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Контрагент
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Лицевой счет
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              ФИО
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              Активен
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              Привязан
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}></Col>
          </Row>
        </div>

        <div className="concentrator-detail-list-accordion__wrap">
          {isFetchingSelectedConcentratorMeters && (
            <div className="concentrator-detail-list-accordion__preloader">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          {!isFetchingSelectedConcentratorMeters &&
            meters.map((item, index) => (
              <AccordionItem
                key={item.id}
                setAccordion={setAccordion}
                accordion={accordion}
                index={index}
                meterData={item}
                addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
                toggleDeleteConcentratorMeter={toggleDeleteConcentratorMeter}
                toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
                toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
                setSelectedMeterObjCallback={setSelectedMeterObjCallback}
                addOneIdToArrayCallBack={addOneMeterIdToArrCallback}
                setMeterSettingsCallBack={setMeterSettingsCallBack}
                setUserCallBack={setUserCallBack}
                sideBarToggle={sideBarToggle}
              />
            ))}

          {/* <div className="indication-meters-list__pagination">
            {meters && (
              <Pagination
                totalPage={meters.totalPage}
                page={meters ? +powerMetersPage : 1}
                onPageChanged={(page) => {
                  history.push({ search: `?powerMetersPage=${page}&tabValue=power&groupId=${groupId}` });
                  getPowerMetersCallback(page);
                }}
              />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};
