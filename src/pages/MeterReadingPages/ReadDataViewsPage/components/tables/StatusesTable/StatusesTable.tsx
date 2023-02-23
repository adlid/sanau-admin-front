import { FC } from "react";
import { MainTableDataType } from "../../../../../../ts/types/indication.types";
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import moment from "moment";
import { useHistory } from "react-router-dom";

type PropsType = {
  tableData: Array<MainTableDataType>;
  token?: string;
  page?: number;
  totalPages?: number;
  getTableInfoCallback?: (page: number) => void;
};

export const StatusesTable: FC<PropsType> = ({ tableData, token, page, totalPages, getTableInfoCallback }) => {
  const history = useHistory();
  return (
    <div className="read-data-view-table">
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="read-data-view-table__header read-data-view-table__bgc">
            <th colSpan={3} scope="col">
              Счетчик
            </th>
            <th colSpan={5}>События</th>
          </tr>
          <tr className="read-data-view-table__bgc">
            <th scope="col">№</th>
            <th scope="col">Сер. №</th>
            <th scope="col">Дата</th>
            <th scope="col">Статус</th>
            <th scope="col">Включение</th>
            <th scope="col">Отключение</th>
            <th scope="col">Доступ</th>
            <th scope="col">Синхронизация</th>
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                        fill="#8A93A2"
                      />
                      <rect x="3" y="7" width="10" height="2" rx="1" fill="#8A93A2" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
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
};
