import { FC } from "react";

import { Pagination } from "../../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../../components/uiKit/Buttons/ExcelButton";
import moment from "moment";
import { LoraPowerActive } from "../../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";

//statuses
// import { CurrentLessThanPrevStatus } from "../../../../../../../components/table/statuses/CurrentLessThanPrevStatus";
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";
// import { NoDataStatus } from "../../../../../../../components/table/statuses/NoDataStatus";
// import { IncorrectDataStatus } from "../../../../../../../components/table/statuses/IncorrectDataStatus";
// import { TotalGreaterOrLessStatus } from "../../../../../../../components/table/statuses/TotalGreaterOrLessStatus";

type PropsType = {
  tableData: Array<LoraPowerActive>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const LoraTablePowerActive: FC<PropsType> = ({
  tableData,
  token,
  page,
  totalPages,
  saveExcelCallBack,
  getTableInfoCallback,
}) => {
  const history = useHistory();

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              {/* <tr className="read-data-view-table__header read-data-view-table__bgc">
                <th  colSpan={3} scope="col">
                  Счетчик
                </th>
                <th rowSpan={3} colSpan={29}>Мощность</th>
              </tr> */}
              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th style={{ minWidth: 100, width: 100, maxWidth: 100 }} scope="col">
                  Сер. №
                </th>
                <th style={{ minWidth: 100, width: 100, maxWidth: 100 }} scope="col">
                  Дата
                </th>
                <th colSpan={2} scope="col">
                  Мощность
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
                    <td style={{ minWidth: 100, width: 100, maxWidth: 100 }}>
                      {meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </td>
                    <td style={{ minWidth: 100, width: 100, maxWidth: 100 }}>
                      <SuccessfulReadStatus />
                    </td>
                    <td style={{ minWidth: 100, width: 100, maxWidth: 100 }}> {meter.instantKw}</td>
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
