import * as queryString from "querystring";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//components
import { GasGraphs } from "./components/Graphs/GasGraphs";
import { GasMainTable } from "./components/tables/MainTable/GasMainTable";
import { GasHourlyTable } from "./components/tables/MainTable/GasHourlyTable";
import { GasIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/GasIndicationFilter";
// redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import {
  resetGasIndicationState,
  setCurrentReadMeterName,
} from "../../../store/slicesAndThunks/gasIndication/gasIndication.slices";

export const GasReadDataViewsPage: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { meterId }: any = queryString.parse(history.location.search.substring(1));
  const { mainGraphData } = useTypedSelector((state) => state.gasIndication);
  const tableData = useTypedSelector((state) => state.gasIndication.mainTableData?.data);

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        tableData && tableData.length !== 0 && meterId && JSON.parse(meterId).length == 1
          ? tableData[0].barcode || tableData[0].gasModel.barcode
          : "ПУ газа UDP"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [tableData]);

  useEffect(() => {
    return () => {
      dispatch(resetGasIndicationState());
    };
  }, []);

  return (
    <div className="read-data-views-page tabs-type2">
      <div className="read-data-views-page">
        {meterId && <GasIndicationFilter />}
        <GasGraphs mainGraphData={mainGraphData} />
        <GasHourlyTable />
        {/* {groupBy === "HOURLY" ? <GasHourlyTable /> : <GasMainTable loading={loading} setLoading={setLoading} />} */}
      </div>
    </div>
  );
};
