import { FC } from "react";

import { Pagination } from "../../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../../components/uiKit/Buttons/ExcelButton";
import moment from "moment";
import {
  LoraPowerActive,
  LoraActiveTableItem,
  LoraVoltageTableItem,
} from "../../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";

//statuses
// import { CurrentLessThanPrevStatus } from "../../../../../../../components/table/statuses/CurrentLessThanPrevStatus";
import { SuccessfulReadStatus } from "../../../../../../../components/table/statuses/SuccessfulReadStatus";
import { ILorawanTableDataBodyWithPagination, ILorawanTableDataNew } from "../../../../../../../ts/interfaces/powerMeterConcentrator";
// import { NoDataStatus } from "../../../../../../../components/table/statuses/NoDataStatus";
// import { IncorrectDataStatus } from "../../../../../../../components/table/statuses/IncorrectDataStatus";
// import { TotalGreaterOrLessStatus } from "../../../../../../../components/table/statuses/TotalGreaterOrLessStatus";

type PropsType = {
  data: ILorawanTableDataBodyWithPagination;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const LoraTableAllParams: FC<PropsType> = ({
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
                <th colSpan={6}>Активная +</th>
                <th colSpan={6}>Реактивная +</th>
                <th colSpan={6}>Активная -</th>
                <th colSpan={6}>Реактивная -</th>
                <th colSpan={3}>Ток</th>
                <th colSpan={3}>Напряжение</th>
                <th colSpan={3}>Мощность</th>
              </tr>
              <tr className="read-data-view-table__bgc">
                {/* СЧЕТЧИК */}
                <th scope="col">№</th>
                <th className="width100" scope="col">
                  Сер. №
                </th>
                <th className="width100" scope="col">
                  Дата
                </th>
                <th className="width100" scope="col">
                  Статус
                </th>
                {/* АКТИВНАЯ + */}
                <th className="width100" scope="col">
                  Расход
                </th>
                <th className="width100" scope="col">
                  Всего
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
                {/* РЕАКТИВНАЯ + */}
                <th className="width100" scope="col">
                  Расход
                </th>
                <th className="width100" scope="col">
                  Всего
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
                {/* АКТИВНАЯ  - */}
                <th className="width100" scope="col">
                  Расход
                </th>
                <th className="width100" scope="col">
                  Всего
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
                {/* РЕАКТИВНАЯ - */}
                <th className="width100" scope="col">
                  Расход
                </th>
                <th className="width100" scope="col">
                  Всего
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
                {/* ТОК */}
                <th className="width100">Фаза А</th>
                <th className="width100">Фаза B</th>
                <th className="width100">Фаза C</th>
                {/* НАПРЯЖЕНИЕ */}
                <th className="width100">Фаза А</th>
                <th className="width100">Фаза B</th>
                <th className="width100">Фаза C</th>
                {/* МОЩНОСТЬ */}
                <th className="width100">Активная</th>
                <th className="width100">Реактивная</th>
                <th className="width100">Общая</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.map((item, idx) => (
                  <>
                    <tr
                      key={idx}
                      className={
                        idx % 2 !== 0
                          ? "read-data-view-table__bgc "
                          : "read-data-view-table__bgc read-data-view-table__bgc--white"
                      }
                    >
                      <th scope="row">{idx + 1}</th>
                      <td> {item.deviceId}</td>
                      <td>{item.fixedAt ? moment(item.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                      <td>
                        <SuccessfulReadStatus />
                      </td>
                      {/* АКТИВНАЯ + */}
                      {/* <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].consumption : "-"}</td>
                      <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].total : "-"}</td>
                      <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].t1 : "-"}</td>
                      <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].t2 : "-"}</td>
                      <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].t3 : "-"}</td>
                      <td> {data.data.activeEnergyTotal[idx] ? data.data.activeEnergyTotal[idx].t4 : "-"}</td> */}
                      {/* РЕАКТИВНАЯ + */}
                      {/* <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].consumption : "-"}</td>
                      <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].total : "-"}</td>
                      <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].t1 : "-"}</td>
                      <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].t2 : "-"}</td>
                      <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].t3 : "-"}</td>
                      <td> {data.data.reactiveEnergyTotal[idx] ? data.data.reactiveEnergyTotal[idx].t4 : "-"}</td> */}
                      {/* АКТИВНАЯ - */}
                      {/* <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].consumption : "-"}</td>
                      <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].total : "-"}</td>
                      <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].t1 : "-"}</td>
                      <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].t2 : "-"}</td>
                      <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].t3 : "-"}</td>
                      <td> {data.data.activeEnergyMinus[idx] ? data.data.activeEnergyMinus[idx].t4 : "-"}</td> */}
                      {/* РЕАКТИВНАЯ - */}
                      {/* <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].consumption : "-"}</td>
                      <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].total : "-"}</td>
                      <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].t1 : "-"}</td>
                      <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].t2 : "-"}</td>
                      <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].t3 : "-"}</td>
                      <td> {data.data.reactiveEnergyMinus[idx] ? data.data.reactiveEnergyMinus[idx].t4 : "-"}</td> */}
                      {/* ТОК */}
                      {/* <td> {data.data.amperageByPhase[idx] ? data.data.amperageByPhase[idx].phaseA : "-"}</td>
                      <td> {data.data.amperageByPhase[idx] ? data.data.amperageByPhase[idx].phaseB : "-"}</td>
                      <td> {data.data.amperageByPhase[idx] ? data.data.amperageByPhase[idx].phaseC : "-"}</td> */}
                      {/* НАПРЯЖЕНИЕ */}
                      {/* <td> {data.data.voltageByPhase[idx] ? data.data.voltageByPhase[idx].phaseA : "-"}</td>
                      <td> {data.data.voltageByPhase[idx] ? data.data.voltageByPhase[idx].phaseB : "-"}</td>
                      <td> {data.data.voltageByPhase[idx] ? data.data.voltageByPhase[idx].phaseC : "-"}</td> */}
                      {/* МОЩНОСТЬ */}
                      {/* мощность - активная */}
                      {/* <td className="width100">
                        {data.data.totalActivePower[idx] ? data.data.totalActivePower[idx].instantKw : "-"}
                      </td> */}
                      {/* мощность - реактивная */}
                      {/* <td className="width100">
                        {data.data.totalReactivePower[idx] ? data.data.totalReactivePower[idx].instantKw : "-"}
                      </td> */}
                      {/* мощность - общая */}
                      {/* <td className="width100">{data.data.totalPower[idx] ? data.data.totalPower[idx].instantKw : "-"}</td> */}
                    </tr>
                  </>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
