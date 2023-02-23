import { FC, memo } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { SuccessfulReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { IncorrectDataStatus } from "../../../../../../components/table/statuses/IncorrectDataStatus";
// ts
import { GPRSEventsTableType } from "../../../../../../ts/types/gprsReadingTypes";

type PropsType = {
  tableData: Array<GPRSEventsTableType>;
  token?: string;
  page?: number;
  totalPages?: number;
  getTableInfoCallback?: (page: number) => void;
};

export const GPRSEventsLogTable: FC<PropsType> = memo(
  ({ tableData, token, page, totalPages, getTableInfoCallback }) => {
    const history = useHistory();
    return (
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="read-data-view-table__header read-data-view-table__bgc">
                <th rowSpan={2} scope="col">
                  Счетчик
                </th>
                <th colSpan={4}>Перенапряжение</th>
                <th colSpan={4}>Магнитное воздействие</th>
                <th colSpan={4}>Вскрытие кожуха</th>
                <th colSpan={4}>Вскрытие клемной крышки</th>
              </tr>
              <tr className="read-data-view-table__bgc">
                {/* Перенапряжение */}
                <th scope="col" rowSpan={2}>
                  Дата
                </th>
                <th scope="col" colSpan={3}>
                  Фаза
                </th>
                {/* Магнитное воздействие */}
                <th scope="col" colSpan={2}>
                  Дата
                </th>
                <th scope="col" colSpan={2}>
                  Энегрия
                </th>
                {/* Вскрытие кожуха */}
                <th scope="col" colSpan={2}>
                  Дата
                </th>
                <th scope="col" colSpan={2}>
                  Энегрия
                </th>
                {/* Вскрытие клемной крышки */}
                <th scope="col" colSpan={2}>
                  Дата
                </th>
                <th scope="col" colSpan={2}>
                  Энегрия
                </th>
              </tr>
              <tr className="read-data-view-table__header read-data-view-table__bgc">
                {/* Счетчик */}
                <th scope="col">Сер. №</th>
                {/* Перенапряжение */}
                <th scope="col">A</th>
                <th scope="col">B</th>
                <th scope="col">C</th>
                {/* Магнитное воздействие */}
                <th scope="col">Начало</th>
                <th scope="col">Окончание</th>
                <th scope="col">До</th>
                <th scope="col">После</th>
                {/* Вскрытие кожуха */}
                <th scope="col">Начало</th>
                <th scope="col">Окончание</th>
                <th scope="col">До</th>
                <th scope="col">После</th>
                {/* Вскрытие клемной крышки */}
                <th scope="col">Начало</th>
                <th scope="col">Окончание</th>
                <th scope="col">До</th>
                <th scope="col">После</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((meter, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      index % 2 !== 0
                        ? "read-data-view-table__bgc "
                        : "read-data-view-table__bgc read-data-view-table__bgc--white"
                    }
                  >
                    {/* Счетчик */}
                    <td className="width100">{meter.deviceId || "-"}</td>
                    {/* Перенапряжение */}
                    <td className="width100">{meter.overVoltage?.fixedAt || "-"}</td>
                    <td className="width100">{meter.overVoltage?.phaseA || "-"}</td>
                    <td className="width100">{meter.overVoltage?.phaseB || "-"}</td>
                    <td className="width100">{meter.overVoltage?.phaseC || "-"}</td>
                    {/* Магнитное воздействие */}
                    <td className="width100">{meter.magneticAttack?.startFixedAt || "-"}</td>
                    <td className="width100">{meter.magneticAttack?.endFixedAt || "-"}</td>
                    <td className="width100">{meter.magneticAttack?.totalActiveEnergyBefore || "-"}</td>
                    <td className="width100">{meter.magneticAttack?.totalActiveEnergyAfter || "-"}</td>
                    {/* Вскрытие кожуха */}
                    <td className="width100">{meter.moduleCover?.startFixedAt || "-"}</td>
                    <td className="width100">{meter.moduleCover?.endFixedAt || "-"}</td>
                    <td className="width100">{meter.moduleCover?.totalActiveEnergyBefore || "-"}</td>
                    <td className="width100">{meter.moduleCover?.totalActiveEnergyAfter || "-"}</td>
                    {/* Вскрытие клемной крышки */}
                    <td className="width100">{meter.tailCover?.startFixedAt || "-"}</td>
                    <td className="width100">{meter.tailCover?.endFixedAt || "-"}</td>
                    <td className="width100">{meter.tailCover?.totalActiveEnergyBefore || "-"}</td>
                    <td className="width100">{meter.tailCover?.totalActiveEnergyAfter || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex">
          <Pagination
            page={page || 1}
            totalPage={totalPages || 1}
            onPageChanged={(page) => {
              history.push({ search: `?page=${page}&token=${token}` });
              getTableInfoCallback && getTableInfoCallback(page);
            }}
          />
        </div>
      </div>
    );
  }
);
