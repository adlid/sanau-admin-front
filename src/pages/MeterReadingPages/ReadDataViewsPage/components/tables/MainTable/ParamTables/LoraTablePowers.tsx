import { FC } from "react";
import moment from "moment";
import { LoraPowerActive } from "../../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";
//statuses
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";

type PropsType = {
  data: any;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const LoraTablePowers: FC<PropsType> = ({
  data,
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
              <tr className="read-data-view-table__header read-data-view-table__bgc">
                <th colSpan={4} scope="col">
                  Счетчик
                </th>
                <th colSpan={3}>Мощность</th>
              </tr>
              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>
                <th scope="col">Статус</th>
                <th className="width100">Активная</th>
                <th className="width100">Реактивная</th>
                <th className="width100">Общая</th>
              </tr>
            </thead>

            <tbody>
              {data.totalPower?.map((meter: any, index: any) => {
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
                    <td className="width100"> {meter.devEUI}</td>
                    <td className="width100">
                      {meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </td>
                    <td className="width100">
                      <SuccessfulReadStatus />
                    </td>
                    {/* МОЩНОСТЬ */}
                    <td className="width100"> {data.totalActivePower[index].instantKw}</td>
                    <td className="width100"> {data.totalReactivePower[index].instantKw}</td>
                    <td className="width100"> {meter.instantKw}</td>
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
