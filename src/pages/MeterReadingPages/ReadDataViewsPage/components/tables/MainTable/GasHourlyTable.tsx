import moment from "moment";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Drawer } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
import { GasIndicationsSideBar } from "../../../../../../components/table/GasIndicationsSideBar/GasIndicationsSideBar";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import {
  getGasMeterInfoTable,
  saveGasMainTableExcel,
} from "../../../../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";
import { ChangeGasValveClosingCauseModal } from "../../../../../../components/uiKit/modals/ChangeGasValveClosingCauseModal/ChangeGasValveClosingCauseModal";
import { Spinner } from "react-bootstrap";

type PropsType = {};

export const GasHourlyTable: FC<PropsType> = (props) => {
  const {} = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [pageNum, setPageNum] = useState<number>(1);

  // TABLE HANDLERS
  const { from, to, meterId, groupBy, timeFrom, timeTo }: any = queryString.parse(history.location.search.substring(1));
  const { getTableDataFetching } = useTypedSelector((state) => state.gasIndication);
  const tableData = useTypedSelector((state) => state.gasIndication.mainTableData?.data);
  const totalPages = useTypedSelector((state) => state.gasIndication.mainTableData?.totalPage);

  // DOWNLOAD TABLE EXCELL
  const saveExcelCallBack = () =>
    dispatch(saveGasMainTableExcel({ type: groupBy, dateFrom: from, dateTo: to, meterId: JSON.parse(meterId) }));

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<string>();
  const sideBarToggle = (state: boolean, id?: string) => (event: any) => {
    setSideBarOpen(state);
    id && setCurrentItemId(id);
  };

  const getTableInfoCallback = (page: number) => {
    dispatch(
      getGasMeterInfoTable({
        page,
        type: groupBy,
        timeFrom: groupBy === "HOURLY" ? timeFrom : "",
        timeTo: groupBy === "HOURLY" ? timeTo : "",
        dateFrom: from,
        dateTo: to,
        meterId: JSON.parse(meterId),
      })
    );
  };

  useEffect(() => {
    setPageNum(1);
  }, [groupBy, from, to, meterId]);

  const [valveClosingCauseModalOpen, setValveClosingCauseModalOpen] = useState<boolean>(false);
  const openValveClosingCauseModalOpenModal = () => setValveClosingCauseModalOpen(true);

  return (
    <>
      <ChangeGasValveClosingCauseModal
        open={valveClosingCauseModalOpen}
        onClose={() => setValveClosingCauseModalOpen(false)}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "900px", height: "100%" }}>
          {tableData
            ?.filter((meter) => meter.id === currentItemId)
            .map((meter) => {
              return (
                <GasIndicationsSideBar
                  key={meter.id}
                  meter={meter}
                  close={sideBarToggle(false)}
                  openValveClosingCauseModalOpenModal={openValveClosingCauseModalOpenModal}
                />
              );
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
                  {/* <th scope="col">Расход за период (м3)</th> */}
                  <th scope="col">Показания (м3)</th>
                </tr>
              </thead>
              <tbody>
                {getTableDataFetching ? (
                  <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                    <td colSpan={4}>
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
                            ? "read-data-view-table__bgc "
                            : "read-data-view-table__bgc read-data-view-table__bgc--white"
                        }
                      >
                        <td>{pageNum === 1 ? index + 1 : pageNum! * 10 + (index + 1)}</td>
                        <td
                          onClick={sideBarToggle(true, meter.id)}
                          style={{ textDecoration: "underline", color: "#18A0FB", cursor: "pointer" }}
                        >
                          {meter.barcode || "-"}
                        </td>
                        <td>{meter.fixedAt}</td>
                        {/* <td> {meter.consumption || "0"} </td> */}
                        <td> {meter.usegascount || "0"} </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                    <td colSpan={4}>Нет данных</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <Pagination
              page={pageNum}
              totalPage={totalPages !== undefined ? totalPages : 1}
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
