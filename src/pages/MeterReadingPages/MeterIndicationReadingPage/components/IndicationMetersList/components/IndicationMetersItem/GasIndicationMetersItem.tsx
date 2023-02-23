import moment from "moment";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, useEffect, memo } from "react";
import { icons } from "../../../../../../../utils/icons/icons";
import { statusIcons } from "../../../../../../../utils/icons/statusIcons";
import { WarningIcon } from "../../../../../../../assets/imgs/WarningIcon";
import { useAppDispatch } from "../../../../../../../utils/hooks/reduxHooks";
import { GetGasTableDataType } from "../../../../../../../ts/types/indication.types";
import { IGasIndicationMeterListItemWithSelect } from "../../../../../../../ts/interfaces/indication.interface";
import {
  getGasMeterInfoTable,
  getGasMeterInfoGraph,
} from "../../../../../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";

type PropsType = {
  number?: number;
  isScroll: boolean;
  sideBarToggle: any;
  handleIsScroll: (scroll: boolean) => void;
  addMetersIdToArrCallBack: (id: string) => void;
  meterData: IGasIndicationMeterListItemWithSelect;
  removeMetersIdFromArrCallBack: (id: string) => void;
  isMeterWithLink: boolean;
};

export const GasIndicationMetersItem: FC<PropsType> = memo((props) => {
  const {
    number,
    isScroll,
    meterData,
    handleIsScroll,
    sideBarToggle,
    addMetersIdToArrCallBack,
    removeMetersIdFromArrCallBack,
    isMeterWithLink,
  } = props;
  const dispatch = useAppDispatch();

  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);

  useEffect(() => {
    isScroll && handleIsScroll(false);
  }, [isScroll]);

  const currentDate = new Date();
  const dateMinusMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

  const gotoReadData = async () => {
    const body: GetGasTableDataType = {
      dateFrom: dateMinusMonth,
      dateTo: currentDate,
      meterId: [meterData.id],
      type: "DAILY",
    };

    dispatch(getGasMeterInfoTable(body));
    dispatch(getGasMeterInfoGraph(body));
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
              if (e.target.checked) addMetersIdToArrCallBack(meterData.id);
              else removeMetersIdFromArrCallBack(meterData.id);
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

        {!isMeterWithLink && (
          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
            <span className="indication-meters-item__id">{meterData.barcode || "-"}</span>
          </Col>
        )}

        {isMeterWithLink && (
          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column" onClick={gotoReadData}>
            <span
              className="indication-meters-item__id"
              style={{ textDecoration: "underline", color: "#18A0FB", wordWrap: "break-word" }}
            >
              {meterData.barcode || "-"}
            </span>
          </Col>
        )}

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <img alt="alt" src={meterData.isActive ? statusIcons.checkedIcon : statusIcons.notCheckedIcon} />
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="indication-meters-item__id">{meterData.status || "-"}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <img
            alt="alt"
            src={!meterData.personalAccountNumber ? statusIcons.notCheckedIcon : statusIcons.checkedIcon}
          />
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="indication-meters-item__date">{meterData.lastFixDate || "-"}</span>
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

      <hr style={{ height: 1, margin: 0, backgroundColor: "#D7E2F2", border: "none" }} />
    </>
  );
});
