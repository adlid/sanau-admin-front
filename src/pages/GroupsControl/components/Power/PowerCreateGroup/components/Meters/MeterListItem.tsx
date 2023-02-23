import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, useEffect, memo } from "react";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import {
  addIdToSelectedList,
  removeIdFromSelectedList,
} from "../../../../../../../store/slicesAndThunks/groupControl/groupControl.slices";

type PropsType = {
  meterData: any;
};

export const MeterListItem: FC<PropsType> = memo((props) => {
  const { meterData } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { selectedMeters } = useTypedSelector((state) => state.groupsControl);

  const addIdToSelected = (id: string) => dispatch(addIdToSelectedList(id));
  const removeIdFromSelected = (id: string) => dispatch(removeIdFromSelectedList(id));

  useEffect(() => {
    meterData.selected ? addIdToSelected(meterData.groupMeter.key ?? meterData.id) : removeIdFromSelected(meterData.groupMeter.key ?? meterData.id);
  }, [meterData]);

  return (
    <>
      <Row className="meters-list-item__row">
        <Col
          xl={1}
          lg={1}
          md={4}
          sm={4}
          className="power_create_group__table-group__column power_create_group__table-group__column-checkbox"
        >
          <input
            onChange={(e) => {
              e.stopPropagation();
              if (selectedMeters.includes(meterData.groupMeter.key)) removeIdFromSelected(meterData.groupMeter.key);
              else addIdToSelected(meterData.groupMeter.key);
            }}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            className="checkbox-table"
            checked={selectedMeters.includes(meterData.groupMeter.key ?? meterData.id) ? true : false}
          />
        </Col>

        <Col xl={2} lg={2} md={3} sm={3} className="power_create_group__table-group__column">
          <span className="meters-list-item__id">{meterData.serialNumber || "-"}</span>
        </Col>

        <Col xl={2} lg={2} md={3} sm={3} className="power_create_group__table-group__column">
          <span className="meters-list-item__id">{meterData.groupMeter.title || "-"}</span>
        </Col>

        <Col xl={3} lg={3} md={3} sm={3} className="power_create_group__table-group__column">
          <span className="meters-list-item__id">{meterData.userInfo?.personalAccountNumber || "-"}</span>
        </Col>

        <Col xl={4} lg={4} md={4} sm={4} className="power_create_group__table-group__column">
          <p
            className="meters-list-item__id"
            style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {`${meterData.userInfo?.lastname || "-"} ${meterData.userInfo?.firstname || "-"} ${meterData.userInfo?.fathersname || "-"
              }`}
          </p>
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
});
