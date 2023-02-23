import { FC } from "react";

import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
import moment from "moment";
import { MainTableDataType } from "../../../../../../ts/types/indication.types";
import { useHistory } from "react-router-dom";

//statuses
import { CurrentLessThanPrevStatus } from "../../../../../../components/table/statuses/CurrentLessThanPrevStatus";
import { SuccessfulReadStatus } from "../../../../../../components/table/statuses/SuccessfulReadStatus";
import { NoDataStatus } from "../../../../../../components/table/statuses/NoDataStatus";
import { IncorrectDataStatus } from "../../../../../../components/table/statuses/IncorrectDataStatus";
import { TotalGreaterOrLessStatus } from "../../../../../../components/table/statuses/TotalGreaterOrLessStatus";

type PropsType = {
  tableData: Array<MainTableDataType>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterHourly: FC<PropsType> = ({
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
              <tr className="read-data-view-table__header read-data-view-table__bgc">
                <th rowSpan={2} colSpan={3} scope="col">
                  Счетчик
                </th>
                <th colSpan={28}>Показания</th>
              </tr>

              <tr>
                {<th colSpan={7}>Активная энергия, кВт*ч</th>}
                <th colSpan={7}>Реактивная энергия, кВт*ч</th>
                <th colSpan={6}>Мощность</th>
                <th style={{ minWidth: 800 }} colSpan={13}>
                  Параметры сети
                </th>
              </tr>

              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>
                {/* АКТИВАНЯ ЭНЕРГИЯ */}
                <th scope="col" className="col-100">
                  Статус
                </th>
                <th scope="col">Расход за период</th>
                <th scope="col">Всего</th>
                <th scope="col">Т1</th>
                <th scope="col">Т2</th>
                <th scope="col">Т3</th>
                <th scope="col">Т4</th>
                {/* РЕАКТИВНАЯ ЭНЕРГИЯ */}
                <th scope="col" className="col-100">
                  Статус
                </th>
                <th scope="col">Расход за период</th>
                <th scope="col">Всего</th>
                <th scope="col">Т1</th>
                <th scope="col">Т2</th>
                <th scope="col">Т3</th>
                <th scope="col">Т4</th>
                {/* МОЩНОСТЬ */}
                <th scope="col" className="col-100">
                  Статус
                </th>
                {/* <th scope="col">Расход за период</th> */}
                <th scope="col">Активная</th>
                <th scope="col">Реактивная</th>
                <th scope="col">Полная</th>
                <th scope="col">Коэффициент</th>
                <th scope="col">Частота</th>
                {/* НАПРЯЖЕНИЕ */}
                <th colSpan={4} scope="col" className="read-data-view-table__pre-header">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={4} className="no-border">
                          Напряжение, В
                        </th>
                      </tr>
                      <tr>
                        <th style={{ borderLeft: "none" }}>Статус</th>
                        {/* <th scope="col">Расход за период</th> */}
                        <th>Фаза А</th>
                        <th>Фаза B</th>
                        <th>Фаза C</th>
                      </tr>
                    </thead>
                  </table>
                </th>
                {/* ТОК А */}
                <th colSpan={4} scope="col" className="read-data-view-table__pre-header">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={4} className="no-border">
                          Ток, А
                        </th>
                      </tr>
                      <tr>
                        <th style={{ borderLeft: "none" }}>Статус</th>
                        {/* <th scope="col">Расход за период</th> */}
                        <th>Фаза А</th>
                        <th>Фаза В</th>
                        <th>Фаза С</th>
                      </tr>
                    </thead>
                  </table>
                </th>
              </tr>
            </thead>
            {/* ДАННЫЕ */}
            <tbody>
              {tableData.length ? (
                tableData.map((meter, index) => {
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
                      <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          {meter.activeEnergy !== null && meter.activeEnergy.successfulRead && (
                            <>
                              <SuccessfulReadStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.activeEnergy !== null && meter.activeEnergy.totalGreaterOrLess && (
                            <>
                              <TotalGreaterOrLessStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.activeEnergy !== null && meter.activeEnergy.currentLessThanPrev && (
                            <>
                              <CurrentLessThanPrevStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.activeEnergy !== null && meter.activeEnergy.incorrectData && (
                            <>
                              <IncorrectDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.activeEnergy === null && (
                            <>
                              <NoDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                        </div>
                      </td>
                      <td>{meter.activeEnergy !== null ? meter.activeEnergy.diff : "-"}</td>
                      <td>{meter.activeEnergy !== null ? meter.activeEnergy.total : "-"}</td>

                      <td>{meter.activeEnergy !== null ? meter.activeEnergy.t1 : "-"}</td>
                      <td> {meter.activeEnergy !== null ? meter.activeEnergy.t2 : "-"}</td>
                      <td> {meter.activeEnergy !== null ? meter.activeEnergy.t3 : "-"}</td>
                      <td> {meter.activeEnergy !== null ? meter.activeEnergy.t4 : "-"}</td>

                      <td>
                        <div className="d-flex justify-content-center">
                          {meter.reactiveEnergy !== null && meter.reactiveEnergy.successfulRead && (
                            <>
                              <SuccessfulReadStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.reactiveEnergy !== null && meter.reactiveEnergy.totalGreaterOrLess && (
                            <>
                              <TotalGreaterOrLessStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.reactiveEnergy !== null && meter.reactiveEnergy.currentLessThanPrev && (
                            <>
                              <CurrentLessThanPrevStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.reactiveEnergy !== null && meter.reactiveEnergy.incorrectData && (
                            <>
                              <IncorrectDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.reactiveEnergy === null && (
                            <>
                              <NoDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                        </div>
                      </td>
                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy.diff : "-"}</td>
                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy?.total : "-"}</td>

                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy?.t1 : "-"}</td>
                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy?.t2 : "-"}</td>
                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy?.t3 : "-"}</td>
                      <td>{meter.reactiveEnergy !== null ? meter.reactiveEnergy?.t4 : "-"}</td>

                      {/* МОЩНОСТЬ */}
                      <td>
                        <div className="d-flex justify-content-center">
                          {meter.power !== null && meter.power.successfulRead && (
                            <>
                              <SuccessfulReadStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                          {meter.power !== null && meter.power.incorrectData && (
                            <>
                              <IncorrectDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}

                          {meter.power === null && (
                            <>
                              <NoDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                        </div>
                      </td>

                      {/* <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.diff : "-"}</td> */}
                      <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.activePower : "-"}</td>
                      <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.reactivePower : "-"}</td>
                      <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.fullPower : "-"}</td>
                      <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.coefficient : "-"}</td>
                      <td style={{ minWidth: 100 }}> {meter.power !== null ? meter.power.frequency : "-"}</td>

                      {/* НАПРЯЖЕНИЕ */}
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        <div className="d-flex justify-content-center">
                          {meter.voltage === null && <NoDataStatus />}

                          {meter.voltage !== null && meter.voltage.successfulRead && (
                            <>
                              <SuccessfulReadStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                          {meter.voltage !== null && meter.voltage.incorrectData && (
                            <>
                              <IncorrectDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                        </div>
                      </td>
                      {/* <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.voltage !== null ? meter.voltage.diff : "-"}
                      </td> */}
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.voltage !== null ? meter.voltage.phaseA : "-"}
                      </td>
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.voltage !== null ? meter.voltage.phaseB : "-"}
                      </td>
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.voltage !== null ? meter.voltage.phaseC : "-"}
                      </td>
                      {/* ТОК А */}
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        <div className="d-flex justify-content-center">
                          {meter.amperage === null && <NoDataStatus />}

                          {meter.amperage !== null && meter.amperage.successfulRead && (
                            <>
                              <SuccessfulReadStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                          {meter.amperage !== null && meter.amperage.incorrectData && (
                            <>
                              <IncorrectDataStatus />
                              <div className="mr4px"></div>
                            </>
                          )}
                        </div>
                      </td>
                      {/* <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.amperage !== null ? meter.amperage.diff : "-"}
                      </td> */}
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.amperage !== null ? meter.amperage.phaseA : "-"}
                      </td>
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.amperage !== null ? meter.amperage.phaseB : "-"}
                      </td>
                      <td style={{ minWidth: 100, maxWidth: 100 }}>
                        {meter.amperage !== null ? meter.amperage.phaseC : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                  <td colSpan={31}>Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
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

          <ExcelButton
            onClick={() => {
              if (saveExcelCallBack) {
                saveExcelCallBack();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
