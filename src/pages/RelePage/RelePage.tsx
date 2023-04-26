import { FC, useEffect, useState } from "react";
import { releHistoryThunk } from "../../store/slicesAndThunks/releHistory/rele.thunk";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import moment from "moment";

export const RelePage: FC = () => {
  const dispatch = useAppDispatch();
  const { history } = useTypedSelector((state) => state.rele);
  const { privileges } = useTypedSelector((state) => state.auth);

  const getReleHistoryData = async () => {
    await dispatch(releHistoryThunk());
  };
  useEffect(() => {
    getReleHistoryData();
  }, []);
  console.log(history);
  return (
    <div className="dashboard_3_line">
      <p className="dashboard_3_line__header">Реле нагрузки</p>
      <hr />

      <div className="logs__wrap">
        <Row className="logs__rows">
          <Col xl={2} className="logs__col">
            Дата и время
          </Col>
          <Col className="logs__col">Пользователь</Col>

          <Col className="logs__col">Действие</Col>
          <Col className="logs__col">Устроиства</Col>
        </Row>
        {history !== null &&
          history.map((hist, index) => {
            return (
              <Row key={index + hist.fixedAt} className="logs__rows">
                <Col xl={2} className="logs__col logs__col--secondary">
                  {hist.fixedAt
                    ? moment(hist.fixedAt).format("DD.MM.YYYY HH:mm")
                    : "-"}
                </Col>
                <Col className="logs__col logs__col--secondary">
                  {hist.login || "-"}
                </Col>

                <Col className="logs__col logs__col--secondary">
                  {hist.action || "-"}
                </Col>
                <Col className="logs__col logs__col--secondary">
                  {hist.deviceName || "-"}
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
};
