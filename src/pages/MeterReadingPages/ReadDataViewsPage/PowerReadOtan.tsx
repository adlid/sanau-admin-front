import { FC, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
//components
import { PowerGraphsOTAN } from "./components/Graphs/PowerGraphsOTAN";
import { PowerMeterOtanDailyTable } from "./components/tables/MainTable/PowerMeterOtanDailyTable";
import { PowerMeterOtanHourlyTable } from "./components/tables/MainTable/PowerMeterOtanHourlyTable";
import { PowerMeterOtanCurrentTable } from "./components/tables/MainTable/PowerMeterOtanCurrentTable";
import { PowerIndicationFilterOtan } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilterOtan";
// ts
import { gprsExcellType, gprsFilterType } from "../../../ts/types/indication.types";
// redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  resetIndicationStatePower,
  setOtanTablePagination,
  setSelectedMeterType,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import {
  getOtanHourlyTableValuesThunk,
  getOtanDailyTableValuesThunk,
  saveExcelOtanMeters,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

export const PowerReadOtan: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  // data from redux
  const { metersId } = useTypedSelector((state) => state.powerIndication);
  const {
    OtanTableCurrentData,
    OtanTableHourlyData,
    OtanTableDailyData,
    OtanGraphData,
    OtanTablePagination,
    mainTableConsiderData,
    getTableConsiderDataFetching,
    selectedGraphNumber
  } = useTypedSelector((state) => state.powerIndication);

  // location parameters
  const { meterId, groupValue, dateFrom, dateTo, parameterValue }: any = queryString.parse(history.location.search.substring(1));

  const getTableInfoCallback = (page: number) => {
    const body: gprsFilterType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: groupValue,
      page: page,
      parameterValue
    };

    groupValue === "DAILY" || groupValue === "MONTHLY"
      ? dispatch(getOtanDailyTableValuesThunk(body))
      : dispatch(getOtanHourlyTableValuesThunk(body));
  };

  const saveExcelCallBack = () => {
    const body: gprsExcellType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: groupValue,
    };
    dispatch(saveExcelOtanMeters(body));
  };

  useEffect(() => {
    dispatch(setSelectedMeterType("otan"));

    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

  useEffect(() => {
    if (OtanTableDailyData && getActualDailyTableData) {
      const { data, ...rest } = getActualDailyTableData;
      dispatch(setOtanTablePagination(rest));
    } else if (OtanTableHourlyData && getActualHourlyTableData) {
      const { data, ...rest } = getActualHourlyTableData;
      dispatch(setOtanTablePagination(rest));
    } else if (OtanTableCurrentData && getActualCurrentTableData) {
      const { data, ...rest } = getActualCurrentTableData;
      dispatch(setOtanTablePagination(rest));
    }
  }, [selectedGraphNumber, OtanTableDailyData, OtanTableHourlyData, OtanTableCurrentData])

  const getActualDailyTableData = useMemo(() => {
    if (OtanTableDailyData) {
      let index = OtanTableDailyData.findIndex(val => val.deviceName.toString() === selectedGraphNumber);
      if (index != -1) {
        return OtanTableDailyData[index].data;
      }
    }
    return null
  }, [OtanTableDailyData, selectedGraphNumber])

  const getActualHourlyTableData = useMemo(() => {
    if (OtanTableHourlyData) {
      let index = OtanTableHourlyData.findIndex(val => val.deviceName.toString() === selectedGraphNumber);
      if (index != -1) {
        return OtanTableHourlyData[index].data;
      }
    }
    return null
  }, [OtanTableHourlyData, selectedGraphNumber])

  const getActualCurrentTableData = useMemo(() => {
    if (OtanTableCurrentData) {
      let index = OtanTableCurrentData.findIndex(val => val.deviceName.toString() === selectedGraphNumber);
      if (index != -1) {
        return OtanTableCurrentData[index].data;
      }
    }
    return null
  }, [OtanTableCurrentData, selectedGraphNumber])

  return (
    <div className="read-data-views-page tabs-type2">
      <CTabs activeTab="main-table">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="main-table">Просмотр данных</CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <PowerIndicationFilterOtan />

          {/* ПРОСМОТР ДАННЫХ */}
          <CTabPane data-tab="main-table">
            {getTableConsiderDataFetching ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {OtanGraphData && <PowerGraphsOTAN />}
                {getActualCurrentTableData && groupValue === "CURRENT" && (
                  <PowerMeterOtanCurrentTable
                    totalPages={getActualCurrentTableData.totalPage}
                    tableData={getActualCurrentTableData.data}
                    page={getActualCurrentTableData.page}
                    saveExcelCallBack={saveExcelCallBack}
                  />
                )}

                {getActualHourlyTableData && (groupValue === "HOURLY" || groupValue === "QUARTERLY") && (
                  <PowerMeterOtanHourlyTable
                    totalPages={getActualHourlyTableData.totalPage}
                    tableData={getActualHourlyTableData.data}
                    page={getActualHourlyTableData.page}
                    getTableInfoCallback={getTableInfoCallback}
                    saveExcelCallBack={saveExcelCallBack}
                  />
                )}

                {getActualDailyTableData && (groupValue === "DAILY" || groupValue === "MONTHLY") && (
                  <PowerMeterOtanDailyTable
                    totalPages={getActualDailyTableData.totalPage}
                    tableData={getActualDailyTableData.data}
                    page={getActualDailyTableData.page}
                    getTableInfoCallback={getTableInfoCallback}
                    saveExcelCallBack={saveExcelCallBack}
                  />
                )}

                {!OtanTableDailyData && !OtanTableHourlyData && !OtanTableCurrentData && (
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
