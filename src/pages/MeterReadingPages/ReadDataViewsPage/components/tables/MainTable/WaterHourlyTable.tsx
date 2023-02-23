import moment from "moment";
import * as queryString from "querystring";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";

import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { getHourlyWaterMeterInfoTable } from "../../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import { Spinner } from "react-bootstrap";

type PropsType = {
  setLoading: any;
  loading: boolean;
};

export const WaterHourlyTable: FC<PropsType> = (props) => {
  const { loading, setLoading } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [pageNum, setPageNum] = useState<number>(1);

  const { tokenHourly }: any = queryString.parse(history.location.search.substring(1));

  const hourlyTableData = useTypedSelector((state) => state.waterIndication.hourlyTableData?.data);
  const totalPages = useTypedSelector((state) => state.waterIndication.hourlyTableData?.totalPage);

  const getHourlyTableData = async (page: number) => {
    setLoading(true);
    await dispatch(getHourlyWaterMeterInfoTable({ token: tokenHourly, pageNum: page }));
    setLoading(false);
  };

  const saveExcelCallBack = () => {};

  useEffect(() => {
    setPageNum(1);
  }, [tokenHourly]);

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Время фиксации</th>
                <th scope="col" className="col-100">
                  Расход за период (м3)
                </th>
                <th scope="col" className="col-100">
                  Показания (м3)
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                  <td colSpan={12}>
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : hourlyTableData?.length ? (
                hourlyTableData?.map((meter, index) => {
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
                      <td>{meter.hourlyDataTime ? moment(meter.hourlyDataTime).format("DD.MM.YYYY HH:mm") : "-"}</td>
                      <td>{meter.consumption || "0"}</td>
                      <td>{meter.waterIndication || "0"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className={"read-data-view-table__bgc read-data-view-table__bgc--white"}>
                  <td colSpan={4}>Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <Pagination
            page={+pageNum}
            totalPage={totalPages !== undefined ? totalPages : 1}
            onPageChanged={(page) => {
              setPageNum(page);
              getHourlyTableData(page);
            }}
          />

          <ExcelButton onClick={saveExcelCallBack} />
        </div>
      </div>
    </div>
  );
};
