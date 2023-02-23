import * as queryString from "querystring";
import React, { FC, useState, useEffect } from "react";
import { ConcentratorMeterItem } from "../ConcentratorMeterItem";
import { Col, Row, Spinner } from "react-bootstrap";
import { Drawer, MenuItem, Select } from "@material-ui/core";
//components
import { Search } from "../../../../../../../components/uiKit/Search";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { ConcentratorMeterType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { searchPowerLorawanСoncentratorMeters } from "../../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import {
  addMetersIdToArr,
  addOneMeterIdToArr,
  removeMetersIdFromArr,
  removeSelectAllMeters,
  selectAllMeters,
  setSelectedMeterObj,
} from "../../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
// modals
import { ConcentratorMeterItemSideBar } from "../Sidebars/ConcentratorMeterItemSideBar/ConcentratorMeterItemSideBar";
import { Pagination } from "../../../../../../../components/uiKit/Pagination";
import { useHistory } from "react-router";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const menuProps: any = {
  disableScrollLock: false,
  anchorOrigin: { vertical: 10, horizontal: -13 },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null,
  PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: "12%" } },
};

type PropsType = { 
  id: string;
  filterHeight?: any;
  toggleDeactivateConcentratorMeter: (bool: boolean) => void;
  toggleActivateConcentratorMeter: (bool: boolean) => void;
};

export const ConcentratorMetersList: FC<PropsType> = (props) => {
  const { id, filterHeight, toggleDeactivateConcentratorMeter, toggleActivateConcentratorMeter } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
 
  // const [pageNum, setPageNum] = useState<number>(1);
  const { page }: any = queryString.parse(history.location.search.substring(1));
  const [searchValue, setSearchValue] = useState("");

  const [typeValue, setTypeValue] = useState("user");
  const handleChangeType = (event: any) => setTypeValue(event.target.value);

  const {
    isFetchingSelectedConcentratorMeters,
    selectedConcentratorMeters,
    selectedAllMeters,
    selectedMeters,
    selectedConcentrator,
  } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator);

  const setSelectedMeterObjCallback = (meter: ConcentratorMeterType) => dispatch(setSelectedMeterObj(meter));

  const searchMeters = async (pageNum?: number) => {
    await dispatch(
      searchPowerLorawanСoncentratorMeters({ id, page: pageNum || page || 1, query: searchValue, type: typeValue })
    );
  };

  useEffect(() => {
    searchMeters();
  }, [id, page]);

  const onSearchPress = async () => {
    searchMeters(1);
  };

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  const addOneMeterIdToArrCallback = (id: string) => dispatch(addOneMeterIdToArr(id));
  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  return (
    <>
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorMeterItemSideBar close={sideBarToggle(false)} />
        </div>
      </Drawer>

      <div
        className="power-lorawan-concentrator-meter-list"
        style={{
          height: `calc(100% - ${filterHeight}px - 16px)`,
          background: "#ffffff",
          position: "relative",
        }}
      >
        <span className="power-lorawan-concentrator-meter-list__title">
          Всего приборов учета: {selectedConcentratorMeters?.data.length}
        </span>

        <div className="power-lorawan-concentrator-meter-list__filter d-flex ">
          <Search
            value={searchValue}
            onChange={(value: string) => setSearchValue(value)}
            onEnterPress={onSearchPress}
          />
          <div className="power-lorawan-concentrator-meter-list__search-select-parent">
            <Select
              className="power-lorawan-concentrator-meter-list__search-select"
              value={typeValue}
              onChange={handleChangeType}
              displayEmpty={true}
              MenuProps={menuProps}
            >
              <MenuItem value={"user"}>Пользователь</MenuItem>
              <MenuItem value={"serial"}>Серийный номер</MenuItem>
              <MenuItem value={"accountNumber"}>Лицевой счет</MenuItem>
              {/* <MenuItem value={"partner"}>ФИО контрагента</MenuItem> */}
              {/* <MenuItem value={"devEUI "}>devEUI</MenuItem> */}
              <MenuItem value={"address"}>Адрес</MenuItem>
              {/* <MenuItem value={"type"}>Тип счетчика</MenuItem> */}
            </Select>
          </div>
          <div className="mr12px "></div>

          <div className="d-flex">
            <MainButton
              title="Активировать"
              style={{ width: 158, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0 || selectedConcentrator?.active}
              onClick={() => toggleActivateConcentratorMeter(true)}
            />
            <div className="mr12px "></div>
            <MainButton
              title="Деактивировать"
              isAlarm
              style={{ width: 175, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0 || !selectedConcentrator?.active}
              onClick={() => toggleDeactivateConcentratorMeter(true)}
            />
          </div>
        </div>

        <div className="power-lorawan-concentrator-meter-list__header">
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={selectedAllMeters}
                onChange={(e) => {
                  if (e.target.checked) dispatch(selectAllMeters());
                  else dispatch(removeSelectAllMeters());
                }}
              />
              <span style={{ marginLeft: "20px" }}>Наименование</span>
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Сер.№
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Лицевой счет
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Последняя активность
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

        <div className="power-lorawan-concentrator-meter-list__wrap">
          {isFetchingSelectedConcentratorMeters && (
            <div className="power-lorawan-concentrator-meter-list__preloader">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          {!isFetchingSelectedConcentratorMeters &&
            selectedConcentratorMeters?.data.map((item, index) => (
              <ConcentratorMeterItem
                key={item.id}
                meterData={item}
                setSelectedMeterObjCallback={setSelectedMeterObjCallback}
                sideBarToggle={sideBarToggle}
                toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
                toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
                addOneMeterIdToArrCallback={addOneMeterIdToArrCallback}
                addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
              />
            ))}
          <div className="mb20px"></div>
          <Pagination
            totalPage={selectedConcentratorMeters?.totalPage || 1}
            page={+page}
            onPageChanged={(page) => history.push({ search: `?tabValue=info-by-lorawan-udp&page=${page}` })}
          />
        </div>
      </div>
    </>
  );
};
