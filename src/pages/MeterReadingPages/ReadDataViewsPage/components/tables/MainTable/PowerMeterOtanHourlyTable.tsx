import moment from "moment";
import { FC, useEffect } from "react";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
// ts
import { OtanHourlyTableType } from "../../../../../../ts/types/gprsReadingTypes";
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import { setCurrentReadMeterName } from "../../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

type PropsType = {
  tableData: Array<OtanHourlyTableType>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterOtanHourlyTable: FC<PropsType> = (props) => {
  const { tableData, token, page, totalPages, saveExcelCallBack, getTableInfoCallback } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  // location parameters
  const { parameterValue }: any = queryString.parse(history.location.search.substring(1));
  const parameterValueAll = !parameterValue || parameterValue === "ALL" || parameterValue === "";

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
                {(parameterValueAll || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <th colSpan={3}>Активная энергия +, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <th colSpan={3}>Активная энергия -, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <th colSpan={3}>Реактивная энергия +, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <th colSpan={3}>Реактивная энергия -, кВт*ч</th>
                )}
              </tr>

              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                {/* Активная энергия + */}
                {(parameterValueAll || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                  </>
                )}

                {/* Активная энергия - */}
                {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                  </>
                )}

                {/* Реактивная энергия + */}
                {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                  </>
                )}

                {/* Реактивная энергия - */}
                {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
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
                    <th scope="row">{page ? ((page) * 10 + index + 1) : (index + 1)}</th>
                    <td> {meter.deviceId}</td>
                    <td>{meter.fixedAt ? moment(meter.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}</td>

                    {/* АКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueAll || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveTotal || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveI || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.positiveActiveIV || "0"}</td>
                      </>
                    )}

                    {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.reverseActiveEnergy?.reverseActiveTotal || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.reverseActiveII || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.reverseActiveIII || "0"}</td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.positiveReactiveEnergy?.positiveReactiveTotal || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.positiveReactiveI || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.positiveReactiveII || "0"}</td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.reverseReactiveEnergy?.reverseReactiveTotal || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.reverseReactiveIII || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.reverseReactiveIV || "0"}</td>
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
