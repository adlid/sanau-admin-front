import moment from "moment";
import { FC, useEffect } from "react";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
// components
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
// ts
import { IDinRailReadCurrentTableData } from "../../../../../../ts/types/dinRailTypes";
// redux
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import { setCurrentReadMeterName } from "../../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

type PropsType = {
  tableData: Array<IDinRailReadCurrentTableData>;
  saveExcelCallBack?: () => void;
};

export const PowerMeterDinRailCurrentTable: FC<PropsType> = (props) => {
  const { tableData, saveExcelCallBack } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  // location parameters
  const { parameterValue }: any = queryString.parse(history.location.search.substring(1));
  const parameterValueNotExist = !parameterValue || parameterValue === "";

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        tableData && tableData.length !== 0 && tableData.length === 1
          ? tableData[0].deviceId
          : "ПУ электроэнергии Din-Rail"
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
              <tr className="read-data-view-table__bgc">
                {/* ПОКАЗАНИЯ */}
                <th colSpan={3}>Счетчик</th>

                {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <th rowSpan={2} scope="col">
                    Активная энергия +, кВт*ч
                  </th>
                )}

                {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <th rowSpan={2} scope="col">
                    Активная энергия -, кВт*ч
                  </th>
                )}

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <th rowSpan={2} scope="col">
                    Реактивная энергия +, кВт*ч
                  </th>
                )}

                {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                {(parameterValueNotExist || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <th rowSpan={2} scope="col">
                    Реактивная энергия -, кВт*ч
                  </th>
                )}

                {/* НАПРЯЖЕНИЕ */}
                {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                  <th colSpan={3} scope="col">
                    Напряжение
                  </th>
                )}

                {/* ТОК*/}
                {(parameterValueNotExist || parameterValue === "CURRENT") && (
                  <th colSpan={3} scope="col">
                    Ток
                  </th>
                )}

                {/* МОЩНОСТЬ ПО ФАЗАМ */}
                {(parameterValueNotExist || parameterValue === "TOTAL_POWER") && (
                  <th colSpan={3} scope="col">
                    Мощность
                  </th>
                )}
              </tr>

              <tr>
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                {/* НАПРЯЖЕНИЕ */}
                {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                  <>
                    <th>Фаза А</th>
                    <th>Фаза B</th>
                    <th>Фаза C</th>
                  </> 
                )}

                {/* ТОК*/}
                {(parameterValueNotExist || parameterValue === "CURRENT") && (
                  <>
                    <th>Фаза А</th>
                    <th>Фаза В</th>
                    <th>Фаза С</th>
                  </>
                )}

                {/* МОЩНОСТЬ ПО ФАЗАМ */}
                {(parameterValueNotExist || parameterValue === "TOTAL_POWER") && (
                  <>
                    <th>Фаза А</th>
                    <th>Фаза В</th>
                    <th>Фаза С</th>
                  </>
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
                    <th scope="row">{index}</th>
                    <td> {meter.deviceId}</td>
                    <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                    {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueNotExist || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                      <td className="width100">{meter.positiveActiveEnergy || "0"}</td>
                    )}

                    {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueNotExist || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                      <td className="width100">{meter.negativeActiveEnergy || "0"}</td>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueNotExist || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                      <td className="width100">{meter.positiveReactiveEnergy || "0"}</td>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueNotExist || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                      <td className="width100">{meter.negativeReactiveEnergy || "0"}</td>
                    )}

                    {/* НАПРЯЖЕНИЕ */}
                    {(parameterValueNotExist || parameterValue === "VOLTAGE") && (
                      <>
                        <td className="width100">{meter.voltagePhaseA || "0"}</td>
                        <td className="width100">{meter.voltagePhaseB || "0"}</td>
                        <td className="width100">{meter.voltagePhaseC || "0"}</td>
                      </>
                    )}

                    {/* ТОК */}
                    {(parameterValueNotExist || parameterValue === "CURRENT") && (
                      <>
                        <td className="width100">{meter.currentPhaseA || "0"}</td>
                        <td className="width100">{meter.currentPhaseB || "0"}</td>
                        <td className="width100">{meter.currentPhaseC || "0"}</td>
                      </>
                    )}

                    {/* Мощность */}
                    {(parameterValueNotExist || parameterValue === "TOTAL_POWER") && (
                      <>
                        <td className="width100">{meter.powerPhaseA || "0"}</td>
                        <td className="width100">{meter.powerPhaseB || "0"}</td>
                        <td className="width100">{meter.powerPhaseC || "0"}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between">
          <div></div>
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
