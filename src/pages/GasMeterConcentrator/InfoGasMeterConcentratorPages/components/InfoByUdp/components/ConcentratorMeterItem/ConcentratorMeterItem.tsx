import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import React, { FC, useState } from "react";
// icons
import { InfoIcon } from "../../../../../../../assets/imgs/InfoIcon";
import { Mounting } from "../../../../../../../assets/imgs/Mounting";
import { ReactComponent as Pencil } from "../../../../../../../assets/imgs/pencil.svg";
import { ReactComponent as Checked } from "../../../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../../../assets/imgs/notChecked.svg";
import { ReactComponent as CheckedGreen } from "../../../../../../../assets/imgs/checkedGreen.svg";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { GasConcentratorMeterType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import {
  addIdToSelectedList,
  removeIdFromSelectedList,
} from "../../../../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";

type PropsType = {
  setSelectedMeterObjCallback: (meter: GasConcentratorMeterType) => void;
  meterData: GasConcentratorMeterType;
  sideBarToggle: any;
  openMountingModal: any;
};

export const ConcentratorMeterItem: FC<PropsType> = (props) => {
  const { setSelectedMeterObjCallback, meterData, sideBarToggle, openMountingModal } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const addIdToSelected = (id: string) => dispatch(addIdToSelectedList(id));
  const removeIdFromSelected = (id: string) => dispatch(removeIdFromSelectedList(id));

  const { selectedMeters } = useTypedSelector((state) => state.gasMeterUdpDeviceConcentrator);

  return (
    <div className="gas-udp-concentrator-meter-item">
      <Row className="gas-udp-concentrator-meter-item__header " style={{ wordWrap: "break-word" }}>
        <Col xl={1} lg={1} md={4} sm={4}>
          <input
            onChange={(e) => {
              e.stopPropagation();
              if (selectedMeters.includes(meterData.id)) removeIdFromSelected(meterData.id);
              else addIdToSelected(meterData.id);
            }}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            className="checkbox-table"
            checked={Boolean(selectedMeters.includes(meterData.id))}
          />
        </Col>
        <Col xl={2} lg={2} md={4} sm={4}>
          {meterData.meterName || "-"}
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} style={{ wordWrap: "break-word" }}>
          {meterData.barcode || "-"}
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} style={{ wordWrap: "break-word" }}>
          {meterData.userInfo?.personalAccountNumber || "-"}
        </Col>
        <Col xl={2} lg={2} md={4} sm={4}>
          {"-"}
          {/* {meterData.updatedAt ? moment(meterData.updatedAt).format("DD.MM.YYYY HH:mm") : "-"} */}
        </Col>
        <Col xl={1} lg={1} md={4} sm={4}>
          {meterData.active ? <Checked /> : <NotChecked />}
        </Col>
        <Col xl={1} lg={1} md={4} sm={4}>
          {meterData.userInfo?.personalAccountNumber ? <Checked /> : <NotChecked />}
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "35px" }}>
          <Popover
            isOpen={isPopoverOpen}
            positions={["top", "right"]}
            padding={0}
            containerClassName="gas-udp-concentrator-popover__container "
            content={
              <div className="gas-udp-concentrator-popover">
                <div className="gas-udp-concentrator-popover__item" onClick={sideBarToggle(true)}>
                  <InfoIcon />
                  <span>Информация</span>
                </div>
                <div
                  className="gas-udp-concentrator-popover__item"
                  onClick={(e) => {
                    history.push(
                      `/admin/concentrators/gas-meter/concentrator-info/edit-udp?meterId=${meterData.id}${
                        meterData.meterName && `&meterName=${meterData.meterName}`
                      }${
                        meterData.userInfo?.personalAccountNumber &&
                        `&personalAccountNumber=${meterData.userInfo?.personalAccountNumber}`
                      }`
                    );
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <Pencil />
                  <span>Изменить</span>
                </div>
                <div
                  className="gas-udp-concentrator-popover__item"
                  onClick={(e) => {
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <CheckedGreen />
                  <span>Восстановить</span>
                </div>
                <div
                  className="gas-udp-concentrator-popover__item"
                  onClick={(e) => {
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <NotChecked />
                  <span>Заблокировать</span>
                </div>
                {/* TODO ГАЗ */}
                {/* <div
                  className="gas-udp-concentrator-popover__item"
                  onClick={(e) => {
                    openMountingModal(meterData);
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <Mounting />
                  <span>Монтаж</span>
                </div>
                <div
                  className="gas-udp-concentrator-popover__item"
                  onClick={(e) => {
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <Pencil />
                  <span>Удалить</span>
                </div> */}
              </div>
            }
            onClickOutside={() => {
              setIsPopoverOpen(false);
              toggleIsSvgHovered(false);
            }}
          >
            <div
              onClick={(e) => {
                setIsPopoverOpen(true);
                setSelectedMeterObjCallback(meterData);
              }}
              onMouseEnter={() => toggleIsSvgHovered(true)}
              onMouseLeave={() => !isPopoverOpen && toggleIsSvgHovered(false)}
              className={
                isSvgHovered
                  ? "gas-udp-concentrator-meter-item__icon gas-udp-concentrator-meter-item__icon--hovered d-flex justify-content-center align-items-center"
                  : "gas-udp-concentrator-meter-item__icon d-flex justify-content-center align-items-center"
              }
            >
              {meterData.userInfo?.id ? (
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.99926 0.375732C8.89632 0.375732 9.62352 1.10294 9.62352 1.99999C9.62352 2.89705 8.89632 3.62426 7.99926 3.62426C7.10221 3.62426 6.375 2.89705 6.375 1.99999C6.375 1.10294 7.10221 0.375732 7.99926 0.375732ZM13.9993 0.375732C14.8963 0.375732 15.6235 1.10294 15.6235 1.99999C15.6235 2.89705 14.8963 3.62426 13.9993 3.62426C13.1022 3.62426 12.375 2.89705 12.375 1.99999C12.375 1.10294 13.1022 0.375732 13.9993 0.375732ZM1.99926 0.375732C2.89632 0.375732 3.62352 1.10294 3.62352 1.99999C3.62352 2.89705 2.89632 3.62426 1.99926 3.62426C1.10221 3.62426 0.375 2.89705 0.375 1.99999C0.375 1.10294 1.10221 0.375732 1.99926 0.375732Z"
                    fill={!isSvgHovered ? "#355169" : "#fff"}
                  />
                </svg>
              ) : (
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00024 0.375C8.89729 0.375 9.6245 1.10221 9.6245 1.99926C9.6245 2.89632 8.89729 3.62352 8.00024 3.62352C7.10318 3.62352 6.37598 2.89632 6.37598 1.99926C6.37598 1.10221 7.10318 0.375 8.00024 0.375ZM14.0002 0.375C14.8973 0.375 15.6245 1.10221 15.6245 1.99926C15.6245 2.89632 14.8973 3.62352 14.0002 3.62352C13.1032 3.62352 12.376 2.89632 12.376 1.99926C12.376 1.10221 13.1032 0.375 14.0002 0.375ZM2.00024 0.375C2.89729 0.375 3.6245 1.10221 3.6245 1.99926C3.6245 2.89632 2.89729 3.62352 2.00024 3.62352C1.10318 3.62352 0.375977 2.89632 0.375977 1.99926C0.375977 1.10221 1.10318 0.375 2.00024 0.375Z"
                    fill={isSvgHovered ? "white" : "#355169"}
                  />
                </svg>
              )}
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};
