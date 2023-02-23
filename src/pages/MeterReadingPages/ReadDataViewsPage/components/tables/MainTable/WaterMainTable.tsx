import moment from "moment";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Drawer } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";

import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
import { WaterIndicationsSideBar } from "../../../../../../components/table/WaterIndicationsSideBar/WaterIndicationsSideBar";

import { FlowSensorErr } from "../../../../../../components/table/statuses/errors/FlowSensorErr";
import { LowBatteryErr } from "../../../../../../components/table/statuses/errors/LowBatteryErr";
import { ReverseFlowErr } from "../../../../../../components/table/statuses/errors/ReverseFlowErr";
import { WaterPipeLeakErr } from "../../../../../../components/table/statuses/errors/WaterPipeLeakErr";
import { SuccessfulWaterReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { ValveMalfunctionErr } from "../../../../../../components/table/statuses/errors/ValveMalfunctionErr";
import { TemperatureSensorErr } from "../../../../../../components/table/statuses/errors/TemperatureSensorErr";
import { ReverseInstallationErr } from "../../../../../../components/table/statuses/errors/ReverseInstallationErr";
import {
  getWaterMeterInfoTable,
  saveWaterMainTableExcel,
} from "../../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import { Spinner } from "react-bootstrap";

type PropsType = {
  setLoading: any;
  loading: boolean;
};

export const WaterMainTable: FC<PropsType> = (props) => {
  const { loading, setLoading } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [pageNum, setPageNum] = useState<number>(1);

  // TABLE HANDLERS
  const { token } = queryString.parse(history.location.search.substring(1));
  const tableData = useTypedSelector((state) => state.waterIndication.mainTableData?.data);
  const totalPages = useTypedSelector((state) => state.waterIndication.mainTableData?.totalPage);

  // DOWNLOAD TABLE EXCELL
  const saveExcelCallBack = () => dispatch(saveWaterMainTableExcel(token as string));

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<number>();
  const sideBarToggle = (state: boolean, id?: number) => (event: any) => {
    setSideBarOpen(state);
    id && setCurrentItemId(id);
  };

  const getTableInfoCallback = async (page: number) => {
    setLoading(true);
    await dispatch(getWaterMeterInfoTable({ page, token: token as string }));
    setLoading(false);
  };

  useEffect(() => {
    setPageNum(1);
  }, [token]);

  return (
    <>
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          {tableData
            ?.filter((meter) => meter.id === currentItemId)
            .map((meter) => {
              return <WaterIndicationsSideBar key={meter.id} meter={meter} close={sideBarToggle(false)} />;
            })}
        </div>
      </Drawer>
      <div className="main-table">
        <div className="read-data-view-table">
          <div className="overflow-block">
            <table className="table table-sm table-bordered">
              <thead>
                <tr className="read-data-view-table__bgc">
                  <th scope="col">№</th>
                  <th scope="col">Сер. №</th>
                  <th scope="col">Дата и время фиксации</th>
                  <th scope="col" className="col-100">
                    Расход за период (м3)
                  </th>
                  <th scope="col" className="col-100">
                    Показания (м3)
                  </th>
                  <th scope="col">Батарея (%)</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Мощность сигнала</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                    <td colSpan={12}>
                      <Spinner animation="border" size="sm" />
                    </td>
                  </tr>
                ) : tableData?.length ? (
                  tableData?.map((meter, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          index % 2 !== 0
                            ? "read-data-view-table__bgc"
                            : "read-data-view-table__bgc read-data-view-table__bgc--white"
                        }
                      >
                        <th scope="row">{pageNum === 1 ? index + 1 : pageNum! * 10 + (index + 1)}</th>
                        <td
                          onClick={sideBarToggle(true, meter.id)}
                          style={{ textDecoration: "underline", color: "#18A0FB", cursor: "pointer" }}
                        >
                          {meter.devEUI || "-"}
                        </td>
                        <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                        <td>{meter.consumption || "0"}</td>
                        <td>{meter.waterIndication || "-"}</td>
                        <td> {meter.electricityBattery || "-"}</td>
                        <td>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            {!meter.alertStatus && <SuccessfulWaterReadStatus />}
                            {meter.waterPipeInstallationPositionReverseAlarm && <ReverseInstallationErr />}
                            {meter.flowSensorFailureOrAtcAlarm && <FlowSensorErr />}
                            {meter.temperatureSensorFaultAlarm && <TemperatureSensorErr />}
                            {meter.waterPipeLeakageFaultAlarm && <WaterPipeLeakErr />}
                            {meter.valveFailureAlarm && <ValveMalfunctionErr />}
                            {meter.reverseFlowAlarm && <ReverseFlowErr />}
                            {meter.batteryPowerAlarm && <LowBatteryErr />}
                          </div>
                        </td>
                        <td> {meter.signalIntensity || "0"} dB</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                    <td colSpan={8}>Нет данных</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <Pagination
              page={pageNum}
              totalPage={totalPages ? totalPages : 1}
              onPageChanged={(page) => {
                setPageNum(page);
                getTableInfoCallback(page);
              }}
            />

            <ExcelButton onClick={saveExcelCallBack} />
          </div>
        </div>
      </div>
    </>
  );
};
