import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
//components
import { WaterGraphs } from "./components/Graphs";
import { WaterMainTable } from "./components/tables/MainTable";
import { WaterHourlyTable } from "./components/tables/MainTable/WaterHourlyTable";
import { WaterIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter";
// redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  getHourlyWaterMeterInfoGraph,
  getHourlyWaterMeterInfoTable,
  getWaterMeterInfoGraph,
  getWaterMeterInfoTable,
} from "../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import { HourlyWaterIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/HourlyWaterIndicationFilter";
import {
  resetWaterIndicationState,
  setCurrentReadMeterName,
} from "../../../store/slicesAndThunks/waterIndication/waterIndication.slices";

export const WaterReadDataViewsPage: FC = () => {
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  // data from url & redux
  const { token, tokenHourly, meterId } = queryString.parse(history.location.search.substring(1));
  const { mainGraphData, mainHourlyGraphData } = useTypedSelector((state) => state.waterIndication);

  // tabs handlers
  const [tabValue, setTabValue] = useState<string>("DAILY");
  // loading handlers
  const [loading, setLoading] = useState<boolean>(false);
  const [hourlyLoading, setHourlyLoading] = useState<boolean>(false);

  const getTableAndGraphDailyData = async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    await dispatch(getWaterMeterInfoGraph(token as string));
    await dispatch(getWaterMeterInfoTable({ page: 1, token: token as string }));
    setLoading(false);
  };

  useEffect(() => {
    getTableAndGraphDailyData();
  }, [token]);

  const getTableAndGraphHourlyData = async () => {
    if (!tokenHourly) {
      return;
    }

    setHourlyLoading(true);
    await dispatch(getHourlyWaterMeterInfoGraph({ token: tokenHourly as string }));
    await dispatch(getHourlyWaterMeterInfoTable({ token: tokenHourly as string, pageNum: 1 }));
    setHourlyLoading(false);
  };

  useEffect(() => {
    getTableAndGraphHourlyData();
  }, [tokenHourly]);

  const tableData = useTypedSelector((state) => state.waterIndication.mainTableData?.data);

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        tableData && tableData.length !== 0 && meterId ? tableData[0].devEUI : "ПУ воды LoRaWAN и UDP"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [tableData]);

  useEffect(() => {
    return () => {
      dispatch(resetWaterIndicationState());
    };
  }, []);

  return (
    <div className="read-data-views-page tabs-type2">
      <CTabs activeTab={tabValue as string}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink onClick={() => setTabValue("DAILY")} data-tab="DAILY">
              Просмотр данных
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={() => setTabValue("HOURLY")} data-tab={"HOURLY"}>
              Часовые показания
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="DAILY">
            <div className="read-data-views-page">
              {meterId && <WaterIndicationFilter />}
              <WaterGraphs mainGraphData={mainGraphData} />
              <WaterMainTable loading={loading} setLoading={setLoading} />
            </div>
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="HOURLY">
            {meterId && <HourlyWaterIndicationFilter />}
            <WaterGraphs mainGraphData={mainHourlyGraphData} hourly />
            <WaterHourlyTable loading={hourlyLoading} setLoading={setHourlyLoading} />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
