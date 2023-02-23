import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// components
import { MetersLorawanListItem } from "../MetersLorawanListItem";
import { Pagination } from "../../../../../components/uiKit/Pagination";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { searchPowerLorawanСoncentratorMeters } from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import {
  selectAllMeters,
  removeSelectAllMeters,
} from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";

interface IMetersLorawanListProps {
  id: string;
}

export const MetersLorawanList: FC<IMetersLorawanListProps> = (props: any) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  // page handlers
  const [pageNum, setPageNum] = useState<number>(1);

  //   MAIN DATA
  const { selectedConcentratorMeters, selectedAllMeters } = useTypedSelector(
    (state) => state.powerMeterLorawanUdpConcentrator
  );

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const getLorawanMeters = async () => {
    setDataLoading(true);
    await dispatch(
      searchPowerLorawanСoncentratorMeters({
        id: id,
        page: pageNum || 1,
        query: "",
        type: "",
      })
    );
    setDataLoading(false);
  };

  useEffect(() => {
    getLorawanMeters();

    return () => {
      // dispatch(removeSelectAllMeters());
    };
  }, []);

  return (
    <div className="reports__table-block">
      <div className="power-lorawan-concentrator-meter-list__header">
        <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
          <Col xl={3} lg={3} md={4} sm={4}>
            <input
              type="checkbox"
              className="checkbox-table"
              checked={selectedAllMeters}
              onChange={(e) => {
                if (e.target.checked) dispatch(selectAllMeters());
                else dispatch(removeSelectAllMeters());
              }}
            />
            <span style={{ marginLeft: "20px" }}>Наименование</span>
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            Сер.№
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            Лицевой счет
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            Последняя активность
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
        ) : !selectedConcentratorMeters?.data.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (
          selectedConcentratorMeters?.data.map((meter: any, index: any) => {
            return <MetersLorawanListItem key={meter.id} meterData={meter} />;
          })
        )}
        <div className="mb20px"></div>
        <Pagination
          totalPage={selectedConcentratorMeters?.totalPage || 1}
          page={+pageNum}
          onPageChanged={(page) => setPageNum(page)}
        />
      </div>
    </div>
  );
};
