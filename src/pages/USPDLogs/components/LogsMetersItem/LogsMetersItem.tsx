import moment from "moment";
import { Col, Row } from "react-bootstrap";
import React, { FC, memo } from "react";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";

type PropsType = {
  logData: any;
};

export const LogsMetersItem: FC<PropsType> = memo((props) => {
  const { logData } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      <Row className="uspdLogs-item__row">
        <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="uspdTable-group__column">
          <span className="uspdLogs-item__id">{""}</span>
        </Col>
      </Row>

      <hr style={{ height: 1, margin: 0, backgroundColor: "#D7E2F2", border: "none" }} />
    </>
  );
});
