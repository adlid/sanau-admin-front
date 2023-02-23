import { FC, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
//components
import { PowerIndicationFilterOtan } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilterOtan";
// ts
import { dinRailExcellFilterType, dinRailFilterType } from "../../../ts/types/indication.types";
// redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  resetIndicationStatePower,
  setSelectedMeterType,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import {
  getDinRailTableValuesThunk,
  saveExcelDinRailMeters,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import { PowerMeterDinRailCurrentTable } from "./components/tables/MainTable/PowerMeterDinRailCurrentTable";
import { PowerMeterDinRailDailyTable } from "./components/tables/MainTable/PowerMeterDinRailDailyTable";
import { PowerGraphsDinRail } from "./components/Graphs/PowerGraphsDinRail";
import { PowerIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter";

export const PowerReadDinRail: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  // data from redux
  const { metersId } = useTypedSelector((state) => state.powerIndication);
  const {
    DinRailReadCurrentTableData,
    DinRailTableData,
    DinRailTablePagination,
    DinRailGraphData,
    getTableConsiderDataFetching,
    selectedGraphNumber
  } = useTypedSelector((state) => state.powerIndication);

  // location parameters
  const { meterId, groupValue, dateFrom, dateTo }: any = queryString.parse(history.location.search.substring(1));

  const getTableInfoCallback = (page: number) => {
    const body: dinRailFilterType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: groupValue,
      page: page,
    };

    dispatch(getDinRailTableValuesThunk(body));
  };

  const saveExcelCallBack = () => {
    const body: dinRailExcellFilterType = {
      from: new Date(dateFrom).toISOString(),
      to: new Date(dateTo).toISOString(),
      meterId: !meterId ? metersId : [meterId],
      type: groupValue,
    };
    dispatch(saveExcelDinRailMeters(body));
  };

  useEffect(() => {
    dispatch(setSelectedMeterType("dinrail"));

    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

  const getCurrentDinRailTableData = useMemo(() => {
    if (DinRailTableData) {
      let index = DinRailTableData.findIndex(val => val.deviceName.toString() === selectedGraphNumber);
      if (index != -1) {
        return DinRailTableData[index].data;
      }
    }
    return null
  }, [DinRailTableData, selectedGraphNumber])

  return (
    <div className="read-data-views-page tabs-type2">
      <CTabs activeTab="main-table">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="main-table">Просмотр данных</CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <PowerIndicationFilter />

          {/* ПРОСМОТР ДАННЫХ */}
          <CTabPane data-tab="main-table">
            {getTableConsiderDataFetching ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {DinRailGraphData && <PowerGraphsDinRail />}
                {DinRailReadCurrentTableData && groupValue === "CURRENT" && (
                  <PowerMeterDinRailCurrentTable
                    tableData={DinRailReadCurrentTableData}
                    saveExcelCallBack={saveExcelCallBack}
                  />
                )}

                {getCurrentDinRailTableData && groupValue !== "CURRENT" && (
                  <PowerMeterDinRailDailyTable
                    totalPages={DinRailTablePagination?.totalPage}
                    tableData={getCurrentDinRailTableData.data}
                    getTableInfoCallback={getTableInfoCallback}
                    saveExcelCallBack={saveExcelCallBack}
                  />
                )}

                {!DinRailReadCurrentTableData && !DinRailTableData && (
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
