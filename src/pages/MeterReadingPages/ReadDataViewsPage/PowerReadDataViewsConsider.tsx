import { FC, useEffect } from "react";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
import { Spinner } from "react-bootstrap";
//components
import { PowerGraphs } from "./components/Graphs";
import { StatusesTable } from "./components/tables/StatusesTable";
import { MainTable } from "./components/tables/MainTable/MainTable";
import { EventsTable } from "./components/tables/EventsTable";
import { PowerIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilter";

import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  resetIndicationStatePower,
  setCurrentReadMeterName,
  setSelectedMeterType,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

export const PowerReadDataViewsConsider: FC = () => {
  const dispatch = useAppDispatch();

  const isFetchingData = useTypedSelector((state) => state.powerIndication.getTableConsiderDataFetching);
  const { mainGraphData, mainTableData, mainTableConsiderData } = useTypedSelector((state) => state.powerIndication);

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        mainTableConsiderData && mainTableConsiderData.length !== 0 && mainTableConsiderData.length === 1
          ? mainTableConsiderData[0].serial
          : "ПУ электроэнергии УСПД"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [mainTableConsiderData]);

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
            {!mainGraphData && !mainTableData && (
              <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            )}
            {mainTableConsiderData && (
              <>
                <PowerGraphs />
                <MainTable tableData={mainTableConsiderData} />
              </>
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="events-table">
            {mainTableConsiderData && <EventsTable tableData={mainTableConsiderData} />}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="statuses-table">
            {mainTableConsiderData && <StatusesTable tableData={mainTableConsiderData} />}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
