import { FC, useEffect, useState } from "react";
import { Button, Col, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Popover } from "react-tiny-popover";
//components
import { AddButton } from "../../../../../components/uiKit/Buttons/AddButton/";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { CustomRadio } from "../../../../../components/uiKit/Inputs/CustomRadio";
import { ConcentratorMeterItem } from "./components/ConcentratorMeterItem/";
//picker
import { makeStyles } from "@material-ui/core/styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//redux
import { Drawer } from "@material-ui/core";
import { ActivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/ActivateConcentratorMeterPopup";
import { DeactivateConcentratorMeterPopup } from "../../../../../components/powerMeterConcentrator/DeactivateConcentratorMeterPopup";
import { Search } from "../../../../../components/uiKit/Search";
import {
  addMetersIdToArr,
  addOneMeterIdToArr,
  isFetchingModalAC,
  removeMetersIdFromArr,
  removeSelectAllMeters,
  resetFolderListGPRS,
  selectAllMeters,
  setSelectedFolderIdGPRS
} from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.slice";
import {
  activateGPRSMetersThunk,
  deactivateGPRSMetersThunk,
  getFoldersGPRS,
  getGPRSMetersList
} from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { GroupListItem } from "../InfoByTransmissionDevice/components/GroupListItem";
import { ConcentratorGRPSItemSideBar } from "./components/ConcentratorItemSideBar/ConcentratorGRPSItemSideBar";
import { GroupDetailListHeader } from "./components/GroupDetailListHeader";

const useStyle = makeStyles((theme) => ({ root: { color: "#B9BEC7" } }));

export const InfoByTCP: FC = () => {
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);

  const [categoryValue, setCategoryValue] = useState("accountNumber");
  const [categoryValueBtnTitle, setCategoryValueBtnTitle] = useState("Лицевой счет");
  const [inputValue, setInputValue] = useState("");
  const [folder, setFolder] = useState("Наименование")

  const { isFetchingModal, selectedAllMeters } = useTypedSelector((state) => state.powerMeterGPRSMeter);

  const { GPRSMetersList, selectedMeters, selectedFolderId, foldersList } = useTypedSelector((state) => state.powerMeterGPRSMeter);

  useEffect(() => {
    dispatch(getGPRSMetersList({ text: inputValue, queryType: categoryValue, folderId: "", type: "DIRECT" }));
  }, []);

  // SIDEBAR HANDLERS
  const [selectedItem, setSelecteditem] = useState<any>();
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  const [searchValue, setSearchValue] = useState("");

  const [deleteConcentratorPopup, toggleDeleteConcentratorPopup] = useState(false);
  const [isSidebarOpen, toggleIsSidebarOpen] = useState(false);

  const [deactivateConcentratorMeter, toggleDeactivateConcentratorMeter] = useState(false);
  const [activateConcentratorMeter, toggleActivateConcentratorMeter] = useState(false);

  const addOneMeterIdToArrCallback = (id: string) => dispatch(addOneMeterIdToArr(id));
  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  const onDeactivateMeterClick = async () => {
    dispatch(isFetchingModalAC(true));
    await dispatch(deactivateGPRSMetersThunk(selectedMeters));
    dispatch(isFetchingModalAC(false));
  };

  const onActivateMeterClick = async () => {
    dispatch(isFetchingModalAC(true));
    await dispatch(activateGPRSMetersThunk(selectedMeters));
    dispatch(isFetchingModalAC(false));
  };

  const setFolderId = (folderId: string) => {
    dispatch(setSelectedFolderIdGPRS(folderId))
    const id = foldersList.findIndex(item => item.id === folderId)
    if (id !== -1) {
      setFolder(foldersList[id].name)
      dispatch(getGPRSMetersList({ text: inputValue, queryType: categoryValue, folderId, type: "DIRECT" }));
    }
  }

  useEffect(() => {
    dispatch(getFoldersGPRS({ text: "" }))

    return () => {
      dispatch(setSelectedFolderIdGPRS(""))
      dispatch(resetFolderListGPRS())
    }
  }, [])

  return (
    <>
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorGRPSItemSideBar close={sideBarToggle(false)} selectedItem={selectedItem} />
        </div>
      </Drawer>

      <div className="info-by-transmision-device">
        <div className="info-by-transmision-device__wrap d-flex">
          <div className="info-concentrators-list">
            <div className="info-concentrators-list__header">
              <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
              <div className="mb8px"></div>
              <AddButton
                title="Добавить группу"
                style={{ width: 174, height: 40, fontSize: 14 }}
                onClick={() => history.push("/admin/concentrators/power-meter/createGroup?meterType='gprs")}
              />
            </div>
            <div className="info-concentrators-list__quantity">Всего групп: {foldersList.length}</div>

            <div className="info-concentrators-list__body">
              <div className="info-concentrators-list__list">
                {foldersList.filter(folder => folder.name.includes(searchValue)).map((folder) => (
                  <GroupListItem
                    name={folder.name}
                    id={folder.id}
                    toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
                    setSelectedConcentrator={(folderId: string) => setFolderId(folderId)}
                    toggleIsSidebarOpen={toggleIsSidebarOpen}
                    isActive={true}
                  />
                ))}

                {/* TO DO Добавить лист групп, в зависимости от которого начинается сортировка счетчиков справа */}
              </div>
            </div>
          </div>

          <div>
            <GroupDetailListHeader selectedGroup={{ name: [folder] }} />
            <div className="info-by-bluetooth" style={{ height: "100%", width: "100%" }}>
              <div className="d-flex">
                <InputGroup className="info-by-bluetooth__filter">
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
                  <FormControl
                    className="info-by-bluetooth__form-control"
                    placeholder="Поиск"
                    aria-describedby="basic-addon1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <InputGroup.Prepend>
                    <div
                      onClick={() => {
                        dispatch(getGPRSMetersList({ text: inputValue, queryType: categoryValue, folderId: selectedFolderId, type: "DIRECT" }));
                        // setPage(1);
                        // history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=1` });
                      }}
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

                <div className="mr12px "></div>

                <div className="d-flex">
                  <MainButton
                    title="Активировать"
                    style={{ width: 158, height: 40, fontSize: 14 }}
                    isDisabled={selectedMeters.length === 0}
                    onClick={() => toggleActivateConcentratorMeter(true)}
                  />
                  <div className="mr12px "></div>
                  <MainButton
                    title="Деактивировать"
                    isAlarm
                    style={{ width: 175, height: 40, fontSize: 14 }}
                    isDisabled={selectedMeters.length === 0}
                    onClick={() => toggleDeactivateConcentratorMeter(true)}
                  />
                </div>
              </div>

              <div className="info-by-bluetooth__header" style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                <Row style={{ padding: "16px" }}>
                  <Col xl={6}>
                    <Row>
                      <Col xl={1} lg={1}>
                        <input
                          type="checkbox"
                          className="checkbox-table"
                          checked={selectedAllMeters}
                          onChange={(e) => {
                            if (e.target.checked) dispatch(selectAllMeters());
                            else dispatch(removeSelectAllMeters());
                          }}
                        />
                      </Col>
                      <Col xl={3} lg={3}>
                        IP адрес
                      </Col>
                      <Col xl={2} lg={2}>
                        Порт
                      </Col>
                      <Col xl={3} lg={3}>
                        Сетевой адрес
                      </Col>
                      <Col xl={3} lg={3}>
                        Серийный №
                      </Col>
                    </Row>
                  </Col>

                  <Col xl={6}>
                    <Row>
                      <Col xl={3} lg={2}>
                        Лицевой счет
                      </Col>
                      <Col xl={3} lg={2}>
                        Посл. активность
                      </Col>
                      <Col xl={2} lg={2}>
                        Активен
                      </Col>
                      <Col xl={2} lg={2}>
                        Привязан
                      </Col>
                      <Col xl={2} lg={2}>
                        <div style={{ textAlign: "center" }}>Действия</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div
                className="info-by-bluetooth__body"
                style={{ height: "calc(100% - 253px)", overflowY: "auto", overflowX: "hidden" }}
              >
                {GPRSMetersList &&
                  GPRSMetersList.map((m) => {
                    return (
                      <ConcentratorMeterItem
                        meterData={m}
                        openSidebar={sideBarToggle(true)}
                        setSelecteditem={setSelecteditem}
                        addOneMeterIdToArrCallback={addOneMeterIdToArrCallback}
                        addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                        removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
                        toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
                        toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
                      />
                    );
                  })}
              </div>

              {/* <div className="mb20px"></div>
     <Pagination
       totalPage={bluetoothConcentratorMeters !== null ? bluetoothConcentratorMeters.totalPage : 1}
       page={page}
       onPageChanged={(page) => {
         history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=${page}` });
         setPage(page);
       }}
     /> */}
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
          selectedMeters={selectedMeters}
          selectedConcentratorMeters={GPRSMetersList}
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
          selectedConcentratorMeters={GPRSMetersList}
          isFetchingModal={isFetchingModal}
          onClick={onActivateMeterClick}
        />
      </Modal>
    </>
  );
};
