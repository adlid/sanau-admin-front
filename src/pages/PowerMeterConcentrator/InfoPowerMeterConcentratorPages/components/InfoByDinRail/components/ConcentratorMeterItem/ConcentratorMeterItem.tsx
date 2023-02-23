import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import React, { FC, useEffect, useState } from "react";
import { InfoIcon } from "../../../../../../../assets/imgs/InfoIcon";
// icons
import { ReactComponent as Pencil } from "../../../../../../../assets/imgs/pencil.svg";
import { ReactComponent as Checked } from "../../../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../../../assets/imgs/notChecked.svg";
// ts
import { IDinRailMeterListItem } from "../../../../../../../ts/types/dinRailTypes";
import { useAppDispatch } from "../../../../../../../utils/hooks/reduxHooks";
import { setSelectedEditDinRailMeterId } from "../../../../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.slice";

type PropsType = {
  meterData: IDinRailMeterListItem;
  openSidebar: any;
  setSelecteditem: any;
  toggleActivateConcentratorMeter: any;
  toggleDeactivateConcentratorMeter: any;
  addOneMeterIdToArrCallback: any;
  addMetersIdToArrCallBack: any;
  removeMetersIdFromArrCallBack: any;
};

export const ConcentratorMeterItem: FC<PropsType> = (props) => {
  const {
    meterData,
    openSidebar,
    setSelecteditem,
    toggleActivateConcentratorMeter,
    toggleDeactivateConcentratorMeter,
    addOneMeterIdToArrCallback,
    addMetersIdToArrCallBack,
    removeMetersIdFromArrCallBack,
  } = props;

  const history = useHistory();

  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    return () => {
      addOneMeterIdToArrCallback("");
    };
  }, []);

  const dispatch = useAppDispatch();

  const handleEdit = async () => {
    await dispatch(setSelectedEditDinRailMeterId(meterData.id))
    history.push(
      `/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-rs485/edit/${meterData.id}`
    )
  }

  return (
    <div className="power-lorawan-concentrator-meter-item">
      <Row style={{ wordWrap: "break-word", padding: "16px" }}>
        <Col xl={12}>
          <Row>
            <Col xl={1} lg={1}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={meterData.selected}
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) addMetersIdToArrCallBack(meterData.id);
                  else removeMetersIdFromArrCallBack(meterData.id);
                }}
              />
            </Col>
            <Col xl={3} lg={3}>
              {meterData.ip || "---"}
              {/* IP */}
            </Col>
            <Col xl={1} lg={1}>
              {meterData.port || "---"}
              {/* Порт */}
            </Col>
            <Col xl={2} lg={2}>
              {meterData.type === "THREE_PHASE" ? "Трехфазный" : meterData.type === "ONE_PHASE" ? "Однофазный" : "---"}
              {/* Тип */}
            </Col>
            <Col xl={2} lg={2}>
              {meterData.userInfo?.personalAccountNumber}
              {/* Лицевой счет */}
            </Col>
            <Col xl={1} lg={1}>
              {meterData.active ? <Checked /> : <NotChecked />}
            </Col>
            <Col xl={2} lg={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ textAlign: "end" }}>
                <Popover
                  isOpen={isPopoverOpen}
                  positions={["top", "right"]}
                  padding={0}
                  containerClassName="power-lorawan-udp-concentrator-popover__container "
                  content={
                    <div className="power-lorawan-udp-concentrator-popover">
                      <div
                        className="power-lorawan-udp-concentrator-popover__item"
                        onClick={() => {
                          setSelecteditem(meterData);
                          openSidebar();
                        }}
                      >
                        <InfoIcon />
                        <span>Подробнее</span>
                      </div>

                      {meterData.active ? (
                        <div
                          className="power-lorawan-udp-concentrator-popover__item"
                          onClick={() => {
                            addOneMeterIdToArrCallback(meterData.id);
                            toggleDeactivateConcentratorMeter(true);
                            setIsPopoverOpen(false);
                            toggleIsSvgHovered(false);
                          }}
                        >
                          <NotChecked />
                          <span>Деактивировать</span>
                        </div>
                      ) : (
                        <div
                          className="power-lorawan-udp-concentrator-popover__item"
                          onClick={() => {
                            addOneMeterIdToArrCallback(meterData.id);
                            toggleActivateConcentratorMeter(true);
                            setIsPopoverOpen(false);
                            toggleIsSvgHovered(false);
                          }}
                        >
                          <Checked />
                          <span>Активировать</span>
                        </div>
                      )}

                      <div
                        className="power-lorawan-udp-concentrator-popover__item"
                        onClick={handleEdit}
                      >
                        <Pencil />
                        <span>Изменить</span>
                      </div>
                    </div>
                  }
                  onClickOutside={() => {
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setIsPopoverOpen(!isPopoverOpen)}
                    onMouseEnter={() => toggleIsSvgHovered(true)}
                    onMouseLeave={() => !isPopoverOpen && toggleIsSvgHovered(false)}
                    className={
                      isSvgHovered
                        ? "power-lorawan-concentrator-meter-item__icon power-lorawan-concentrator-meter-item__icon--hovered d-flex justify-content-center align-items-center"
                        : "power-lorawan-concentrator-meter-item__icon d-flex justify-content-center align-items-center"
                    }
                  >
                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.00024 0.375C8.89729 0.375 9.6245 1.10221 9.6245 1.99926C9.6245 2.89632 8.89729 3.62352 8.00024 3.62352C7.10318 3.62352 6.37598 2.89632 6.37598 1.99926C6.37598 1.10221 7.10318 0.375 8.00024 0.375ZM14.0002 0.375C14.8973 0.375 15.6245 1.10221 15.6245 1.99926C15.6245 2.89632 14.8973 3.62352 14.0002 3.62352C13.1032 3.62352 12.376 2.89632 12.376 1.99926C12.376 1.10221 13.1032 0.375 14.0002 0.375ZM2.00024 0.375C2.89729 0.375 3.6245 1.10221 3.6245 1.99926C3.6245 2.89632 2.89729 3.62352 2.00024 3.62352C1.10318 3.62352 0.375977 2.89632 0.375977 1.99926C0.375977 1.10221 1.10318 0.375 2.00024 0.375Z"
                        fill={isSvgHovered ? "white" : "#355169"}
                      />
                    </svg>
                  </div>
                </Popover>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
