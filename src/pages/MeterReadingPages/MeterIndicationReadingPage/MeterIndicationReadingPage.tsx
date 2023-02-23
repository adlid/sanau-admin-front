import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useState, useEffect, useRef } from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
// components
import { IndicationLocationList } from "./components/IndicationLocationList";
import { GasIndicationFilter } from "./components/IndicationFilter/GasIndicationFilter";
import { GasIndicationMetersList } from "./components/IndicationMetersList/GasIndicationMetersList";
import { PowerIndicationMetersList, WaterIndicationMetersList } from "./components/IndicationMetersList";
import {
  PowerIndicationFilter,
  WaterIndicationFilter,
  PowerIndicationFilterBluetooth,
  PowerIndicationFilterLora,
} from "./components/IndicationFilter";
//ts redux
import { resetDetailTreeItem } from "../../../store/slicesAndThunks/groupControl/groupControl.slices";
import { resetGasIndicationState } from "../../../store/slicesAndThunks/gasIndication/gasIndication.slices";
import { resetWaterIndicationState } from "../../../store/slicesAndThunks/waterIndication/waterIndication.slices";
import { resetIndicationStatePower } from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { useAppDispatch, useDidUpdateEffect, useTypedSelector, useWindowSize } from "../../../utils/hooks/reduxHooks";
import { PowerIndicationFilterOtan } from "./components/IndicationFilter/PowerIndicationFilterOtan";

export const MeterIndicationReadingPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // LOADERS
  const [meterDataFetching, setMeterDataFetching] = useState<boolean>(false);

  //  MAIN DATA
  const { selectedMeterType, indicationMetersListArr, metersId } = useTypedSelector((state) => state.powerIndication);
  const { tabValue, groupId } = queryString.parse(history.location.search.substring(1));

  const resetState = () => {
    if (tabValue) {
      dispatch(resetIndicationStatePower());
      dispatch(resetWaterIndicationState());
      dispatch(resetGasIndicationState());
      dispatch(resetDetailTreeItem());
    }
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

  const firstMeterType: any =
    metersId.length !== 0 ? indicationMetersListArr?.data.find((meter) => meter.id === metersId[0]) : {};

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
            <CTabContent style={{ height: tabValue === "power" ? "100%" : "0px" }}>
              <CTabPane data-tab="power" style={{ height: "100%" }}>
                <div className="meter-indication-reading-page__wrap d-flex flex-column">
                  {(selectedMeterType === "uspdMeter" ||
                    selectedMeterType === "gprsMeter" ||
                    selectedMeterType === "dinRail" ||
                    firstMeterType?.type === "uspdMeter" ||
                    firstMeterType?.type === "gprsMeter" ||
                    firstMeterType?.type === "dinRail") && <PowerIndicationFilter filterRef={filterRef} />}

                  {(firstMeterType?.type === "otan" || firstMeterType?.type === "otan") && (
                    <PowerIndicationFilterOtan filterRef={filterRef} />
                  )}

                  {(selectedMeterType === "bluetoothMeter" || firstMeterType?.type === "bluetoothMeter") && (
                    <PowerIndicationFilterBluetooth filterRef={filterRef} />
                  )}

                  {(selectedMeterType === "networkServerMeter" || firstMeterType?.type === "networkServerMeter") && (
                    <PowerIndicationFilterLora filterRef={filterRef} />
                  )}

                  <PowerIndicationMetersList
                    filterHeight={filterHeight}
                    meterDataFetching={meterDataFetching}
                    setMeterDataFetching={setMeterDataFetching}
                  />
                </div>
              </CTabPane>
            </CTabContent>

            <CTabContent style={{ height: tabValue === "water" ? "100%" : "0px" }}>
              <CTabPane data-tab="water" style={{ height: "100%" }}>
                <div className="meter-indication-reading-page__wrap d-flex flex-column">
                  <WaterIndicationFilter waterFilterRef={waterFilterRef} />
                  <WaterIndicationMetersList
                    filterHeight={waterFilterHeight}
                    meterDataFetching={meterDataFetching}
                    setMeterDataFetching={setMeterDataFetching}
                  />
                </div>
              </CTabPane>
            </CTabContent>

            <CTabContent style={{ height: tabValue === "gas" ? "100%" : "0px" }}>
              <CTabPane data-tab="gas" style={{ height: "100%" }}>
                <GasIndicationFilter gasFilterRef={gasFilterRef} />
                <GasIndicationMetersList
                  isMeterWithLink={true}
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
