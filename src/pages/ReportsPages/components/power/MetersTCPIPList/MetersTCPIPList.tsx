import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// redux
import {
  removeSelectAllConcentrators,
  resetReportsState,
} from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
// components
import { MetersTCPIPListItem } from "../MetersTCPIPListItem";
// redux
import { getGPRSMetersList } from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import {
  removeSelectAllMeters,
  selectAllMeters,
} from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.slice";

interface IMetersTCPIPListProps {}

export const MetersTCPIPList: FC<IMetersTCPIPListProps> = (props: any) => {
  const {} = props;
  const dispatch = useAppDispatch();

  //   MAIN DATA
  const { GPRSMetersList, selectedMeters, isFetchingModal, selectedAllMeters } = useTypedSelector(
    (state) => state.powerMeterGPRSMeter
  );

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const getAllTCPIPMeters = async () => {
    setDataLoading(true);
    await dispatch(getGPRSMetersList({text: "", queryType: "", folderId: "", type: "DIRECT"}));
    setDataLoading(false);
  };

  useEffect(() => { 
    getAllTCPIPMeters();

    return () => {
      // dispatch(removeSelectAllMeters());
    };
  }, []);

  return (
    <div className="reports__table-block">
      <div className="info-by-bluetooth__header" style={{ paddingBottom: "0px", paddingTop: "0px" }}>
        <Row style={{ padding: "16px" }}>
          <Col xl={6}>
            <Row>
              <Col xl={1} lg={1}>
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedAllMeters}
                  onChange={(e) => {
                    if (e.target.checked) dispatch(selectAllMeters());
                    else dispatch(removeSelectAllMeters());
                  }}
                />
              </Col>
              <Col xl={3} lg={3}>
                IP адрес
              </Col>
              <Col xl={2} lg={2}>
                Порт
              </Col>
              <Col xl={3} lg={3}>
                Сетевой адрес
              </Col>
              <Col xl={3} lg={3}>
                Серийный №
              </Col>
            </Row>
          </Col>

          <Col xl={6}>
            <Row>
              <Col xl={3} lg={2}>
                Лицевой счет
              </Col>
              <Col xl={3} lg={2}>
                Посл. активность
              </Col>
              <Col xl={2} lg={2}>
                Активен
              </Col>
              <Col xl={2} lg={2}>
                Привязан
              </Col>
              <Col xl={2} lg={2}>
                <div style={{ textAlign: "center" }}>Действия</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <hr className="tableHeaderLine" />

      <div className="reports__wrap">
        {dataLoading ? (
          <div className="reports__preloader">
            <Spinner animation="border" size="sm" />
          </div>
        ) : !GPRSMetersList?.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (
          GPRSMetersList.map((meter: any, index: any) => {
            return <MetersTCPIPListItem key={meter.id} meterData={meter} />;
          })
        )}
      </div>
    </div>
  );
};
