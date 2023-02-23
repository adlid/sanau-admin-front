import moment from "moment";
import { FC } from "react";
import { useHistory } from "react-router-dom";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
// ts
import { LorawanMainTableType } from "../../../../../../ts/types/lorawanUdpDevice.types";
import { LorawanTableDataItemNew } from "../../../../../../ts/interfaces/powerMeterConcentrator";

type PropsType = {
  deviceName?: string;
  tableData: Array<LorawanTableDataItemNew>;
  token?: string;
  page?: number;
  totalPages?: number;
  parameterValue?: string;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterLorawanCurrentTable: FC<PropsType> = (props) => {
  const { parameterValue, tableData, deviceName, page, totalPages, saveExcelCallBack, getTableInfoCallback } = props;

  const parameterValueNotExist = !parameterValue || parameterValue === "ALL" || parameterValue === "";

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th colSpan={3}>Счетчик</th>
                {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <th colSpan={6}>Активная энергия +, кВт*ч</th>
                )}
                {(parameterValueNotExist || parameterValue === "REVERSE_ACTIVE_ENERGY") && (
                  <th colSpan={6}>Активная энергия -, кВт*ч</th>
                )}
                {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <th colSpan={6}>Реактивная энергия +, кВт*ч</th>
                )}
                {(parameterValueNotExist || parameterValue === "REVERSE_REACTIVE_ENERGY") && (
                  <th colSpan={6}>Реактивная энергия -, кВт*ч</th>
                )}
                {(parameterValueNotExist || parameterValue === "POWER") && <th colSpan={5}>Мощность</th>}
                {(parameterValueNotExist || parameterValue === "VOLTAGE" || parameterValue === "AMPERAGE") && (
                  <th style={{ minWidth: 800 }} colSpan={11}>
                    Параметры сети
                  </th>
                )}
              </tr>

              <tr className="read-data-view-table__bgc">
                {/* СЧЕТЧИК */}
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Расход за период</th>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "REVERSE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Расход за период</th>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Расход за период</th>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "REVERSE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Расход за период</th>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* МОЩНОСТЬ */}
                {(parameterValueNotExist || parameterValue === "POWER") && (
                  <>
                    <th scope="col">Активная</th>
                    <th scope="col">Реактивная</th>
                    <th scope="col">Общая</th>
                    <th scope="col">Коэффициент</th>
                    <th scope="col">Частота</th>
                  </>
                )}

                {/* НАПРЯЖЕНИЕ */}
                {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Напряжение, В
                          </th>
                        </tr>
                        <tr>
                          <th>Фаза А</th>
                          <th>Фаза B</th>
                          <th>Фаза C</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                )}

                {/* ТОК А */}
                {(parameterValueNotExist || parameterValue === "AMPERAGE") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Ток, А
                          </th>
                        </tr>
                        <tr>
                          <th>Фаза А</th>
                          <th>Фаза В</th>
                          <th>Фаза С</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {tableData && tableData.map((meter, index) => {
                return (
                  meter.index !== null ?
                    <tr
                      key={meter.deviceId + index}
                      className={
                        index % 2 !== 0
                          ? "read-data-view-table__bgc "
                          : "read-data-view-table__bgc read-data-view-table__bgc--white"
                      }
                    >
                      <th scope="row">{meter.index}</th>
                      <td> {deviceName ?? meter.deviceId}</td>
                      <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                      {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                      {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                        <>
                          <td className="width100">{meter.positiveActiveEnergy?.diff || "-"}</td>
                          <td className="width100">{meter.positiveActiveEnergy?.total || "-"}</td>
                          <td className="width100">{meter.positiveActiveEnergy?.t1 || "-"}</td>
                          <td className="width100">{meter.positiveActiveEnergy?.t2 || "-"}</td>
                          <td className="width100">{meter.positiveActiveEnergy.t3 || "-"}</td>
                          <td className="width100">{meter.positiveActiveEnergy.t4 || "-"}</td>
                        </>
                      )}

                      {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                      {(parameterValueNotExist || parameterValue === "REVERSE_ACTIVE_ENERGY") && (
                        <>
                          <td className="width100">{meter.reverseActiveEnergy?.diff || "-"}</td>
                          <td className="width100">{meter.reverseActiveEnergy?.total || "-"}</td>
                          <td className="width100">{meter.reverseActiveEnergy?.t1 || "-"}</td>
                          <td className="width100">{meter.reverseActiveEnergy?.t2 || "-"}</td>
                          <td className="width100">{meter.reverseActiveEnergy?.t3 || "-"}</td>
                          <td className="width100">{meter.reverseActiveEnergy?.t4 || "-"}</td>
                        </>
                      )}

                      {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                      {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                        <>
                          <td className="width100">{meter.positiveReactiveEnergy?.diff || "-"}</td>
                          <td className="width100">{meter.positiveReactiveEnergy?.total || "-"}</td>
                          <td className="width100">{meter.positiveReactiveEnergy?.t1 || "-"}</td>
                          <td className="width100">{meter.positiveReactiveEnergy?.t2 || "-"}</td>
                          <td className="width100">{meter.positiveReactiveEnergy?.t3 || "-"}</td>
                          <td className="width100">{meter.positiveReactiveEnergy?.t4 || "-"}</td>
                        </>
                      )}

                      {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                      {(parameterValueNotExist || parameterValue === "REVERSE_REACTIVE_ENERGY") && (
                        <>
                          <td className="width100">{meter.reverseReactiveEnergy?.diff || "-"}</td>
                          <td className="width100">{meter.reverseReactiveEnergy?.total || "-"}</td>
                          <td className="width100">{meter.reverseReactiveEnergy?.t1 || "-"}</td>
                          <td className="width100">{meter.reverseReactiveEnergy?.t2 || "-"}</td>
                          <td className="width100">{meter.reverseReactiveEnergy?.t3 || "-"}</td>
                          <td className="width100">{meter.reverseReactiveEnergy?.t4 || "-"}</td>
                        </>
                      )}

                      {/* МОЩНОСТЬ */}
                      {(parameterValueNotExist || parameterValue === "POWER") && (
                        <>
                          <td className="width100">{meter.power?.activePower || "-"}</td>
                          <td className="width100">{meter.power?.reactivePower || "-"}</td>
                          <td className="width100">{meter.power?.fullPower || "-"}</td>
                          <td className="width100">{meter.power?.coefficient || "-"}</td>
                          <td className="width100">{meter.power?.frequency || "-"}</td>
                        </>
                      )}

                      {/* НАПРЯЖЕНИЕ */}
                      {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                        <>
                          <td className="width100">{meter.voltage?.phaseA || "-"}</td>
                          <td className="width100">{meter.voltage?.phaseB || "-"}</td>
                          <td className="width100">{meter.voltage?.phaseC || "-"}</td>
                        </>
                      )}

                      {/* ТОК А */}
                      {(parameterValueNotExist || parameterValue === "AMPERAGE") && (
                        <>
                          <td className="width100">{meter.amperage?.phaseA || "-"}</td>
                          <td className="width100">{meter.amperage?.phaseB || "-"}</td>
                          <td className="width100">{meter.amperage?.phaseC || "-"}</td>
                        </>
                      )}
                    </tr>
                    : null
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between">
          <Pagination
            page={page ? page : 1}
            totalPage={totalPages ? totalPages : 1}
            onPageChanged={(page) => {
              // history.push({ search: `?page=${page}&token=${token}` });

              if (getTableInfoCallback) getTableInfoCallback(page - 1);
            }}
          />

          <ExcelButton
            onClick={() => {
              if (saveExcelCallBack) saveExcelCallBack();
            }}
          />
        </div>
      </div>
    </div>
  );
};
