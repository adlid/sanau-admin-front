import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, useEffect, memo } from "react";
// icons
import { icons } from "../../../../../../../utils/icons/icons";
import { statusIcons } from "../../../../../../../utils/icons/statusIcons";
import { WarningIcon } from "../../../../../../../assets/imgs/WarningIcon";
// redux
import { useAppDispatch } from "../../../../../../../utils/hooks/reduxHooks";
import {
  toggleGetTableDataFetching,
  toggleSetTableDataNotFetching,
} from "../../../../../../../store/slicesAndThunks/waterIndication/waterIndication.slices";
// ts
import { ReadWaterMeterInfoFilterType } from "../../../../../../../ts/types/indication.types";
import { IWaterIndicationMeterListItemWithSelect } from "../../../../../../../ts/interfaces/indication.interface";
import { getTokenForWaterMeter } from "../../../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";

type PropsType = {
  number?: number;
  isScroll: boolean;
  meterData: IWaterIndicationMeterListItemWithSelect;
  handleIsScroll: (scroll: boolean) => void;
  addMetersIdToArrCallBack: (id: string) => void;
  removeMetersIdFromArrCallBack: (id: string) => void;
  sideBarToggle: any;
};

export const WaterIndicationMetersItem: FC<PropsType> = memo(
  ({
    number,
    isScroll,
    meterData,
    handleIsScroll,
    sideBarToggle,
    addMetersIdToArrCallBack,
    removeMetersIdFromArrCallBack,
  }) => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [hovered, setHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(false);

    useEffect(() => {
      if (isScroll) {
        handleIsScroll(false);
      }
    }, [isScroll]);

    const currentDate = new Date();
    const dateMinusMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    const gotoReadData = async () => {
      const body: ReadWaterMeterInfoFilterType = {
        dateFrom: dateMinusMonth,
        dateTo: currentDate,
        meterId: [meterData.id],
      };

      try {
        dispatch(toggleGetTableDataFetching());
        await dispatch(getTokenForWaterMeter(body));
        dispatch(toggleSetTableDataNotFetching());
      } catch (error: any) {}
    };

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
                  addMetersIdToArrCallBack(meterData.id);
                } else {
                  removeMetersIdFromArrCallBack(meterData.id);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              type="checkbox"
              className="checkbox-table"
              checked={meterData.selected ? true : false}
            />
          </Col>

          <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
            <span className="indication-meters-item__id">{number}</span>
          </Col>

          <Col xl={3} lg={3} md={4} sm={4} className="table-group__column" onClick={gotoReadData}>
            <span
              className="indication-meters-item__id"
              style={{ textDecoration: "underline", color: "#18A0FB", wordWrap: "break-word" }}
            >
              {
                //@ts-ignore
                meterData.serialNumber || meterData.title || "-"
              }
            </span>
          </Col>

          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column" style={{ textAlign: "center" }}>
            <img alt="alt" src={meterData.isActive ? statusIcons.checkedIcon : statusIcons.notCheckedIcon} />
          </Col>

          <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "center" }}>
            <img
              alt="alt"
              src={meterData.personalAccountNumber === null ? statusIcons.notCheckedIcon : statusIcons.checkedIcon}
            />
          </Col>

          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
            <span className="indication-meters-item__date">{meterData.lastFixDate || "-"}</span>
          </Col>

          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            className="table-group__column"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color:
                meterData.electricityBattery <= 50
                  ? meterData.electricityBattery < 20
                    ? "#EB5757"
                    : "#FF8A00"
                  : "#31B77E",
            }}
          >
            {meterData.electricityBattery}%
            {meterData.electricityBattery < 50 && (
              <WarningIcon
                style={{ minWidth: "16px" }}
                color={meterData.electricityBattery < 20 ? "#EB5757" : "#FF8A00"}
              />
            )}
          </Col>

          <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "right" }}>
            <img
              src={hovered ? icons.moreActiveIcon : icons.moreIcon}
              alt="menu"
              className="indication-meters-item__more"
              onClick={sideBarToggle(true, meterData.id)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </Col>
        </Row>
        <hr
          style={{
            height: 1,
            margin: 0,
            backgroundColor: "#D7E2F2",
            border: "none",
          }}
        />
      </>
    );
  }
);
