import { FC } from "react";
import moment from "moment";
import { LoraCosType } from "../../../../../../../ts/types/indication.types";

//statuses
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";

type PropsType = {
  data: any;
};

export const LoraTableCos: FC<PropsType> = ({ data }) => {
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
                <th style={{ minWidth: "150px" }}>Косинус</th>
              </tr>
            </thead>
            <tbody>
              {data.totalCos?.map((meter: any, index: any) => {
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
                    <td>
                      <SuccessfulReadStatus />
                    </td>
                    <td>{meter.cos}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
