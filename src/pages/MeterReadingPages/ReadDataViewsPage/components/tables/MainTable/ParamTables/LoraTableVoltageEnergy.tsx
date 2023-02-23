import { FC } from "react";

import { Pagination } from "../../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../../components/uiKit/Buttons/ExcelButton";
import moment from "moment";
import { LoraVoltageTableItem } from "../../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";

//statuses
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";

type PropsType = {
  tableData: Array<LoraVoltageTableItem>;
  columnName: string;
  data?: any;
  field?: string;
};

export const LoraTableVoltageEnergy: FC<PropsType> = ({ tableData, columnName, data, field }) => {
  const history = useHistory();

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                <th>Статус</th>
                <th style={{ minWidth: "150px" }}>Фаза А</th>
                <th style={{ minWidth: "150px" }}>Фаза B</th>
                <th style={{ minWidth: "150px" }}>Фаза C</th>
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
                    <td> {meter.devEUI || "-"}</td>
                    <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                    <td>
                      <SuccessfulReadStatus />
                    </td>
                    <td>{meter.phaseA || "-"}</td>
                    <td>{meter.phaseB || "-"}</td>
                    <td>{meter.phaseC || "-"}</td>
                  </tr>
                )
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
                          <td> {meter.devEUI || "-"}</td>
                          <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                          <td>
                            <SuccessfulReadStatus />
                          </td>
                          <td>{meter.phaseA || "-"}</td>
                          <td>{meter.phaseB || "-"}</td>
                          <td>{meter.phaseC || "-"}</td>
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
                        <td> {meter.devEUI || "-"}</td>
                        <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                        <td>
                          <SuccessfulReadStatus />
                        </td>
                        <td>{meter.phaseA || "-"}</td>
                        <td>{meter.phaseB || "-"}</td>
                        <td>{meter.phaseC || "-"}</td>
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
