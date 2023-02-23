import { FC, useEffect, useMemo } from "react";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
import { Spinner } from "react-bootstrap";
//components
import { PowerGraphs } from "./components/Graphs";
import { StatusesTable } from "./components/tables/StatusesTable";
import { MainTable } from "./components/tables/MainTable/MainTable";
import { EventsTable } from "./components/tables/EventsTable";
import { PowerIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilter";

import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { getUsdpGraphData, getUsdpTableData, saveMainTableExcel } from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import {
  getMeterInfoGraph,
  getMeterInfoTable,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import {
  resetIndicationStatePower,
  setCurrentReadMeterName,
  setCurrentUspdDeviceName,
  setSelectedMeterType,
  toggleGetTableDataFetching,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { PowerGraphUspd } from "./components/Graphs/PowerGraphUspd";

export const PowerReadDataViewsPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isFetchingData = useTypedSelector((state) => state.powerIndication.getTableConsiderDataFetching);
  const { token, page, meterId } = queryString.parse(history.location.search.substring(1));

  const getTableInfoCallback = (page: number) => {
    dispatch(
      getUsdpTableData({
        page,
        token: token as string,
      })
    );
  };

  const { uspdTableData, uspdGraphData, uspdDataFetching, uspdCurrentDeviceName } = useTypedSelector((state) => state.powerIndication);

  useEffect(() => {
    if (token !== undefined) {
      dispatch(getUsdpGraphData(token as string));
      dispatch(
        getUsdpTableData({
          page: +page,
          token: token as string,
        })
      );
    }
  }, [token]);

  useEffect(() => {
    if (uspdGraphData && uspdGraphData.length) {
      dispatch(setCurrentReadMeterName(`ПУ электроэнергии УСПД / ${uspdGraphData[0].deviceName.toString()}`))
      dispatch(setCurrentUspdDeviceName(uspdGraphData[0].deviceName.toString()))
    } else {
      dispatch(setCurrentReadMeterName("ПУ электроэнергии УСПД"))
    }

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [uspdGraphData]);

  const currentTableData = useMemo(() => {
    if (uspdCurrentDeviceName && uspdTableData?.length) {
      return uspdTableData.find(item => item.deviceName === Number(uspdCurrentDeviceName))?.data
    }
    return null
  }, [uspdCurrentDeviceName, uspdTableData])

  const currentGraphData = useMemo(() => {
    if (uspdCurrentDeviceName && uspdGraphData?.length) {
      return uspdGraphData.find(item => item.deviceName === Number(uspdCurrentDeviceName))?.data
    }
    return null
  }, [uspdCurrentDeviceName, uspdGraphData])

  const saveExcelCallBack = () => dispatch(saveMainTableExcel(token as string));

  useEffect(() => {
    dispatch(setSelectedMeterType("uspdMeter"));

    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

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
          <PowerIndicationFilter />
          <CTabPane data-tab="main-table">
            {isFetchingData ? (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {uspdDataFetching &&
                  <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                    <Spinner animation="border" />
                  </div>
                }

                {uspdGraphData && currentGraphData &&
                  <PowerGraphUspd
                    graphData={currentGraphData}
                  />
                }

                {uspdTableData && currentTableData &&
                  <MainTable
                    tableData={currentTableData.data}
                    token={token as string}
                    page={+page}
                    totalPages={currentTableData.totalPage}
                    saveExcelCallBack={saveExcelCallBack}
                    getTableInfoCallback={getTableInfoCallback}
                  />
                }
              </>
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="events-table">
            {currentTableData && (
              <EventsTable
                tableData={currentTableData.data}
                token={token as string}
                page={+page}
                totalPages={currentTableData.totalPage}
                getTableInfoCallback={getTableInfoCallback}
              />
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="statuses-table">
            {currentTableData && (
              <StatusesTable
                tableData={currentTableData.data}
                token={token as string}
                page={+page}
                totalPages={currentTableData.totalPage}
                getTableInfoCallback={getTableInfoCallback}
              />
            )}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
