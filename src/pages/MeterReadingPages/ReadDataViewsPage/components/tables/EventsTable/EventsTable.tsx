import { FC, memo } from "react";
import moment from "moment";
import { MainTableDataType } from "../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { SuccessfulReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { IncorrectDataStatus } from "../../../../../../components/table/statuses/IncorrectDataStatus";

type PropsType = {
  tableData: Array<MainTableDataType>;
  token?: string;
  page?: number;
  totalPages?: number;
  getTableInfoCallback?: (page: number) => void;
};

export const EventsTable: FC<PropsType> = memo(({ tableData, token, page, totalPages, getTableInfoCallback }) => {
  const history = useHistory();
  return (
    <div className="read-data-view-table">
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="read-data-view-table__header read-data-view-table__bgc">
            <th colSpan={3} scope="col">
              Счетчик
            </th>
            <th colSpan={4}>Состояние</th>
          </tr>
          <tr className="read-data-view-table__bgc">
            <th scope="col">№</th>
            <th scope="col">Сер. №</th>
            <th scope="col">Дата</th>
            <th scope="col">Статус</th>
            <th scope="col">Реле</th>
            <th scope="col">Meter error</th>
            <th scope="col">Communication Error</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((meter, index) => {
            return (
              <tr
                key={meter.serial + index}
                className={
                  index % 2 !== 0
                    ? "read-data-view-table__bgc "
                    : "read-data-view-table__bgc read-data-view-table__bgc--white"
                }
              >
                <th scope="row">{meter.index}</th>
                <td> {meter.serial}</td>
                <td> {meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                <td>
                  {meter.status && meter.status.successfulRead && <SuccessfulReadStatus />}
                  {meter.status && meter.status.incorrectData && <IncorrectDataStatus />}
                </td>

                <td>{meter.status && meter.status.relay ? "+" : "-"}</td>
                <td> {meter.status && meter.status.meterError ? meter.status.meterError : "-"}</td>
                <td> {meter.status && meter.status.communicationError ? meter.status.communicationError : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex">
        <Pagination
          page={page !== undefined ? page : 1}
          totalPage={totalPages !== undefined ? totalPages : 1}
          onPageChanged={(page) => {
            history.push({ search: `?page=${page}&token=${token}` });

            if (getTableInfoCallback) {
              getTableInfoCallback(page);
            }
          }}
        />
      </div>
    </div>
  );
});
