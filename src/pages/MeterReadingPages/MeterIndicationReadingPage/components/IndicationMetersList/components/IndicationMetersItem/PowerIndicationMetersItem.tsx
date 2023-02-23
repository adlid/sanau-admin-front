import React, { FC, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import { icons } from "../../../../../../../utils/icons/icons";
import { statusIcons } from "../../../../../../../utils/icons/statusIcons";
import { BluetoothBodyType } from "../../../../../../../ts/types/indication.types";
import { IIndicationMeterListItemWithSelect } from "../../../../../../../ts/interfaces/indication.interface";
import moment from "moment";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import {
  getTokenForMeter,
  getBluetoothMetersToken,
  requestAnswerLorabanHourly,
  requestAnswerLorabanHourlyGraph,
  getGPRSTableValuesThunk,
  getGPRSGraphValuesThunk,
  getOtanDailyTableValuesThunk,
  getOtanGraphValuesThunk, getDinRailTableValuesThunk, getDinRailGraphValuesThunk, getGPRSTableDataNew, getGPRSGraphDataNew,
} from "../../../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import {
  setBluetoothFilter,
  setUspdFilter,
  setLorawanFilter,
} from "../../../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router";

type PropsType = {
  isScroll: boolean;
  meterData: IIndicationMeterListItemWithSelect;
  handleIsScroll: (scroll: boolean) => void;
  addMetersIdToArrCallBack: (id: string, type: string) => void;
  removeMetersIdFromArrCallBack: (id: string, type: string) => void;
  selectedMeterType: string;
  sideBarToggle: any;
};

export const PowerIndicationMetersItem: FC<PropsType> = memo(
  ({
    meterData,
    sideBarToggle,
    selectedMeterType,
    addMetersIdToArrCallBack,
    removeMetersIdFromArrCallBack,
  }) => {
    const dispatch = useAppDispatch();
    const [hovered, setHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const currentDate = new Date();
    const dateMinusMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    const location = useLocation();

    const getMeterData = async () => {
      if (meterData.type === "gprsMeter") {
        const body2 = {
          meterId: [meterData.id],
          from: dateMinusMonth,
          to: currentDate,
          type: "DAILY",
          parameterValue: "ALL"
        };

        dispatch(getGPRSTableDataNew(body2));
        dispatch(getGPRSGraphDataNew(body2));

        dispatch(
          setUspdFilter({
            dateFrom: dateMinusMonth,
            dateTo: currentDate,
            groupValue: "DAILY",
            parameterValue: "ALL",
            startHour: "",
            finishHour: "",
          })
        );
      } else if (meterData.type === "otan") {
        const body = {
          from: dateMinusMonth,
          to: currentDate,
          meterId: [meterData.id],
          type: "DAILY",
          parameterValue: "ALL",
          page: 1,
        };

        dispatch(getOtanDailyTableValuesThunk(body));
        dispatch(getOtanGraphValuesThunk(body));

        dispatch(
          setUspdFilter({
            dateFrom: dateMinusMonth,
            dateTo: currentDate,
            groupValue: "DAILY",
            parameterValue: "ALL",
            startHour: "",
            finishHour: "",
          })
        );
      } else if (meterData.type === "uspdMeter") {
        let body = {
          from: dateMinusMonth,
          to: currentDate,
          meterId: [meterData.id],
          type: "DAILY",
          parameterValue: "ALL",
          timeFrom: "",
          timeTo: "",
        };
        dispatch(getTokenForMeter(body));

        dispatch(
          setUspdFilter({
            dateFrom: dateMinusMonth,
            dateTo: currentDate,
            groupValue: "DAILY",
            parameterValue: "ALL",
            startHour: "",
            finishHour: "",
          })
        );
      } else if (meterData.type === "bluetoothMeter") {
        const body: BluetoothBodyType = {
          lastFixFrom: moment(dateMinusMonth).format().split("+")[0],
          lastFixTo: moment(currentDate).format().split("+")[0],
          id: [meterData.id],
          role: "ROLE_OPERATOR",
        };

        dispatch(
          setBluetoothFilter({
            dateFrom: dateMinusMonth,
            dateTo: currentDate,
          })
        );

        dispatch(getBluetoothMetersToken(body));
      } else if (meterData.type === "networkServerMeter") {
        const body = {
          id: [meterData.id],
          type: "ALL",
          groupValue: "DAILY",
          parameterValue: "ALL",
          startDate: dateMinusMonth,
          endDate: currentDate,
          startTime: "00:00",
          endTime: "23:59",
          format: "daily",
          page: 1,
        };
        dispatch(requestAnswerLorabanHourly(body));
        dispatch(requestAnswerLorabanHourlyGraph(body));

        dispatch(
          setLorawanFilter({
            dateFrom: dateMinusMonth,
            dateTo: currentDate,
            groupValue: "DAILY",
            parameterValue: "ALL",
            startHour: "",
            finishHour: "",
          })
        );
      } else if (meterData.type === 'dinRail') {
        const body = {
          from: dateMinusMonth,
          to: currentDate,
          meterId: [meterData.id],
          type: "DAILY",
          parameterValue: "ALL",
          page: 1,
        };

        dispatch(getDinRailTableValuesThunk(body))
        dispatch(getDinRailGraphValuesThunk(body))
      }
    };

    const { metersId, selectedAllIndicationMeters } = useTypedSelector(state => state.powerIndication)

    return (
      <>
        <Row
          className="indication-meters-item__row"
          onMouseEnter={() => setHoveredItem(true)}
          onMouseLeave={() => setHoveredItem(false)}
          style={{ background: hoveredItem ? "#EBEDEF" : "white" }}
        >
          <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
            <input
              onChange={(e) => {
                e.stopPropagation();
                if (e.target.checked) {
                  if (selectedMeterType.length === 0) addMetersIdToArrCallBack(meterData.id, meterData.type);
                  else if (selectedMeterType.length > 0 && selectedMeterType !== meterData.type) {
                    enqueueSnackbar("Можно выбрать несколько счетчиков только одного типа", { variant: "error" });
                  } else addMetersIdToArrCallBack(meterData.id, meterData.type);
                } else removeMetersIdFromArrCallBack(meterData.id, meterData.type);
              }}
              type="checkbox"
              className="checkbox-table"
              checked={(metersId.includes(meterData.id.toString()) || selectedAllIndicationMeters)}
            />
          </Col>

          <Col xl={4} lg={4} md={7} sm={7} className="table-group__column">
            <span onClick={() => {
              location.pathname.includes("admin/monitoring-main") ?
                console.log('monitoring')
                : getMeterData()
            }
            } className={`${location.pathname.includes("admin/monitoring-main") ? '' : ' link link--active'} indication-meters-item__id`}>
              {meterData.serialNumber || meterData.title}
            </span>
          </Col>

          <Col xl={3} lg={2} md={4} sm={4} className="table-group__column">
            <img alt="alt" src={meterData.isActive ? statusIcons.checkedIcon : statusIcons.notCheckedIcon} />
          </Col>

          <Col xl={3} lg={4} md={5} sm={5} className="table-group__column">
            <span className="indication-meters-item__date">{meterData.lastFixDate || "-"}</span>
          </Col>

          <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "right" }}>
            <img
              src={hovered ? icons.moreActiveIcon : isActive ? icons.moreActiveIcon : icons.moreIcon}
              alt="alt"
              className="indication-meters-item__more"
              onClick={(e) => {
                sideBarToggle(true, meterData.id);
                removeMetersIdFromArrCallBack(meterData.id, meterData.type);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </Col>
        </Row>
        <hr style={{ height: 1, margin: 0, backgroundColor: "#D7E2F2", border: "none" }} />
      </>
    );
  }
);
