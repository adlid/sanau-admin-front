import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useEffect, useRef, useState } from "react";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
//components
import { InfoByUdp } from "./components/InfoByUdp";
import { InfoByLorawanNUdp } from "./components/InfoByLorawanNUdp";
import { InfoByLorawanNWebSocket } from "./components/InfoByLorawanNWebSocket";
// redux
import { useAppDispatch, useWindowSize } from "../../../utils/hooks/reduxHooks";
import { resetEditConcentratorState } from "../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";

export const InfoGasMeterConcentratorPages: FC = () => {
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { tabValue } = queryString.parse(history.location.search.substring(1));

  const topMenuRef: any = useRef();
  const [topMenuHeight, setTopMenuHeight] = useState<number>(0);
  const [width, height] = useWindowSize(); // on window resize listener

  useEffect(() => {
    setTopMenuHeight(topMenuRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setTopMenuHeight(topMenuRef.current?.offsetHeight || 0);
  }, [width, height]);

  useEffect(() => {
    return () => {
      dispatch(resetEditConcentratorState());
    };
  }, []);

  return (
    <div className="gas-meter-concentrator-page tabs-type2">
      <CTabs activeTab={tabValue as string}>
        <div ref={topMenuRef}>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink onClick={() => history.push({ search: `?tabValue=by-udp` })} data-tab="by-udp">
                Подключение через UDP
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={() => history.push({ search: `?tabValue=by-lorawan-udp` })} data-tab="by-lorawan-udp">
                Подключение через LoRaWAN и UDP
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=by-lorawan-web-socket` })}
                data-tab="by-lorawan-web-socket"
              >
                Подключение через LoRaWAN и Web-Socket
              </CNavLink>
            </CNavItem>
          </CNav>
        </div>

        <div style={{ height: `calc(100% - ${topMenuHeight + 20}px)`, position: "relative" }}>
          <CTabContent style={{ height: !tabValue ? "100%" : tabValue === "by-udp" ? "100%" : "0px" }}>
            <CTabPane data-tab="by-udp" style={{ height: "100%" }}>
              <InfoByUdp /> 
            </CTabPane>
          </CTabContent>
          <CTabContent>
            <CTabPane data-tab="by-lorawan-udp">
              {/* <InfoByLorawanNUdp /> */}
              connection by lorawan and UDP
            </CTabPane>
          </CTabContent>

          <CTabContent style={{ height: !tabValue ? "100%" : tabValue === "by-lorawan-web-socket" ? "100%" : "0px" }}>
            <CTabPane data-tab="by-lorawan-web-socket" style={{ height: "100%" }}>
              <InfoByLorawanNWebSocket />
            </CTabPane>
          </CTabContent>
        </div>
      </CTabs>
    </div>
  );
};
