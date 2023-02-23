import { FC, useEffect, useMemo } from "react";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
import { Spinner } from "react-bootstrap";
//components

import { PowerMeterHourlyEventsTable } from "./components/tables/StatusesTable/index";
import { PowerMeterHourly } from "./components/tables/MainTable/PowerMeterHourly";
import { PowerGraphs } from "./components/Graphs";

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
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { PowerGraphUspd } from "./components/Graphs/PowerGraphUspd";

export const PowerReadDataViewsHourly: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isFetchingData = useTypedSelector((state) => state.powerIndication.getTableConsiderDataFetching);
  const { token, page } = queryString.parse(history.location.search.substring(1));
  const { uspdGraphData, uspdCurrentDeviceName, uspdTableData, mainGraphData, mainTableData, mainTableConsiderData } = useTypedSelector((state) => state.powerIndication);

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

  const getTableInfoCallback = (page: number) => {
    dispatch(
      getUsdpTableData({
        page,
        token: token as string,
      })
    );
  };

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
                {" "}
                {
                  currentGraphData &&
                  <PowerGraphUspd graphData={currentGraphData} />
                }

                {currentTableData &&
                  <PowerMeterHourly
                    tableData={currentTableData.data}
                    token={token as string}
                    page={+page}
                    totalPages={currentTableData.totalPage}
                    saveExcelCallBack={saveExcelCallBack}
                    getTableInfoCallback={getTableInfoCallback}
                  />
                }
               
                {/* {mainTableConsiderData && (
                  <>
                    <PowerGraphs />
                    <PowerMeterHourly tableData={mainTableConsiderData} />
                  </>
                )} */}
              </>
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="statuses-table">
            {/* {mainTableConsiderData && <PowerMeterHourlyEventsTable tableData={mainTableConsiderData} />} */}
            {currentTableData && <PowerMeterHourlyEventsTable tableData={currentTableData.data} />}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
