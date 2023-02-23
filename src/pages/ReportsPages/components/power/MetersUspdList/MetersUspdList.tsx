import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// redux
import {
  removeSelectAllConcentrators,
  resetReportsState,
  selectAllConcentrators,
  setSelectedGateway,
} from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
// components
import { MetersUspdListItem } from "../MetersUspdListItem";
// ts
import { ConcentratorItemType } from "../../../../../ts/types/dataTransmissionsDevice.types";
import { getСoncentratorMetersPower } from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import {
  removeSelectAllMeters,
  selectAllMeters,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";

interface IMetersUspdListProps {
  id: string;
}

export const MetersUspdList: FC<IMetersUspdListProps> = (props: any) => {
  const { id } = props;

  // hooks
  const dispatch = useAppDispatch();

  //   MAIN DATA
  const { selectedConcentratorMeters, selectedAllMeters } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const getAllUspd = async () => {
    setDataLoading(true);
    await dispatch(getСoncentratorMetersPower({ id: id, search: "", queryType: "" }));
    setDataLoading(false);
  };

  useEffect(() => {
    getAllUspd();

    return () => {
      // dispatch(removeSelectAllMeters());
    };
  }, []);

  return (
    <div className="reports__table-block">
      <div className="concentrator-detail-list-accordion__header ">
        <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
          <Col xl={2} lg={2} md={4} sm={4}>
            <input
              type="checkbox"
              className="checkbox-table"
              checked={selectedAllMeters}
              onChange={(e) => {
                if (e.target.checked) dispatch(selectAllMeters());
                else dispatch(removeSelectAllMeters());
              }}
            />
            <span style={{ marginLeft: "20px" }}>№</span>
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}>
            Сер.№
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            Контрагент
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            Лицевой счет
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            ФИО
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}>
            Активен
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}>
            Привязан
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}></Col>
        </Row>
      </div>

      <hr className="tableHeaderLine" />

      <div className="reports__wrap">
        {dataLoading ? (
          <div className="reports__preloader">
            <Spinner animation="border" size="sm" />
          </div>
        ) : !selectedConcentratorMeters?.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (
          selectedConcentratorMeters.map((meter: any, index: any) => {
            return <MetersUspdListItem key={meter.id} meterData={meter} />;
          })
        )}
      </div>
    </div>
  );
};
