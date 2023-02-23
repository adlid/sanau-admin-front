import React, { FC, useEffect, useRef, useState } from "react";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
//components
import { InfoByDinRail } from "./components/InfoByDinRail";
import { InfoByTCP } from "./components/InfoByTCP";
import { InfoByOtan } from "./components/InfoByOtan";
import { InfoByBluetooth } from "./components/InfoByBluetooth";
import { InfoByLorawanNUdp } from "./components/InfoByLorawanNUdp";
import { InfoByTransmissionDevice } from "./components/InfoByTransmissionDevice";
// hooks
import { useWindowSize } from "../../../utils/hooks/reduxHooks";
import { InfoByUSPDDynamic } from "./components/InfoByLorawanNUdp/InfoByUSPDDynamic";
import { InfoByGPRSDynamic } from "./components/InfoByTCP/InfoByGPRSDynamic";

export const InfoPowerMeterConcentratorPages: FC = () => {
  // hooks
  const history = useHistory();

  // data from redux
  const { tabValue } = queryString.parse(history.location.search.substring(1));

  // menu height
  const topMenuRef: any = useRef();
  const [topMenuHeight, setTopMenuHeight] = useState<number>(0);
  const [width, height] = useWindowSize(); // on window resize listener

  useEffect(() => {
    setTopMenuHeight(topMenuRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setTopMenuHeight(topMenuRef.current?.offsetHeight || 0);
  }, [width, height]);

  return (
    <div className="power-meter-concentrator-page tabs-type2">
      <CTabs activeTab={tabValue as string}>
        <div ref={topMenuRef}>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-transmision-device&page=1` })}
                data-tab="info-by-transmision-device"
              >
                Подключение через УСПД
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={() => history.push({ search: `?tabValue=info-by-tcp&page=1` })} data-tab="info-by-tcp">
                Прямое подключение TCP/IP (GPRS)
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-otan&page=1` })}
                data-tab="info-by-otan"
              >
                Прямое подключение TCP/IP (Отан)
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={() => history.push({ search: `?tabValue=info-by-rs&page=1` })} data-tab="info-by-rs">
                Подключение через TCP/IP (Din-rail)
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-lorawan-udp&page=1` })}
                data-tab="info-by-lorawan-udp"
              >
                Подключение через LoRaWAN и UDP
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-bluetooth&bluetoothPage=1` })}
                data-tab="info-by-bluetooth"
              >
                Подключение через Bluetooth
              </CNavLink>
            </CNavItem>

            {/* Динамическое подключение */}
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-uspd-dynamic&page=1` })}
                data-tab="info-by-uspd-dynamic">
                Динамическое подключение УСПД
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => history.push({ search: `?tabValue=info-by-gprs-dynamic&page=1` })}
                data-tab="info-by-gprs-dynamic"
              >
                Динамическое подключение TCP/IP (GPRS)
              </CNavLink>
            </CNavItem>
          </CNav>

        </div>

        <div style={{ height: `calc(100% - ${topMenuHeight || 0}px - 20px)`, position: "relative" }}>
          {/* Подключение через УСПД */}
          {tabValue === "info-by-transmision-device" &&
            <CTabContent style={{ height: tabValue === "info-by-transmision-device" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-transmision-device" style={{ height: "100%" }}>
                <InfoByTransmissionDevice />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через TCP/IP (GPRS) */}
          {tabValue === "info-by-tcp" &&
            <CTabContent style={{ height: tabValue === "info-by-tcp" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-tcp" style={{ height: "100%" }}>
                <InfoByTCP />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через TCP/IP (ОТАН) */}
          {tabValue === "info-by-otan" &&
            <CTabContent style={{ height: tabValue === "info-by-otan" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-otan" style={{ height: "100%" }}>
                <InfoByOtan />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через TCP/IP (Din-rail) */}
          {tabValue === "info-by-rs" &&
            <CTabContent style={{ height: tabValue === "info-by-rs" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-rs" style={{ height: "100%" }}>
                <InfoByDinRail />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через Lorawan и UDP */}
          {tabValue === "info-by-lorawan-udp" &&
            <CTabContent style={{ height: tabValue === "info-by-lorawan-udp" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-lorawan-udp" style={{ height: "100%" }}>
                <InfoByLorawanNUdp />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через Bluetooth */}
          {tabValue === "info-by-bluetooth" &&
            <CTabContent style={{ height: tabValue === "info-by-bluetooth" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-bluetooth" style={{ height: "100%" }}>
                <InfoByBluetooth />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через GPRS Dynamic и UDP */}
          {tabValue === "info-by-gprs-dynamic" &&
            <CTabContent style={{ height: tabValue === "info-by-gprs-dynamic" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-gprs-dynamic" style={{ height: "100%" }}>
                <InfoByGPRSDynamic />
              </CTabPane>
            </CTabContent>
          }

          {/* Подключение через USPD Dynamic */}
          {tabValue === "info-by-uspd-dynamic" &&
            <CTabContent style={{ height: tabValue === "info-by-uspd-dynamic" ? "100%" : "0px" }}>
              <CTabPane data-tab="info-by-uspd-dynamic" style={{ height: "100%" }}>
                <InfoByUSPDDynamic />
              </CTabPane>
            </CTabContent>
          }
        </div>
      </CTabs>
    </div>
  );
};
