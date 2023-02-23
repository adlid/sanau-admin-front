import React, { useState } from "react";

import { Drawer, MenuItem, Select } from "@material-ui/core";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { Col, Row, Spinner } from "react-bootstrap";
import { GasIndicationMetersItem } from "./components/IndicationMetersItem";
import { Pagination } from "../../../../../components/uiKit/Pagination";
//redux
import { indicationGasMetersListByGroupKey } from "../../../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { IGasIndicationMeterListItemWithSelect } from "../../../../../ts/interfaces/indication.interface";
import { Search } from "../../../../../components/uiKit/Search";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
  removeSelectAllMeters,
  selectAllMeters,
} from "../../../../../store/slicesAndThunks/gasIndication/gasIndication.slices";

import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import { GasIndicationsSideBar } from "../../../../../components/table/GasIndicationsSideBar/GasIndicationsSideBar";
import { useSnackbar } from "notistack";
import { ChangeGasValveClosingCauseModal } from "../../../../../components/uiKit/modals/ChangeGasValveClosingCauseModal/ChangeGasValveClosingCauseModal";

export const GasIndicationMetersList = (props: any) => {
  const { meterDataFetching, setMeterDataFetching, filterHeight, isMeterWithLink } = props;

  // hooks
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isScroll, handleIsScroll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [greyInputValue, setGreyInputValue] = useState("title");

  const { gasMetersPage, groupId }: any = queryString.parse(history.location.search.substring(1));
  const { selectedAllIndicationMeters, indicationMetersListArr, metersId } = useTypedSelector(
    (state) => state.gasIndication
  );

  const getGasMetersCallback = (page: number) =>
    dispatch(
      indicationGasMetersListByGroupKey({ page: page, field: greyInputValue, key: groupId, query: searchValue })
    );

  const handleChange = (event: any) => setGreyInputValue(event.target.value);
  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<any>();
  const sideBarToggle = (state: boolean, id?: string) => (event: any) => {
    setSideBarOpen(state);
    id && setCurrentItemId(id);
  };

  const onSearchClick = async () => {
    if (!groupId) {
      enqueueSnackbar("Выберите группу из списка слева", { variant: "info" });
      return;
    }
    history.push({ search: `?gasMetersPage=1&tabValue=gas&groupId=${groupId}` });
    setMeterDataFetching(true);
    await dispatch(
      indicationGasMetersListByGroupKey({ page: 1, field: greyInputValue, key: groupId, query: searchValue })
    );
    setMeterDataFetching(false);
  };

  const [valveClosingCauseModalOpen, setValveClosingCauseModalOpen] = useState<boolean>(false);
  const openValveClosingCauseModalOpenModal = () => setValveClosingCauseModalOpen(true);

  return (
    <>
      <ChangeGasValveClosingCauseModal
        open={valveClosingCauseModalOpen}
        onClose={() => setValveClosingCauseModalOpen(false)}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "900px", height: "100%" }}>
          {indicationMetersListArr?.data?.length &&
            indicationMetersListArr.data
              .filter((meter) => meter.id === currentItemId)
              .map((meter) => {
                return (
                  <GasIndicationsSideBar
                    key={meter.id}
                    meter={meter}
                    close={sideBarToggle(false)}
                    openValveClosingCauseModalOpenModal={openValveClosingCauseModalOpenModal}
                  />
                );
              })}
        </div>
      </Drawer>

      <div
        className="indication-meters-list indication-meters-list-water"
        style={{
          height: `calc(100% - ${filterHeight}px)`,
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div className="containerBox d-flex flex-column">
          <div className="indication-meters-list__search-block">
            <Search
              value={searchValue}
              onChange={async (value: string) => setSearchValue(value)}
              onEnterPress={onSearchClick}
            />
            <div className="indication-meters-list__search-select-parent">
              <Select
                className="indication-meters-list__search-select"
                value={greyInputValue}
                onChange={handleChange}
                displayEmpty={true}
                MenuProps={{
                  disableScrollLock: false,
                  anchorOrigin: { vertical: 20, horizontal: -13 },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                }}
              >
                <MenuItem value={"title"}>Наименование</MenuItem>
                <MenuItem value={"serialNumber"}>Серийный номер</MenuItem>
                <MenuItem value={"personalAccountNumber"}>Лицевой счет</MenuItem>
                <MenuItem value={"fio"}>ФИО контрагента</MenuItem>
                <MenuItem value={"manufacturer"}>Изготовитель</MenuItem>
                <MenuItem value={"organizationCollection"}>Организация, настроившая сбор</MenuItem>
              </Select>
            </div>
            <MainButton
              isSecondary={true}
              title="Поиск"
              style={{ width: 75, fontSize: 14, height: 40 }}
              onClick={onSearchClick}
            />
          </div>

          <div className="indication-meters-list__table-block">
            <Row className="indication-meters-list__table-group">
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedAllIndicationMeters && metersId.length === indicationMetersListArr?.data.length}
                  onChange={(e) => {
                    if (e.target.checked) dispatch(selectAllMeters());
                    else dispatch(removeSelectAllMeters());
                  }}
                />
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">№</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Серийный номер</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Активен</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Статус</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Привязан</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Послед. активность</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="indication-meters-list__card-title"> </span>
              </Col>
            </Row>
            <hr style={{ height: 2, margin: 0, backgroundColor: "#D7E2F2", border: "none" }} />

            <div className="indication-meters-list__wrap" onScroll={() => handleIsScroll(true)}>
              {meterDataFetching ? (
                <div className="indication-meters-list__preloader">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : indicationMetersListArr === null || indicationMetersListArr?.data.length === 0 ? (
                <div className="indication-meters-list__preloader">
                  <p>Нет данных</p>
                </div>
              ) : (
                indicationMetersListArr.data.map((meter: IGasIndicationMeterListItemWithSelect, index) => {
                  return (
                    <GasIndicationMetersItem
                      number={index + 1}
                      key={meter.id}
                      isScroll={isScroll}
                      isMeterWithLink={isMeterWithLink}
                      handleIsScroll={handleIsScroll}
                      meterData={meter}
                      addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                      removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
                      sideBarToggle={sideBarToggle}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="indication-meters-list__pagination">
            {indicationMetersListArr && (
              <Pagination
                totalPage={indicationMetersListArr?.totalPage}
                page={gasMetersPage ? +gasMetersPage : 1}
                onPageChanged={(page) => {
                  history.push({ search: `?gasMetersPage=${page}&tabValue=gas&groupId=${groupId}` });
                  getGasMetersCallback(page);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
