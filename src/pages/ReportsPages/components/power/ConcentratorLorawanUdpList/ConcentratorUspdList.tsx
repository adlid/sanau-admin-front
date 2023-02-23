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
import { getAllUspdConcentrators } from "../../../../../store/slicesAndThunks/reports/reports.thunks";
// components
import { ConcentratorUspdListItem } from "../ConcentratorUspdListItem";
// ts
import { ConcentratorItemType } from "../../../../../ts/types/dataTransmissionsDevice.types";
import { useHistory } from "react-router";

interface IConcentratorUspdListProps {
  addIdToArrCallBack: any;
  removeIdFromArrCallBack: any;
  dontShowCheckbox?: boolean;
}

export const ConcentratorUspdList: FC<IConcentratorUspdListProps> = (props: any) => {
  const { addIdToArrCallBack, removeIdFromArrCallBack, dontShowCheckbox } = props;
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  //   MAIN DATA
  const { concentratorsListArr, selectedId } = useTypedSelector((state) => state.reports);

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const getAllUspd = async () => {
    setDataLoading(true);
    await dispatch(getAllUspdConcentrators());
    setDataLoading(false);
  };

  const setSelectedGatewayFunc = (id: string) => dontShowCheckbox && history.push(`/admin/reports?type=УСПД&id=${id}`);

  useEffect(() => {
    getAllUspd();

    return () => {
      if (!dontShowCheckbox) {
        dispatch(resetReportsState());
        dispatch(removeSelectAllConcentrators());
      }
    };
  }, []);

  return (
    <div className="reports__table-block">
      <Row className="reports__table-group">
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
          {!dontShowCheckbox && (
            <input
              type="checkbox"
              className="checkbox-table"
              checked={concentratorsListArr.length === selectedId.length && concentratorsListArr.length !== 0}
              onChange={(e) => {
                if (e.target.checked) dispatch(selectAllConcentrators());
                else dispatch(removeSelectAllConcentrators());
              }}
            />
          )}
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">IP/Port</span>
        </Col>
        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Наименование</span>
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Кол-во ПУ</span>
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
        ) : !concentratorsListArr?.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (
          concentratorsListArr.map((concentrator: ConcentratorItemType, index: any) => {
            return (
              <ConcentratorUspdListItem
                key={concentrator.id}
                concentratorData={concentrator}
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
                dontShowCheckbox={dontShowCheckbox}
                setSelectedGatewayFunc={setSelectedGatewayFunc}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
