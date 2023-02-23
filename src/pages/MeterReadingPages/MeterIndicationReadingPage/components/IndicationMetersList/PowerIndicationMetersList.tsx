import { Col, Row, Spinner } from "react-bootstrap";
import React, { useState, useEffect, memo } from "react";
import { Drawer, MenuItem, Select } from "@material-ui/core";
//components
import { Search } from "../../../../../components/uiKit/Search";
import { Pagination } from "../../../../../components/uiKit/Pagination";
import { PowerIndicationMetersItem } from "./components/IndicationMetersItem";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { PowerIndicationsSideBar } from "../../../../../components/table/PowerIndicationsSideBar/PowerIndicationsSideBar";
// ts
import { IIndicationMeterListItemWithSelect } from "../../../../../ts/interfaces/indication.interface";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
  removeSelectAllMeters,
  resetSelectAllMeters,
  selectAllMeters,
  setSelectAllMeters,
  setSelectedMeterType,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { getAllMeterIdsThunk, indicationPowerMetersListByGroupKey } from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import { useSnackbar } from "notistack";

export const PowerIndicationMetersList = memo((props: any) => {
  const { meterDataFetching, setMeterDataFetching, filterHeight } = props;
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [isScroll, handleIsScroll] = useState(false);
  const [greyInputValue, setGreyInputValue] = useState("title");

  const { powerMetersPage, groupId }: any = queryString.parse(history.location.search.substring(1));
  const { selectedAllIndicationMeters, selectedMeterType, indicationMetersListArr, bluetoothMeterList, metersId } =
    useTypedSelector((state) => state.powerIndication);

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<any>();
  const sideBarToggle = (state: boolean, id?: string) => {
    setSideBarOpen(state);
    id && setCurrentItemId(id);
  };

  const getPowerMetersCallback = (page: number) => {
    dispatch(
      indicationPowerMetersListByGroupKey({ page: page, field: greyInputValue, key: groupId, query: searchValue })
    );
  };

  const handleChange = (event: any) => setGreyInputValue(event.target.value);
  const addMetersIdToArrCallBack = (id: string, type: string) => dispatch(addMetersIdToArr({ id, type }));
  const removeMetersIdFromArrCallBack = (id: string, type: string) => dispatch(removeMetersIdFromArr({ id, type }));

  const onSearchClick = async () => {
    if (!groupId) {
      enqueueSnackbar("Выберите группу из списка слева", { variant: "info" });
      return;
    }

    history.push({ search: `?powerMetersPage=1&tabValue=power&groupId=${groupId}` });
    setMeterDataFetching(true);
    await dispatch(
      indicationPowerMetersListByGroupKey({ page: 1, field: greyInputValue, key: groupId, query: searchValue })
    );
    setMeterDataFetching(false);
  };

  useEffect(() => {
    groupId && dispatch(removeSelectAllMeters());
  }, [groupId]);

  useEffect(() => {
    if (indicationMetersListArr && indicationMetersListArr.data.length) {
      dispatch(setSelectedMeterType(indicationMetersListArr.data[0].type))
    }
  }, [indicationMetersListArr])

  useEffect(() => {
    if ((selectedAllIndicationMeters && indicationMetersListArr) && groupId) {
      dispatch(getAllMeterIdsThunk({ groupId, meterType: selectedMeterType }))
    }
  }, [selectedAllIndicationMeters, indicationMetersListArr])

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => sideBarToggle(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px" }}>
          {indicationMetersListArr?.data?.length &&
            indicationMetersListArr.data
              .filter((meter) => meter.id === currentItemId)
              .map((meter) => {
                return <PowerIndicationsSideBar key={meter.id} meterData={meter} close={() => sideBarToggle(false)} />;
              })}

          {bluetoothMeterList?.data?.length &&
            bluetoothMeterList.data
              .filter((meter) => meter.serialNumber === currentItemId)
              .map((meter) => {
                return (
                  <PowerIndicationsSideBar
                    key={meter.serialNumber}
                    meterData={meter}
                    close={() => sideBarToggle(false)}
                  />
                );
              })}
        </div>
      </Drawer>

      <div
        className="indication-meters-list indication-meters-list-power"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
                {indicationMetersListArr && indicationMetersListArr?.data.length > 1 ?
                  <input
                    type="checkbox"
                    className="checkbox-table"
                    checked={selectedAllIndicationMeters}
                    onChange={e => {
                      e.stopPropagation();
                      if (e.target.checked) {
                        dispatch(setSelectAllMeters());
                      } else {
                        dispatch(resetSelectAllMeters());
                      }
                    }}
                  /> : null
                }
              </Col>
              <Col xl={4} lg={4} md={7} sm={7} className="table-group__column">
                <span className="indication-meters-list__card-title">Сер.№</span>
              </Col>
              <Col xl={3} lg={2} md={4} sm={4} className="table-group__column">
                <span className="indication-meters-list__card-title">Действителен </span>
              </Col>
              <Col xl={3} lg={4} md={5} sm={5} className="table-group__column">
                <span className="indication-meters-list__card-title">Послед. активность </span>
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
                indicationMetersListArr.data.map((meter: IIndicationMeterListItemWithSelect) => {
                  return (
                    <PowerIndicationMetersItem
                      key={meter.id}
                      isScroll={isScroll}
                      handleIsScroll={handleIsScroll}
                      meterData={meter}
                      addMetersIdToArrCallBack={addMetersIdToArrCallBack}
                      removeMetersIdFromArrCallBack={removeMetersIdFromArrCallBack}
                      sideBarToggle={sideBarToggle}
                      selectedMeterType={selectedMeterType}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="indication-meters-list__pagination">
            {indicationMetersListArr && (
              <Pagination
                totalPage={indicationMetersListArr.totalPage}
                page={powerMetersPage ? +powerMetersPage : 1}
                onPageChanged={(page) => {
                  history.push({ search: `?powerMetersPage=${page}&tabValue=power&groupId=${groupId}` });
                  getPowerMetersCallback(page);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
});
