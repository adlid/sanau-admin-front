import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import "moment/locale/ru";

import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import { getMonitoringData } from "../../../store/slicesAndThunks/monitoring/monitoring.thunk";
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { getGasMeterInfoTable } from "../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";
import { GetGasTableDataType } from "../../../ts/types/indication.types";

//components
import { Item100 } from "./components/Item100";
import { Item80 } from "./components/Item80";
import { Item60 } from "./components/Item60";
import { Item40 } from "./components/Item40";
import { Item20 } from "./components/Item20";
import { NoData } from "./components/NoData";
import { Installation } from "./components/Installation";
import { MainButton } from "../../../components/uiKit/Buttons/MainButton";
import { resetMonitoringState } from "../../../store/slicesAndThunks/monitoring/monitoring.slice";

export const MonitoringTable: FC = () => {
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  // data from redux
  const { monitoringData } = useTypedSelector((state) => state.monitoring);
  // data from url
  const { token, meterType, type, from, to }: any = queryString.parse(history.location.search.substring(1));

  // loading handlers
  const [loading, setLoading] = useState<boolean>(false);
  // data handlers
  const [reversed, setReversed] = useState<any>(JSON.parse(JSON.stringify(monitoringData)));
  const [isOpenPopup, togglePopup] = useState(false);

  useEffect(() => {
    setReversed(JSON.parse(JSON.stringify(monitoringData)));
  }, [monitoringData]);

  const getMonotoringInfo = async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    await dispatch(getMonitoringData(token as string));
    setLoading(false);
  };
  useEffect(() => {
    getMonotoringInfo();
  }, [token]);

  const getReadingData = (date: string, id: string) => {
    if (type === "DAILY" && meterType === "GAS") {
      const body: GetGasTableDataType = {
        dateFrom: `${date}T00:00:00.000000Z`,
        dateTo: `${date}T00:00:00.000000Z`,
        meterId: [id as string],
        type: type as string,
      };
      dispatch(getGasMeterInfoTable(body));
    } else if (type === "HOURLY" && meterType === "GAS") {
      const body: GetGasTableDataType = {
        dateFrom: `${date}T00:00:00.000000Z`,
        dateTo: `${date}T00:00:00.000000Z`,
        meterId: [id as string],
        type: type as string,
      };
      dispatch(getGasMeterInfoTable(body));
    }
  };

  const types: any = {
    DAILY: "????????????????",
    HOURLY: "??????????????",
    MONTHLY: "????????????????",
  };

  const months: any = {
    "01": "????????????",
    "02": "??????????????",
    "03": "????????",
    "04": "????????????",
    "05": "??????",
    "06": "????????",
    "07": "????????",
    "08": "????????????",
    "09": "????????????????",
    "10": "??????????????",
    "11": "????????????",
    "12": "??????????????",
  };

  useEffect(() => {
    return () => {
      dispatch(resetMonitoringState());
    };
  }, []);

  return (
    <div className="monitoring-table" style={{ position: "relative" }}>
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="monitoring-table__title">???????????????????? ??????????????????</h2>
          <h4 className="monitoring-table__subtitle">
            {types[type]} ???????????? ?? {moment(from).locale("ru").format("LL")} ???? {moment(to).locale("ru").format("LL")}
          </h4>
        </div>

        <div className="d-flex" style={{ alignItems: "center" }}>
          <div className="d-flex align-items-center" style={{ marginRight: "12px" }}>
            {/* <span className="monitoring-table__data-title ">???????????????????????? ????????????: 89%</span>
            <button className="meters-graph__btn meters-graph__btn--active">??????</button>
            <div className="mr8px"></div>
            <button className="meters-graph__btn">???????????? ?? ????????????????????</button> */}
          </div>

          <MainButton
            title="???????????????? ?????????????????????? ????????????"
            isSecondary={true}
            style={{ width: 242, height: 40, fontSize: 14 }}
            onClick={() => togglePopup(true)}
          />
        </div>
      </div>

      <div className="mb16px"></div>

      <div className="monitoring-table__wrap">
        <table className="table table-sm table-bordered">
          <thead>
            <tr className="read-data-view-table__header read-data-view-table__bgc">
              <th rowSpan={2} scope="col" style={{ textAlign: "center", width: "300px", minWidth: "300px" }}>
                ???????????????????????? ????
              </th>
              <th rowSpan={2} scope="col" style={{ textAlign: "center", width: "120px", minWidth: "120px" }}>
                ???????????????? ???
              </th>
              {reversed &&
                reversed.info &&
                reversed?.info?.length !== 0 &&
                reversed.info[0].date &&
                reversed.info[0].date.reverse().map((d: any, index: any) => {
                  let filteredCounter: number = 0;
                  reversed.info[0].data.map((i: any) => {
                    if (i.date.includes(`${d.split("-")[0]}-${d.split("-")[1]}`)) {
                      filteredCounter = filteredCounter + 1;
                    }
                  });

                  return filteredCounter !== 0 ? (
                    <th key={index} style={{ textAlign: "center" }} colSpan={filteredCounter}>
                      ?????????????????? ???? {months[d.split("-")[1]] + " " + d.split("-")[0]}
                    </th>
                  ) : null;
                })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <th colSpan={10000} scope="row" style={{ height: "35px" }}>
                  <div style={{ margin: "0px", position: "absolute", left: "50%" }}>
                    <Spinner animation="border" size="sm" />
                  </div>
                </th>
              </tr>
            ) : reversed?.info?.length ? (
              reversed?.info?.reverse().map((meter: any, index: any) => {
                return (
                  <tr key={meter + index}>
                    <th scope="row" style={{ width: "300px", minWidth: "300px" }}>
                      {meter.name || "---"}
                    </th>
                    <th scope="row" style={{ width: "120px", minWidth: "120px" }}>
                      {meter.serialNumber || "---"}
                    </th>
                    {meter.data &&
                      meter.data.map((a: any, index: any) => {
                        return (
                          <th key={a.date + index} style={{ width: "fit-content" }}>
                            {a.indicationDayPercentageInfo.info === "?????? ????????????" && (
                              <NoData
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}
                            {a.indicationDayPercentageInfo.info === "????????????" && <Installation />}

                            {a.indicationDayPercentageInfo.info === "80???100% ?????????????? ???????????????????? ????????????" && (
                              <Item100
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                value={a.qtyOfCorrectData}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}

                            {a.indicationDayPercentageInfo.info === "60???80% ?????????????? ???????????????????? ????????????" && (
                              <Item80
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                value={a.qtyOfCorrectData}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}

                            {a.indicationDayPercentageInfo.info === "40???60% ?????????????? ???????????????????? ????????????" && (
                              <Item60
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                value={a.qtyOfCorrectData}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}

                            {a.indicationDayPercentageInfo.info === "20???40% ?????????????? ???????????????????? ????????????" && (
                              <Item40
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                value={a.qtyOfCorrectData}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}
                            {a.indicationDayPercentageInfo.info === ">20% ?????????????? ???????????????????? ????????????" && (
                              <Item20
                                qtyOfCorrectData={a.qtyOfCorrectData}
                                qtyOfInvalidData={a.qtyOfInvalidData}
                                qtyOfUnreadData={a.qtyOfUnreadData}
                                date={a.date}
                                value={a.qtyOfCorrectData}
                                onClick={() => getReadingData(a.date, meter.meterId)}
                              />
                            )}
                          </th>
                        );
                      })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <th colSpan={10000} scope="row" style={{ height: "35px" }}>
                  <p style={{ margin: "0px", position: "absolute", left: "50%" }}>?????? ????????????</p>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={isOpenPopup} onHide={() => togglePopup(false)} dialogClassName="monitoring-popup-wrap" centered>
        <div className="monitoring-popup">
          <div className="monitoring-popup__header">
            ??????????????????????
            <svg
              onClick={() => togglePopup(false)}
              className="monitoring-popup__icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
                fill="#253D51"
              />
            </svg>
          </div>
          <div className="monitoring-popup__body">
            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color1"></div>
              <div className="monitoring-blog__text">80???100% ?????????????? ???????????????????? ????????????</div>
            </div>

            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color2"></div>
              <div className="monitoring-blog__text">60???80% ?????????????? ???????????????????? ????????????</div>
            </div>

            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color3"></div>
              <div className="monitoring-blog__text">40???60% ?????????????? ???????????????????? ????????????</div>
            </div>

            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color4"></div>
              <div className="monitoring-blog__text">20???40% ?????????????? ???????????????????? ????????????</div>
            </div>

            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color5"></div>
              <div className="monitoring-blog__text">{`>20% ?????????????? ???????????????????? ????????????`}</div>
            </div>
            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color6"></div>
              <div className="monitoring-blog__text">?????? ????????????</div>
            </div>
            <div className="monitoring-blog d-flex align-items-center">
              <div className="monitoring-blog__square monitoring-blog__square--color7"></div>
              <div className="monitoring-blog__text">????????????</div>
            </div>
          </div>
          <div className="monitoring-popup__footer d-flex justify-content-end">
            <MainButton
              title="??????????????"
              isSecondary={true}
              style={{ width: 92, height: 40, fontSize: 14 }}
              onClick={() => togglePopup(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
