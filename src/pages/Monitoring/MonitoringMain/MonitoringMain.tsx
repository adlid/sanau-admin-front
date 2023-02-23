import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useState, useEffect, useRef } from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
// components
import { MonitoringFilter } from "./component/MonitoringFilter/MonitoringFilter";
import { IndicationLocationList } from "../../MeterReadingPages/MeterIndicationReadingPage/components/IndicationLocationList";
import { GasIndicationMetersList } from "../../MeterReadingPages/MeterIndicationReadingPage/components/IndicationMetersList/GasIndicationMetersList";
import {
  PowerIndicationMetersList,
  WaterIndicationMetersList,
} from "../../MeterReadingPages/MeterIndicationReadingPage/components/IndicationMetersList";
//ts redux
import { useAppDispatch, useDidUpdateEffect, useWindowSize } from "../../../utils/hooks/reduxHooks";
import { resetDetailTreeItem } from "../../../store/slicesAndThunks/groupControl/groupControl.slices";
import { resetGasIndicationState } from "../../../store/slicesAndThunks/gasIndication/gasIndication.slices";
import { resetIndicationStatePower } from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { resetWaterIndicationState } from "../../../store/slicesAndThunks/waterIndication/waterIndication.slices";

export const MonitoringMain: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // LOADERS
  const [meterDataFetching, setMeterDataFetching] = useState<boolean>(false);

  //  MAIN DATA
  const { tabValue, groupId } = queryString.parse(history.location.search.substring(1));

  const resetState = () => {
    dispatch(resetIndicationStatePower());
    dispatch(resetWaterIndicationState());
    dispatch(resetGasIndicationState());
    dispatch(resetDetailTreeItem());
  };

  useDidUpdateEffect(resetState, [tabValue]);

  const topMenuRef: any = useRef();
  const filterRef: any = useRef();
  const waterFilterRef: any = useRef();
  const gasFilterRef: any = useRef();

  const [filterHeight, setFilterHeight] = useState<number>(0);
  const [waterFilterHeight, setWaterFilterHeight] = useState<number>(0);
  const [gasFilterHeight, setGasFilterHeight] = useState<number>(0);

  const [width, height] = useWindowSize(); // on window resize listener

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
    setWaterFilterHeight(waterFilterRef.current?.offsetHeight || 0);
    setGasFilterHeight(gasFilterRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight || 0);
    setWaterFilterHeight(waterFilterRef.current?.offsetHeight || 0);
    setGasFilterHeight(gasFilterRef.current?.offsetHeight || 0);
  }, [width, height]);

  return (
    <div className="meter-indication-reading-page d-flex">
      <IndicationLocationList setMeterDataFetching={setMeterDataFetching} />

      <div className="meter-indication-reading-page__wrap d-flex flex-column">
        <CTabs activeTab={tabValue as string}>
          <div ref={topMenuRef}>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink
                  data-tab="power"
                  onClick={() =>
                    history.push({ search: `?powerMetersPage=1&tabValue=power${groupId ? `&groupId=${groupId}` : ""}` })
                  }
                >
                  Приборы учета электроэнергии
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  data-tab="water"
                  onClick={() =>
                    history.push({ search: `?waterMetersPage=1&tabValue=water${groupId ? `&groupId=${groupId}` : ""}` })
                  }
                >
                  Приборы учета воды
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  data-tab="gas"
                  onClick={() =>
                    history.push({ search: `?gasMetersPage=1&tabValue=gas${groupId ? `&groupId=${groupId}` : ""}` })
                  }
                >
                  Приборы учета газа
                </CNavLink>
              </CNavItem>
            </CNav>
          </div>

          <div
            style={{
              height: `calc(100% - ${topMenuRef.current?.offsetHeight || 0}px)`,
              position: "relative",
            }}
          >
            {/* Power */}
            <CTabContent style={{ height: tabValue === "power" ? "100%" : "0px" }}>
              <CTabPane data-tab="power" style={{ height: "100%" }}>
                <div className="meter-indication-reading-page__wrap d-flex flex-column">
                  <MonitoringFilter filterRef={filterRef} />
                  <PowerIndicationMetersList
                    filterHeight={filterHeight}
                    meterDataFetching={meterDataFetching}
                    setMeterDataFetching={setMeterDataFetching}
                  />
                </div>
              </CTabPane>
            </CTabContent>

            {/* Water */}
            <CTabContent style={{ height: tabValue === "water" ? "100%" : "0px" }}>
              <CTabPane data-tab="water" style={{ height: "100%" }}>
                <div className="meter-indication-reading-page__wrap d-flex flex-column">
                  <MonitoringFilter filterRef={waterFilterRef} />
                  <WaterIndicationMetersList
                    filterHeight={waterFilterHeight}
                    meterDataFetching={meterDataFetching}
                    setMeterDataFetching={setMeterDataFetching}
                  />
                </div>
              </CTabPane>
            </CTabContent>

            {/* GAS */}
            <CTabContent style={{ height: tabValue === "gas" ? "100%" : "0px" }}>
              <CTabPane data-tab="gas" style={{ height: "100%" }}>
                <MonitoringFilter filterRef={gasFilterRef} />
                <GasIndicationMetersList
                  isMeterWithLink={false}
                  filterHeight={gasFilterHeight}
                  meterDataFetching={meterDataFetching}
                  setMeterDataFetching={setMeterDataFetching}
                />
              </CTabPane>
            </CTabContent>
          </div>
        </CTabs>
      </div>
    </div>
  );
};
