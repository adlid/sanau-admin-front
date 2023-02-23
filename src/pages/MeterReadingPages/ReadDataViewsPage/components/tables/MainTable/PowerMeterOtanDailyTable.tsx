import moment from "moment";
import { FC, useEffect } from "react";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
// components
import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
// ts
import { OtanDailyTableType } from "../../../../../../ts/types/gprsReadingTypes";
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import { setCurrentReadMeterName } from "../../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

type PropsType = {
  tableData: Array<OtanDailyTableType>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterOtanDailyTable: FC<PropsType> = (props) => {
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
                  <th colSpan={5}>Активная энергия +, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <th colSpan={5}>Активная энергия -, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <th colSpan={5}>Реактивная энергия +, кВт*ч</th>
                )}
                {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <th colSpan={5}>Реактивная энергия -, кВт*ч</th>
                )}
              </tr>

              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата</th>

                {/* Активная энергия + */}
                {(parameterValueAll || parameterValue === "POSITIVE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* Активная энергия - */}
                {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* Реактивная энергия + */}
                {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
                  </>
                )}

                {/* Реактивная энергия - */}
                {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                  <>
                    <th scope="col">Всего</th>
                    <th scope="col">Т1</th>
                    <th scope="col">Т2</th>
                    <th scope="col">Т3</th>
                    <th scope="col">Т4</th>
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
                        <td className="width100">{meter.positiveActiveEnergy?.total || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.t1 || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.t2 || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.t3 || "0"}</td>
                        <td className="width100">{meter.positiveActiveEnergy?.t4 || "0"}</td>
                      </>
                    )}

                    {/* АКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueAll || parameterValue === "NEGATIVE_ACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.reverseActiveEnergy?.total || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.t1 || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.t2 || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.t3 || "0"}</td>
                        <td className="width100">{meter.reverseActiveEnergy?.t4 || "0"}</td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ + */}
                    {(parameterValueAll || parameterValue === "POSITIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.positiveReactiveEnergy?.total || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.t1 || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.t2 || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.t3 || "0"}</td>
                        <td className="width100">{meter.positiveReactiveEnergy?.t4 || "0"}</td>
                      </>
                    )}

                    {/* РЕАКТИВНАЯ ЭНЕРГИЯ - */}
                    {(parameterValueAll || parameterValue === "NEGATIVE_REACTIVE_ENERGY") && (
                      <>
                        <td className="width100">{meter.reverseReactiveEnergy?.total || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.t1 || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.t2 || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.t3 || "0"}</td>
                        <td className="width100">{meter.reverseReactiveEnergy?.t4 || "0"}</td>
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
            totalPage={totalPages ? totalPages : 1}
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
