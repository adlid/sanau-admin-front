import { FC, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import { Col, Row, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import * as queryString from "querystring";
//components
import { AddButton } from "../../../../../components/uiKit/Buttons/AddButton/";
import { AccordionItem } from "./components/AccordionItem/";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { DeactivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/DeactivateConcentratorMeterPopup";
import { ActivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/ActivateConcentratorMeterPopup/";
import { CustomRadio } from "../../../../../components/uiKit/Inputs/CustomRadio";
import { icons } from "../../../../../utils/icons/icons";
import { Pagination } from "../../../../../components/uiKit/Pagination";
//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { makeStyles } from "@material-ui/core/styles";
//redux
import {
  activateOrDeactivateBluetoothConcentratorMeters,
  bluetoothNewFilter,
} from "../../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.thunk";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  resetBluetoothConcentratorState,
} from "../../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.slice";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { Search } from "../../../../../components/uiKit/Search";
import { GroupListItem } from "../InfoByTransmissionDevice/components/GroupListItem";
import { uploadUSPDExcelThunk } from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

const useStyle = makeStyles((theme) => ({ root: { color: "#B9BEC7" } }));

export const InfoByBluetooth: FC = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { bluetoothPage } = queryString.parse(history.location.search.substring(1));

  const [page, setPage] = useState(1);

  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isFilterPopoverOpen, setFilterIsPopoverOpen] = useState(false);
  const [isFilterIconHover, setIsFilterIconHover] = useState(false);

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);
  const [openFirstCalendar2, setOpenFirstCalendar2] = useState(false);
  const [openSecondCalendar2, setOpenSecondCalendar2] = useState(false);

  const [categoryValue, setCategoryValue] = useState("personalAccountNumber");
  const [categoryValueBtnTitle, setCategoryValueBtnTitle] = useState("Лицевой счет");
  const [inputValue, setInputValue] = useState("");

  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [startDate2, setStartDate2] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate2, setFinishDate2] = useState<MaterialUiPickersDate | null>(null);

  const [accordion, setAccordion] = useState<null | number>(null);
  const [deactivateConcentratorMeter, toggleDeactivateConcentratorMeter] = useState(false);
  const [activateConcentratorMeter, toggleActivateConcentratorMeter] = useState(false);

  const { bluetoothConcentratorMeters, selectedMetersId, isFetchingModal, sortValue, selectedAllMeters } =
    useTypedSelector((state) => state.powerMeterBluetootConcentrator);

  useEffect(() => {
    dispatch(resetBluetoothConcentratorState());
    getBluetoothInfo(bluetoothPage !== undefined ? (+bluetoothPage as number) : 1);
    setPage(bluetoothPage !== undefined ? (+bluetoothPage as number) : 1);

    return () => {
      // dispatch(resetBluetoothConcentratorState());
    };
  }, []);

  useEffect(() => {
    toggleDeactivateConcentratorMeter(false);
    toggleActivateConcentratorMeter(false);
  }, [selectedMetersId]);

  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  const getBluetoothInfo = (
    page: number,
    sort = sortValue,
    start = startDate,
    start2 = startDate2,
    finish = finishDate,
    finish2 = finishDate2
  ) => {
    dispatch(
      bluetoothNewFilter({
        sortBy: sort,
        page: page,
        field: categoryValue,
        query: inputValue,
        createFrom: start,
        createTo: finish,
        fixFrom: start2,
        fixTo: finish2,
      })
    );
  };

  const search = () => {
    getBluetoothInfo(1);
    setPage(1);
    history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=1` });
  };

  const [searchValue, setSearchValue] = useState("");
  const [deleteConcentratorPopup, toggleDeleteConcentratorPopup] = useState(false);
  const [isSidebarOpen, toggleIsSidebarOpen] = useState(false);

  const setSelectedConcentratorCallBack = (value: any) => { };

  const inputRef = useRef<any>(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    let formData = new FormData();

    formData.append('file', fileObj)
    formData.append('type', 'BLUETOOTH')

    dispatch(uploadUSPDExcelThunk(formData))
  }

  const { isExcelLoading } = useTypedSelector(state => state.powerMeterTransmissionDeviceConcentrator)

  return (
    <div className="info-by-transmision-device">
      <div className="info-by-transmision-device__wrap d-flex">
        <div className="info-concentrators-list">
          <div className="info-concentrators-list__header">
            <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
            <div className="mb8px"></div>
            <AddButton
              title="Добавить группу"
              style={{ width: 174, height: 40, fontSize: 14 }}
              onClick={() => history.push("/admin/concentrators/power-meter/bluetooth/createGroup")}
            />
          </div>
          <div className="info-concentrators-list__quantity">Всего групп: 465</div>

          <div className="info-concentrators-list__body">
            <div className="info-concentrators-list__list">
              <GroupListItem
                name={"Наименование"}
                id={"111"}
                toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
                setSelectedConcentrator={setSelectedConcentratorCallBack}
                toggleIsSidebarOpen={toggleIsSidebarOpen}
                isActive={true}
              />
              {/* TO DO Добавить лист групп, в зависимости от которого начинается сортировка счетчиков справа */}
            </div>
          </div>
        </div>

        <div className="info-by-bluetooth" style={{ position: "relative", width: "calc(100% - 320px)" }}>
          <InputGroup className="info-by-bluetooth__filter">
            <InputGroup.Prepend>
              <Popover
                isOpen={isCategoryPopoverOpen}
                padding={5}
                positions={["bottom", "left"]}
                containerClassName="info-by-bluetooth__popover-sort-by-container"
                onClickOutside={() => {
                  setIsCategoryPopoverOpen(false);
                }}
                content={
                  <div className="info-by-bluetooth__sort-by">
                    <CustomRadio
                      title="Пользователь"
                      value="fullName"
                      selectedRadioValue={categoryValue}
                      onClick={(target) => {
                        setCategoryValue(target);
                        setCategoryValueBtnTitle("Пользователь");
                      }}
                    />
                    <div className="mb12px"></div>
                    <CustomRadio
                      title="Лицевой счет"
                      value="personalAccountNumber"
                      selectedRadioValue={categoryValue}
                      onClick={(target) => {
                        setCategoryValue(target);
                        setCategoryValueBtnTitle("Лицевой счет");
                      }}
                    />
                    <div className="mb12px"></div>
                    <CustomRadio
                      title="Серийный №"
                      value="serialNumber"
                      selectedRadioValue={categoryValue}
                      onClick={(target) => {
                        setCategoryValue(target);
                        setCategoryValueBtnTitle("Серийный №");
                      }}
                    />
                    <div className="mb12px"></div>
                    <CustomRadio
                      title="Адрес"
                      value="location"
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
            <FormControl
              className="info-by-bluetooth__form-control"
              placeholder="Поиск"
              aria-describedby="basic-addon1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e: any) => e.key === "Enter" && search()}
            />
            <InputGroup.Prepend>
              <Popover
                isOpen={isFilterPopoverOpen}
                padding={10}
                positions={["bottom", "left"]}
                containerClassName="info-by-bluetooth__popover-container"
                onClickOutside={() => {
                  setFilterIsPopoverOpen(false);
                }}
                content={
                  <div className="info-by-bluetooth__period">
                    <h4 className="info-by-bluetooth__title">По дате добавления</h4>
                    <div className="info-by-bluetooth__calendar d-flex align-items-center">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <KeyboardDatePicker
                          inputProps={{ className: classes.root }}
                          open={openFirstCalendar}
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          placeholder="ДД/ММ/ГГГГ"
                          value={startDate}
                          onClick={() => setOpenFirstCalendar(true)}
                          onClose={() => setOpenFirstCalendar(false)}
                          onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
                          KeyboardButtonProps={{ "aria-label": "change date" }}
                          keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                        />
                        <div className="mr8px"></div>
                        <KeyboardDatePicker
                          inputProps={{ className: classes.root }}
                          open={openSecondCalendar}
                          onClick={() => setOpenSecondCalendar(true)}
                          onClose={() => setOpenSecondCalendar(false)}
                          onChange={(date: MaterialUiPickersDate) => setFinishDate(date)}
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          placeholder="ДД/ММ/ГГГГ"
                          value={finishDate}
                          KeyboardButtonProps={{ "aria-label": "change date" }}
                          keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                          helperText={null}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                    <h4 className="info-by-bluetooth__title">По дате последней активности</h4>
                    <div className="info-by-bluetooth__calendar   d-flex align-items-center">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <KeyboardDatePicker
                          inputProps={{ className: classes.root }}
                          open={openFirstCalendar2}
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          placeholder="ДД/ММ/ГГГГ"
                          value={startDate2}
                          onClick={() => setOpenFirstCalendar2(true)}
                          onClose={() => setOpenFirstCalendar2(false)}
                          onChange={(date: MaterialUiPickersDate) => setStartDate2(date)}
                          KeyboardButtonProps={{ "aria-label": "change date" }}
                          keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                        />
                        <div className="mr8px"></div>
                        <KeyboardDatePicker
                          inputProps={{ className: classes.root }}
                          open={openSecondCalendar2}
                          onClick={() => setOpenSecondCalendar2(true)}
                          onClose={() => setOpenSecondCalendar2(false)}
                          onChange={(date: MaterialUiPickersDate) => setFinishDate2(date)}
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          placeholder="ДД/ММ/ГГГГ"
                          value={finishDate2}
                          KeyboardButtonProps={{ "aria-label": "change date" }}
                          keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                          helperText={null}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                    <div className="d-flex">
                      <MainButton
                        isSecondary
                        title="Сбросить"
                        style={{ width: 100, height: 40, fontSize: 14 }}
                        onClick={() => {
                          setStartDate(null);
                          setFinishDate(null);
                          setStartDate2(null);
                          setFinishDate2(null);
                          getBluetoothInfo(page, sortValue, null, null, null, null);
                        }}
                      />
                      <div className="mr16px"></div>
                      <MainButton
                        title="Применить"
                        style={{ width: 194, height: 40, fontSize: 14 }}
                        onClick={() => {
                          getBluetoothInfo(1);
                          setPage(1);
                          history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=1` });
                          setFilterIsPopoverOpen(false);
                        }}
                      />
                    </div>
                  </div>
                }
              >
                <div
                  onClick={() => setFilterIsPopoverOpen(true)}
                  onMouseOver={() => setIsFilterIconHover(true)}
                  onMouseLeave={() => setIsFilterIconHover(false)}
                  className={
                    isFilterPopoverOpen
                      ? "info-by-bluetooth__filter-icon info-by-bluetooth__filter-icon--open d-flex justify-content-center align-items-center"
                      : "info-by-bluetooth__filter-icon d-flex justify-content-center align-items-center"
                  }
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 15.75C9 15.5511 9.07902 15.3603 9.21967 15.2197C9.36032 15.079 9.55109 15 9.75 15H14.25C14.4489 15 14.6397 15.079 14.7803 15.2197C14.921 15.3603 15 15.5511 15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H9.75C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75ZM6 11.25C6 11.0511 6.07902 10.8603 6.21967 10.7197C6.36032 10.579 6.55109 10.5 6.75 10.5H17.25C17.4489 10.5 17.6397 10.579 17.7803 10.7197C17.921 10.8603 18 11.0511 18 11.25C18 11.4489 17.921 11.6397 17.7803 11.7803C17.6397 11.921 17.4489 12 17.25 12H6.75C6.55109 12 6.36032 11.921 6.21967 11.7803C6.07902 11.6397 6 11.4489 6 11.25ZM3 6.75C3 6.55109 3.07902 6.36032 3.21967 6.21967C3.36032 6.07902 3.55109 6 3.75 6H20.25C20.4489 6 20.6397 6.07902 20.7803 6.21967C20.921 6.36032 21 6.55109 21 6.75C21 6.94891 20.921 7.13968 20.7803 7.28033C20.6397 7.42098 20.4489 7.5 20.25 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75Z"
                      fill={isFilterPopoverOpen || isFilterIconHover ? "#fff" : "#8A93A2"}
                    />
                  </svg>
                </div>
              </Popover>
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <div
                onClick={search}
                className="info-by-bluetooth__filter-icon info-by-bluetooth__filter-icon--secondary d-flex justify-content-center align-items-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.44444 0C10.0036 0 12.8889 2.88528 12.8889 6.44444C12.8889 7.98389 12.3491 9.39726 11.4485 10.5056L15.8047 14.8619C16.0651 15.1223 16.0651 15.5444 15.8047 15.8047C15.5681 16.0414 15.1977 16.0629 14.9367 15.8693L14.8619 15.8047L10.5056 11.4485C9.39726 12.3491 7.98389 12.8889 6.44444 12.8889C2.88528 12.8889 0 10.0036 0 6.44444C0 2.88528 2.88528 0 6.44444 0ZM6.44444 1.33333C3.62166 1.33333 1.33333 3.62166 1.33333 6.44444C1.33333 9.26723 3.62166 11.5556 6.44444 11.5556C9.26723 11.5556 11.5556 9.26723 11.5556 6.44444C11.5556 3.62166 9.26723 1.33333 6.44444 1.33333Z"
                    fill="white"
                  />
                </svg>
              </div>
            </InputGroup.Prepend>
          </InputGroup>

          <div className=" info-by-bluetooth__btn-groups d-flex">
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
            <MainButton
              title="Импорт данных из Excel"
              style={{ width: 200, height: 40, fontSize: 14 }}
              onClick={handleClick}
              isDisabled={isExcelLoading}
              fetching={isExcelLoading}
            />
            {/* <Button className="info-by-bluetooth__btn">Импорт данных из Excel</Button> */}

            <div className="mr12px "></div>

            <MainButton
              title="Активировать"
              style={{ width: 175, height: 40, fontSize: 14 }}
              isDisabled={selectedMetersId.length === 0 ? true : false}
              onClick={() => toggleActivateConcentratorMeter(true)}
            />
            <div className="mr12px "></div>
            <MainButton
              title="Деактивировать"
              isAlarm
              style={{ width: 175, height: 40, fontSize: 14 }}
              isDisabled={selectedMetersId.length === 0 ? true : false}
              onClick={() => toggleDeactivateConcentratorMeter(true)}
            />
            <div className="mr12px "></div>

            <AddButton
              title="Добавить ПУ"
              style={{ width: 146, height: 40, fontSize: 14 }}
              onClick={() => {
                history.push("/admin/concentrators/power-meter/add-concentrator/connection-by-bluetooth");
              }}
            />
          </div>
          <div
            style={{
              overflow: "auto",
              height: "calc(100% - 195px)",
              position: "relative",
            }}
          >
            <div>
              <div style={{ minWidth: "1100px" }}>
                <div className="info-by-bluetooth__header">
                  <Row>
                    <Col xl={8}>
                      <Row>
                        <Col xl={3} lg={3}>
                          <div className="d-flex">
                            <div className="d-flex justify-content-end">
                              <input
                                style={{ marginLeft: "50px", marginRight: "25px" }}
                                type="checkbox"
                                className="checkbox-table"
                                checked={selectedAllMeters}
                                onChange={(e) => {
                                  if (e.target.checked) dispatch(selectAllMeters());
                                  else dispatch(removeSelectAllMeters());
                                }}
                              />
                            </div>

                            <span>Дата добавления</span>
                          </div>
                        </Col>
                        <Col xl={2} lg={2}>
                          Серийный №
                        </Col>
                        <Col xl={3} lg={3}>
                          Тип
                        </Col>
                        <Col xl={2} lg={2}>
                          Лицевой счет
                        </Col>
                        <Col xl={2} lg={2}>
                          Контрагент
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={4}>
                      <Row>
                        <Col xl={3} lg={2}>
                          Должность
                        </Col>
                        <Col xl={4} lg={4}>
                          Посл. активность
                        </Col>
                        <Col xl={2} lg={2}>
                          Активен
                        </Col>
                        <Col xl={2} lg={2}>
                          <div style={{ textAlign: "end" }}>Действия</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <div
                  className="info-by-bluetooth__body"
                  style={{ height: "calc(100% - 20px)", overflowY: "auto", overflowX: "hidden" }}
                >
                  {bluetoothConcentratorMeters &&
                    bluetoothConcentratorMeters.data.map((m, index) => {
                      return (
                        <AccordionItem
                          key={m.serialNumber}
                          accordion={accordion}
                          index={index}
                          setAccordion={setAccordion}
                          meterData={m}
                          removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
                          addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <Modal
            show={deactivateConcentratorMeter}
            onHide={() => toggleDeactivateConcentratorMeter(false)}
            dialogClassName="delete-concentrator-popup"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <DeactivateConcentratorMeterPopup
              toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
              selectedMeters={selectedMetersId}
              isFetchingModal={isFetchingModal}
              onClick={() => {
                dispatch(
                  activateOrDeactivateBluetoothConcentratorMeters({
                    ids: selectedMetersId,
                    value: "deactivate",
                    sortBy: sortValue,
                    page: page,
                    field: categoryValue,
                    query: inputValue,
                    createFrom: startDate,
                    createTo: finishDate,
                    fixFrom: startDate2,
                    fixTo: finishDate2,
                  })
                );
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
              selectedMeters={selectedMetersId}
              isFetchingModal={isFetchingModal}
              onClick={() => {
                dispatch(
                  activateOrDeactivateBluetoothConcentratorMeters({
                    ids: selectedMetersId,
                    value: "activate",
                    sortBy: sortValue,
                    page: page,
                    field: categoryValue,
                    query: inputValue,
                    createFrom: startDate,
                    createTo: finishDate,
                    fixFrom: startDate2,
                    fixTo: finishDate2,
                  })
                );
              }}
            />
          </Modal>

          <div className="mb20px"></div>

          <Pagination
            totalPage={bluetoothConcentratorMeters !== null ? bluetoothConcentratorMeters.totalPage : 1}
            page={page}
            onPageChanged={(page) => {
              history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=${page}` });
              getBluetoothInfo(page);
              setPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};
