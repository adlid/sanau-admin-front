import moment from "moment";
import { FC, useEffect } from "react";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
// ts
import { OtanCurrentTableType } from "../../../../../../ts/types/gprsReadingTypes";
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import { setCurrentReadMeterName } from "../../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

type PropsType = {
  tableData: Array<OtanCurrentTableType>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterOtanCurrentTable: FC<PropsType> = (props) => {
  const { tableData, token, page, totalPages, saveExcelCallBack, getTableInfoCallback } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  // location parameters
  const { parameterValue }: any = queryString.parse(history.location.search.substring(1));
  const parameterValueNotExist = !parameterValue || parameterValue === "";

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        tableData && tableData.length !== 0 && tableData.length === 1 ? tableData[0].deviceId : "ПУ электроэнергии Отан"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [tableData]);

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th colSpan={3}>Счетчик</th>
                <th
                  style={{ minWidth: 800 }}
                  colSpan={parameterValueNotExist ? 20 : parameterValue === "TOTAL_POWER" ? 2 : 3}
                >
                  Показания
                </th>
              </tr>

              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Активная энергия +, кВт*ч
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

                {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Активная энергия -, кВт*ч
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

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Реактивная энергия +, кВт*ч
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

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Реактивная энергия -, кВт*ч
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

                {/* НАПРЯЖЕНИЕ */}
                {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Напряжение
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

                {/* ТОК*/}
                {(parameterValueNotExist || parameterValue === "CURRENT") && (
                  <th colSpan={3} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={3} className="no-border">
                            Ток
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

                {/* МОЩНОСТЬ ПО ФАЗАМ */}
                {(parameterValueNotExist || parameterValue === "TOTAL_POWER") && (
                  <th colSpan={2} scope="col" className="read-data-view-table__pre-header">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={2} className="no-border">
                            Мощность
                          </th>
                        </tr>
                        <tr>
                          <th>Активная мощность</th>
                          <th>Реактивная мощность</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                )}
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
                    <th scope="row">{page ? ((page) * 10 + index + 1) : (index + 1)}</th>
                    <td> {meter.deviceId}</td>
                    <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                    {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveEnergyPhaseA || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveEnergyPhaseB || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveEnergyPhaseC || "0"}</td>
                      </>
                    )}

                    {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueNotExist || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.negativeActiveEnergy?.negativeActiveEnergyPhaseA || "0"}</td>
                        <td className="width100">{meter.negativeActiveEnergy?.negativeActiveEnergyPhaseB || "0"}</td>
                        <td className="width100">{meter.negativeActiveEnergy?.negativeActiveEnergyPhaseC || "0"}</td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">
                          {meter.positiveReactiveEnergy?.positiveReactiveEnergyPhaseA || "0"}
                        </td>
                        <td className="width100">
                          {meter.positiveReactiveEnergy?.positiveReactiveEnergyPhaseB || "0"}
                        </td>
                        <td className="width100">
                          {meter.positiveReactiveEnergy?.positiveReactiveEnergyPhaseC || "0"}
                        </td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueNotExist || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">
                          {meter.negativeReactiveEnergy?.negativeReactiveEnergyPhaseA || "0"}
                        </td>
                        <td className="width100">
                          {meter.negativeReactiveEnergy?.negativeReactiveEnergyPhaseB || "0"}
                        </td>
                        <td className="width100">
                          {meter.negativeReactiveEnergy?.negativeReactiveEnergyPhaseC || "0"}
                        </td>
                      </>
                    )}

                    {/* НАПРЯЖЕНИЕ */}
                    {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                      <>
                        <td className="width100">{meter.voltage?.voltagePhaseA || "0"}</td>
                        <td className="width100">{meter.voltage?.voltagePhaseB || "0"}</td>
                        <td className="width100">{meter.voltage?.voltagePhaseC || "0"}</td>
                      </>
                    )}

                    {/* ТОК */}
                    {(parameterValueNotExist || parameterValue === "CURRENT") && (
                      <>
                        <td className="width100">{meter.current?.currentPhaseA || "0"}</td>
                        <td className="width100">{meter.current?.currentPhaseB || "0"}</td>
                        <td className="width100">{meter.current?.currentPhaseC || "0"}</td>
                      </>
                    )}

                    {/* Мощность */}
                    {(parameterValueNotExist || parameterValue === "TOTAL_POWER") && (
                      <>
                        <td className="width100">{meter.totalActivePower?.totalActivePower || "0"}</td>
                        <td className="width100">{meter.totalReactivePower?.totalReactivePower || "0"}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between">
          <Pagination
            page={page ? page + 1 : 1}
            totalPage={totalPages || 1}
            onPageChanged={(page) => {
              history.push({ search: `?page=${page}&token=${token}` });

              if (getTableInfoCallback) getTableInfoCallback(page);
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
