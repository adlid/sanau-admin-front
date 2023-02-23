import { FC, memo } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { SuccessfulReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { IncorrectDataStatus } from "../../../../../../components/table/statuses/IncorrectDataStatus";
import { GPRSMainTableType } from "../../../../../../ts/types/gprsReadingTypes";

type PropsType = {
  tableData: Array<GPRSMainTableType>;
  token?: string;
  page?: number;
  totalPages?: number;
  getTableInfoCallback?: (page: number) => void;
};

export const EventsTableGPRS: FC<PropsType> = memo(({ tableData, token, page, totalPages, getTableInfoCallback }) => {
  const history = useHistory();
  return (
    <div className="read-data-view-table">
      <div className="overflow-block">
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
              <th scope="col">Реле</th>
              <th scope="col">Закрытие</th>
              <th scope="col">Включение</th>
              <th scope="col">Отключение</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((meter, index) => {
              return (
                <tr
                  key={meter.deviceId + index}
                  className={
                    index % 2 !== 0
                      ? "read-data-view-table__bgc "
                      : "read-data-view-table__bgc read-data-view-table__bgc--white"
                  }
                >
                  <th scope="row">{meter.index}</th>
                  <td style={{ minWidth: 200, maxWidth: 200 }}>{meter.deviceId}</td>
                  <td style={{ minWidth: 200, maxWidth: 200 }}>
                    {meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}
                  </td>
                  <td style={{ minWidth: 200, maxWidth: 200 }}>
                    {meter.event && <SuccessfulReadStatus />}
                    {!meter.event && <IncorrectDataStatus />}
                  </td>

                  <td style={{ minWidth: 200, maxWidth: 200 }}>{meter.event ? meter.event.coverCount : "-"}</td>
                  <td style={{ minWidth: 200, maxWidth: 200 }}> {meter.event ? meter.event.powerOnCount : "-"}</td>
                  <td style={{ minWidth: 200, maxWidth: 200 }}> {meter.event ? meter.event.powerOffCount : "-"}</td>
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

              if (getTableInfoCallback) getTableInfoCallback(page);
            }}
          />
        </div>
      </div>
    </div>
  );
});
