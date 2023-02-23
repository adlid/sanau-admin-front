import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { useHistory, useLocation } from "react-router";
import { getGroupTreeBySearchThunk } from "../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { ConcentratorWaterCounterListItem } from "../ConcentratorWaterCounterListItem";
import { addKeyToFolders, removeSelectAllConcentrators, resetReportsState } from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { ConcentratorPowerCounterListItem } from "../ConcentratorPowerCounterListItem/ConcentratorPowerCounterListItem";

interface IConcentratorWaterCountersProps {
  addKeyToArrCallBack: any;
  removeKeyFromArrCallBack: any;
  dontShowCheckbox?: boolean;
}

export const ConcentratorPowerCounters: FC<IConcentratorWaterCountersProps> = (props) => {
  const { addKeyToArrCallBack, removeKeyFromArrCallBack, dontShowCheckbox } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { } = useLocation()

  //   MAIN DATA
  const { tree } = useTypedSelector((state) => state.groupsControl);
  const { selectedFolders } = useTypedSelector((state) => state.reports)

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setDataLoading(true);
    await dispatch(getGroupTreeBySearchThunk({ query: '', type: 'electric', field: "title" }));
    setDataLoading(false);
  };

  const setSelectedGatewayFunc = (id: string, index: number) => history.push(`/admin/reports?&id=${id}&index=${index}`);

  useEffect(() => {
    fetchData()

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
        {/* {!dontShowCheckbox && (
          <input
            type="checkbox"
            className="checkbox-table"
            checked={tree.length === selectedFolders.length && tree.length !== 0}
            onChange={(e) => {
              if (e.target.checked) {
                tree.forEach((folder: any) => {
                  !selectedFolders.includes(folder.key as string) && dispatch(addKeyToArrCallBack(folder.key as string));
                });
              } else dispatch(removeSelectAllConcentrators());
            }}
          />
        )} */}
        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Наименование</span>
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Кол-во ПУ</span>
        </Col>
      </Row>
      <hr className="tableHeaderLine" />

      <div className="reports__wrap">
        {dataLoading ? (
          <div className="reports__preloader">
            <Spinner animation="border" size="sm" />
          </div>
        ) : !tree?.length ? (
          <div className="reports__preloader">
            <p>Список пуст</p>
          </div>
        ) : (

          tree.map((concentrator: any, index) => {
            return <ConcentratorPowerCounterListItem
              key={concentrator.key}
              concentratorData={concentrator}
              setSelectedGatewayFunc={setSelectedGatewayFunc}
              index={index}
            />
          })
        )}
      </div>
    </div>
  );
};
