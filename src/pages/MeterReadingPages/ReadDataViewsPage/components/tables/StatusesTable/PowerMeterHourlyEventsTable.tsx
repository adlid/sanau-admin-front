import { FC } from "react";
import { MainTableDataType } from "../../../../../../ts/types/indication.types";
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { SuccessfulReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { IncorrectDataStatus } from "../../../../../../components/table/statuses/IncorrectDataStatus";

type PropsType = {
  tableData: Array<MainTableDataType>;
  token?: string;
  page?: number;
  totalPages?: number;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterHourlyEventsTable: FC<PropsType> = ({
  tableData,
  token,
  page,
  totalPages,
  getTableInfoCallback,
}) => {
  const history = useHistory();
  return (
    <div className="read-data-view-table">
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="read-data-view-table__header read-data-view-table__bgc">
            <th colSpan={3} scope="col">
              Счетчик
            </th>
            <th colSpan={6}>События</th>
          </tr>
          <tr className="read-data-view-table__bgc">
            <th scope="col">№</th>
            <th scope="col">Сер. №</th>
            <th scope="col">Дата</th>
            <th scope="col">Статус</th>
            <th scope="col">Реле</th>
            <th scope="col">Включение</th>
            <th scope="col">Отключение</th>
            <th scope="col">Кожух</th>
            <th scope="col">Крышка</th>
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
                  {meter.event !== null && meter.event.successfulRead && <SuccessfulReadStatus />}
                  {meter.event !== null && meter.event.incorrectData && <IncorrectDataStatus />}
                </td>
                <td>
                  {meter.status !== null && meter.status.relay ? <SuccessfulReadStatus /> : <IncorrectDataStatus />}
                </td>
                <td>{meter.event !== null ? meter.event.powerOnCount : "-"}</td>
                <td>{meter.event !== null ? meter.event.powerOffCount : "-"}</td>
                <td>{meter.event !== null ? meter.event.coverCount : "-"}</td>
                <td>{meter.event !== null ? meter.event.coverCount : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex">
        {/* <Pagination
          page={page !== undefined ? page : 1}
          totalPage={totalPages !== undefined ? totalPages : 1}
          onPageChanged={(page) => {
            history.push({ search: `?page=${page}&token=${token}` });

            if (getTableInfoCallback) {
              getTableInfoCallback(page);
            }
          }}
        /> */}
      </div>
    </div>
  );
};
