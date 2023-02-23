import { FC } from "react";

import { Pagination } from "../../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../../components/uiKit/Buttons/ExcelButton";
import moment from "moment";
import { LoraActiveTableItem } from "../../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";

//statuses
import { CurrentLessThanPrevStatus } from "../../../../../../../components/table/statuses/CurrentLessThanPrevStatus";
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";
import { NoDataStatus } from "../../../../../../../components/table/statuses/NoDataStatus";
import { IncorrectDataStatus } from "../../../../../../../components/table/statuses/IncorrectDataStatus";
import { TotalGreaterOrLessStatus } from "../../../../../../../components/table/statuses/TotalGreaterOrLessStatus";

type PropsType = {
  tableData: Array<LoraActiveTableItem>;
  columnName: string;
  tableType: string;
  data?: any;
  field?: string;
};

export const LoraTableActiveEnergy: FC<PropsType> = ({ tableData, tableType, data, field }) => {
  const history = useHistory();
  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="read-data-view-table__bgc">
                <th className="width100" scope="col">
                  №
                </th>
                <th className="width100" scope="col">
                  Сер. №
                </th>
                <th className="width100" scope="col">
                  Дата
                </th>
                <th className="width100 col-100" scope="col">
                  Статус
                </th>
                <th className="width100" scope="col">
                  Потребление
                </th>
                <th className="width100" scope="col">
                  Всего {tableType === "activeEnergyPlus" && "A+"}
                  {tableType === "activeEnergyMinus" && "A-"}
                  {tableType === "reactiveEnergyPlus" && "B+"}
                  {tableType === "reactiveEnergyMinus" && "B-"}
                </th>
                <th className="width100" scope="col">
                  Т1
                </th>
                <th className="width100" scope="col">
                  Т2
                </th>
                <th className="width100" scope="col">
                  Т3
                </th>
                <th className="width100" scope="col">
                  Т4
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((meter, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      index % 2 !== 0
                        ? "read-data-view-table__bgc "
                        : "read-data-view-table__bgc read-data-view-table__bgc--white"
                    }
                  >
                    <th scope="row">{index + 1}</th>
                    <td> {meter.devEUI}</td>
                    <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                    <td> {meter.active && <SuccessfulReadStatus />}</td>
                    <td>{meter.consumption != null ? meter.consumption : '-'}</td>
                    <td>{meter.total != null ? meter.total : '-'}</td>
                    <td>{meter.t1 != null ? meter.t1 : '-'}</td>
                    <td>{meter.t2 != null ? meter.t2 : '-'}</td>
                    <td>{meter.t3 != null ? meter.t3 : '-'}</td>
                    <td>{meter.t4 != null ? meter.t4 : '-'}</td>
                  </tr>
                );
              })}
              {/* {data && field
                ? data[field].map((item: any, index: number) => {
                    return item.map((meter: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className={
                            index % 2 !== 0
                              ? "read-data-view-table__bgc "
                              : "read-data-view-table__bgc read-data-view-table__bgc--white"
                          }
                        >
                          <th scope="row">{index + 1}</th>
                          <td> {meter.devEUI}</td>
                          <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                          <td> {meter.active && <SuccessfulReadStatus />}</td>
                          <td>{meter.consumption || "-"}</td>
                          <td>{meter.total || "-"}</td>
                          <td>{meter.t1 || "-"}</td>
                          <td>{meter.t2 || "-"}</td>
                          <td>{meter.t3 || "-"}</td>
                          <td>{meter.t4 || "-"}</td>
                        </tr>
                      );
                    });
                  })
                : tableData?.map((meter, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          index % 2 !== 0
                            ? "read-data-view-table__bgc "
                            : "read-data-view-table__bgc read-data-view-table__bgc--white"
                        }
                      >
                        <th scope="row">{index + 1}</th>
                        <td> {meter.devEUI}</td>
                        <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                        <td> {meter.active && <SuccessfulReadStatus />}</td>
                        <td>{meter.consumption || "-"}</td>
                        <td>{meter.total || "-"}</td>
                        <td>{meter.t1 || "-"}</td>
                        <td>{meter.t2 || "-"}</td>
                        <td>{meter.t3 || "-"}</td>
                        <td>{meter.t4 || "-"}</td>
                      </tr>
                    );
                  })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
