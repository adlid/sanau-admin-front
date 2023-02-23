import { FC, useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
//components
import { PowerIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilter";
import { PowerMeterGPRSMainTable } from "./components/tables/MainTable/PowerMeterGPRSMainTable";
import { EventsTableGPRS } from "./components/tables/EventsTable/EventsTableGPRS";
import { PowerGraphsGPRS } from "./components/Graphs/PowerGraphsGPRS";
// redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  resetIndicationStatePower,
  resetSelectAllMeters,
  setCurrentGPRSItemDeviceName,
  setCurrentReadMeterName,
  setSelectedMeterType,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import {
  getGPRSEventsTableValuesThunk,
  getGPRSTableDataNew,
  getGPRSTableValuesThunk,
  readGPRSEventsTableValuesThunk,
  saveExcelGRPSMeters,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import { gprsExcellType, gprsFilterType } from "../../../ts/types/indication.types";
import { GPRSEventsLogTable } from "./components/tables/EventsTable/GPRSEventsLogTable";
import { getCurrentGPRSGraphData, getCurrentGPRSTableData } from "../../../store/selects/powerIndication.selector";
import { PowerIndicationFilterGPRSEvents } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilterGPRSEvents";
// import { getCurrentGPRSGraphData, getCurrentGPRSTableData } from "../../../store/selects/powerIndication.selector";

export const PowerReadGPRSConsider: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    GPRSTableData,
    GPRSTablePagination,
    GPRSGraphData,
    GPRSEventsTableData,
    getTableConsiderDataFetching,
    getTableEventsDataFetching,
    GPRSEventsTablePagination,
  } = useTypedSelector((state) => state.powerIndication);

  const { metersId, currentGPRSItemDeviceName } = useTypedSelector((state) => state.powerIndication);

  // location parameters
  const { meterId, groupValue, dateFrom, dateTo, parameterValue }: any = queryString.parse(
    history.location.search.substring(1)
  );

  function dateIsValid(date: string) {
    return !Number.isNaN(new Date(date).getTime());
  }

  const getTableInfoCallback = (page: number) => {
    if (dateIsValid(dateFrom) && dateIsValid(dateTo)) {
      const body2 = {
        meterId: !meterId ? metersId : [meterId],
        from: new Date(dateFrom).toISOString(),
        to: new Date(dateTo).toISOString(),
        type: groupValue === "select" ? null : groupValue,
        parameterValue: parameterValue,
        page: page - 1 < 0 ? 0 : page - 1,
        size: 10
      };
      dispatch(getGPRSTableDataNew(body2));
    }
  };

  const getEventsTableInfoCallback = (page: number) => {
    const body: gprsFilterType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: "ALL",
      page
    };
    dispatch(getGPRSEventsTableValuesThunk(body));
  };

  const saveExcelCallBack = () => {
    const body: gprsExcellType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: groupValue,
    };

    dispatch(saveExcelGRPSMeters(body));
  };

  useEffect(() => {
    getTableInfoCallback(1);
    dispatch(setSelectedMeterType("gprsMeter"));

    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

  const { GPRSGraphDataNew, GPRSTableDataNew } = useTypedSelector((store) => store.powerIndication)

  // const currentGPRSTableData = useTypedSelector(getCurrentGPRSTableData);
  const currentGPRSGraphData = useTypedSelector(getCurrentGPRSGraphData);

  const getCurrentGPRSTableData = useMemo(() => {
    if (GPRSTableDataNew) {
      let index = GPRSTableDataNew.findIndex(val => val.deviceName === currentGPRSItemDeviceName);
      if (index != -1) {
        return GPRSTableDataNew[index].data;
      }
    }
    return null
  }, [GPRSTableDataNew, currentGPRSItemDeviceName])

  useEffect(() => {
    if (GPRSGraphDataNew && GPRSGraphDataNew.length) {
      dispatch(setCurrentGPRSItemDeviceName(GPRSGraphDataNew[0].deviceName))
    }

    dispatch(
      setCurrentReadMeterName(`ПУ электроэнергии GPRS ${(GPRSTableDataNew && GPRSGraphDataNew)
        ? `/ ${currentGPRSItemDeviceName}`
        :
        ''
        }`)
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [GPRSGraphDataNew, GPRSTableDataNew])

  return (
    <div className="read-data-views-page tabs-type2">
      <CTabs activeTab="main-table">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="main-table">Просмотр данных</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="events-table">Журнал событий</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="statuses-table">Состояние</CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>

          {/* ПРОСМОТР ДАННЫХ */}
          <CTabPane data-tab="main-table">
            <PowerIndicationFilter />

            {getTableConsiderDataFetching ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {currentGPRSGraphData && <PowerGraphsGPRS />}
                {getCurrentGPRSTableData ? (
                  <PowerMeterGPRSMainTable
                    totalPages={getCurrentGPRSTableData.totalPage}
                    tableData={getCurrentGPRSTableData.data}
                    getTableInfoCallback={getTableInfoCallback}
                    saveExcelCallBack={saveExcelCallBack}
                    parameterValue={parameterValue}
                    page={getCurrentGPRSTableData.page + 1}
                  />
                ) : (
                  <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                    Данные отсутствуют
                  </div>
                )}
              </>
            )}
          </CTabPane>
        </CTabContent>

        {/* ЖУРНАЛ СОБЫТИЙ */}
        <CTabContent>
          <CTabPane data-tab="statuses-table">
            <PowerIndicationFilter />

            {getTableConsiderDataFetching ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {getCurrentGPRSTableData ? (
                  <EventsTableGPRS tableData={getCurrentGPRSTableData.data} />
                ) : (
                  <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                    Данные отсутствуют
                  </div>
                )}
              </>
            )}
          </CTabPane>
        </CTabContent>

        {/* СОСТОЯНИЕ */}
        <CTabContent>
          <CTabPane data-tab="events-table">
            <PowerIndicationFilterGPRSEvents />

            {getTableEventsDataFetching ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {GPRSEventsTableData.length !== 0 ? (
                  <GPRSEventsLogTable
                    tableData={GPRSEventsTableData}
                    totalPages={GPRSEventsTablePagination.totalPage}
                    getTableInfoCallback={getEventsTableInfoCallback}
                  />
                ) : (
                  <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                    Данные отсутствуют
                  </div>
                )}
              </>
            )}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
