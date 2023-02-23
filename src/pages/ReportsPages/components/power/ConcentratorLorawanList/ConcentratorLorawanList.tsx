import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// redux
import { setSelectedGateway } from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
// components
import { ConcentratorLorawanListItem } from "../ConcentratorLorawanListItem";
// ts
import { ConcentratorItemType } from "../../../../../ts/types/dataTransmissionsDevice.types";
import { searchPowerLorawanAllConcentrators } from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { useHistory } from "react-router";

interface IConcentratorLorawanListProps {}

export const ConcentratorLorawanList: FC<IConcentratorLorawanListProps> = (props: any) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  //   MAIN DATA
  const { allConcentrators } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator);

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const getAllLorawanConcentrators = async () => {
    setDataLoading(true);
    await dispatch(searchPowerLorawanAllConcentrators(""));
    setDataLoading(false); 
  };

  const setSelectedGatewayFunc = (id: string) => history.push(`/admin/reports?type=Lorawan&id=${id}`);

  useEffect(() => {
    getAllLorawanConcentrators();
  }, []);

  return (
    <div className="reports__table-block">
      <Row className="reports__table-group">
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox"></Col>

        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Gateway id</span>
        </Col>
        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Наименование</span>
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Описание</span>
        </Col>
        <Col xl={2} lg={2} md={4} sm={4}>
          <span className="reports__card-title">Дата добавления</span>
        </Col>
        <Col xl={1} lg={1} md={4} sm={4}>
          <span className="reports__card-title"></span>
        </Col>
      </Row>
      <hr className="tableHeaderLine" />

      <div className="reports__wrap">
        {dataLoading ? (
          <div className="reports__preloader">
            <Spinner animation="border" size="sm" />
          </div>
        ) : !allConcentrators?.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (
          allConcentrators.map((concentrator: any, index: any) => {
            return (
              <ConcentratorLorawanListItem
                key={concentrator.id}
                concentratorData={concentrator}
                setSelectedGatewayFunc={setSelectedGatewayFunc}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
