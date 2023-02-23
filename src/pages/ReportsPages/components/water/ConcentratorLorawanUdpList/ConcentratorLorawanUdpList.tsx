import { useHistory } from "react-router";
import { Drawer } from "@material-ui/core";
import { Col, Row, Spinner } from "react-bootstrap";
import React, { FC, useEffect, useState } from "react";
// components
import { ConcentratorItemSideBar } from "../../../../WaterMeterConcentrator/InfoWaterMeterConcentratorPages/components/InfoByLorawanNUdp/components/Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
// redux
import {
  removeSelectAllConcentrators,
  resetReportsState,
} from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { getAllConcentrators } from "../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
// components
import { ConcentratorLorawanUdpListItem } from "../ConcentratorLorawanUdpListItem";

interface IConcentratorLorawanUdpListProps {
  addIdToArrCallBack: any;
  removeIdFromArrCallBack: any;
  dontShowCheckbox?: boolean;
}

export const ConcentratorLorawanUdpList: FC<IConcentratorLorawanUdpListProps> = (props: any) => {
  const { addIdToArrCallBack, removeIdFromArrCallBack, dontShowCheckbox } = props;
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  //   MAIN DATA
  const { concentratorsListArr, selectedId } = useTypedSelector((state) => state.reports);
  const { allConcentrators } = useTypedSelector((state) => state.waterMeterLorawanUdpDeviceConcentrator);

  //   LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // SIDEBAR
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSidebar = (bool: boolean) => setSideBarOpen(bool);

  const getAllLorawanUdpConcentrators = async () => {
    setDataLoading(true);
    await dispatch(getAllConcentrators());
    setDataLoading(false);
  };

  useEffect(() => {
    getAllLorawanUdpConcentrators();

    return () => {
      if (!dontShowCheckbox) {
        dispatch(resetReportsState());
        dispatch(removeSelectAllConcentrators());
      }
    };
  }, []);

  return (
    <div className="reports__table-block">
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px" }}>
          <ConcentratorItemSideBar close={() => setSideBarOpen(false)} />
        </div>
      </Drawer>
      <Row className="reports__table-group">
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
          {!dontShowCheckbox && (
            <input
              type="checkbox"
              className="checkbox-table"
              checked={allConcentrators.length === selectedId.length && allConcentrators.length !== 0}
              onChange={(e) => {
                if (e.target.checked) {
                  allConcentrators.forEach((concentrator) => {
                    !selectedId.includes(concentrator.id) && addIdToArrCallBack(concentrator.id);
                  });
                } else dispatch(removeSelectAllConcentrators());
              }}
            />
          )}
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">GatewayID</span>
        </Col>
        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Наименование</span>
        </Col>
        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="reports__card-title">Адрес</span>
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
          allConcentrators.map((concentrator, index) => {
            return (
              <ConcentratorLorawanUdpListItem
                key={concentrator.id}
                toggleSidebar={toggleSidebar}
                concentratorData={concentrator}
                selectedId={selectedId}
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
                dontShowCheckbox={dontShowCheckbox}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
