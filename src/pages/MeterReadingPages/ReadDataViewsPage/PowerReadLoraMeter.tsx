import { FC, useEffect, useMemo } from "react";
import { Spinner } from "react-bootstrap";

//components
import { PowerIndicationFilterLora } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilterLora";
import { PowerGraphLorawan } from "./components/Graphs";

//ts
import {
  resetIndicationStatePower,
  setCurrentReadMeterName
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import {
  requestAnswerLorabanHourly,
  saveExcelLorawanMetersThunk
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import { useAppDispatch, useTypedSelector } from "../../../utils/hooks/reduxHooks";

import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import { gprsExcellType } from "../../../ts/types/indication.types";
import { PowerMeterLorawanMainTable } from "./components/tables/MainTable/PowerMeterLorawanMainTable";
import { PowerMeterLorawanCurrentTable } from "./components/tables/MainTable/PowerMeterLorawanCurrentTable";
import { LoraTableActiveEnergy } from "./components/tables/MainTable/ParamTables/LoraTableActiveEnergy";
import { LoraTableVoltageEnergy } from "./components/tables/MainTable/ParamTables/LoraTableVoltageEnergy";
import { LoraTablePowerActive } from "./components/tables/MainTable/ParamTables/LoraTablePowerActive";

export const PowerReadLoraDataViewsPage: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  // data from redux, url
  const { lorawanId, tableType }: any = queryString.parse(history.location.search.substring(1));
  const {
    getTableConsiderDataFetching,
    lorawanFilter,
  } = useTypedSelector((state) => state.powerIndication);

  const { lorawanTableDataNew, lorawanGraphDataNew, currentLorawanItemDeviceName } = useTypedSelector(state => state.powerIndication);

  const saveExcelCallBack = () => {
    const body: gprsExcellType = {
      from: lorawanFilter.dateFrom,
      to: lorawanFilter.dateTo,
      meterId: lorawanId.split(","),
      type: lorawanFilter.groupValue,
    };
    dispatch(saveExcelLorawanMetersThunk(body));
  };

  const { metersId, loraTableData, loraTableDataVoltage, loraTablePower } = useTypedSelector((state) => state.powerIndication);

  const getTableInfoCallback = (page: number) => {
    if (lorawanFilter.groupValue !== "CURRENT") {

      const body = {
        ...lorawanFilter,
        id: !lorawanId ? metersId : lorawanId.split(","),
        type: lorawanFilter.parameterValue,
        startDate: lorawanFilter.dateFrom,
        endDate: lorawanFilter.dateTo,
        startTime: lorawanFilter.startHour.length === 0 ? "00:00" : lorawanFilter.startHour,
        endTime: lorawanFilter.finishHour.length === 0 ? "00:00" : lorawanFilter.finishHour,
        format: lorawanFilter.groupValue,
        page
      };
      dispatch(requestAnswerLorabanHourly(body,));
    }
  }

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        currentLorawanItemDeviceName ?
          `ПУ электроэнергии LoRaWAN и UDP/${currentLorawanItemDeviceName}`
          : "ПУ электроэнергии LoRaWAN и UDP"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [currentLorawanItemDeviceName]);

  useEffect(() => {
    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

  const getCurrentLorawanTableData = useMemo(() => {
    if (lorawanTableDataNew) {
      let index = lorawanTableDataNew.findIndex(val => val.deviceName === currentLorawanItemDeviceName);
      if (index != -1) {
        return lorawanTableDataNew[index]
      }
    }
    return null
  }, [lorawanTableDataNew, currentLorawanItemDeviceName])


  return (
    <div className="read-data-views-page ">
      <PowerIndicationFilterLora />

      {getTableConsiderDataFetching && (
        <div className="read-data-views-page__preloader d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )}

      {lorawanTableDataNew?.length && <PowerGraphLorawan type="lorawan" />}

      {(!getTableConsiderDataFetching
        && getCurrentLorawanTableData
        && lorawanFilter.groupValue !== "CURRENT")
        && (
          <PowerMeterLorawanMainTable
            tableData={getCurrentLorawanTableData.data.data}
            page={getCurrentLorawanTableData.data.page + 1}
            totalPages={getCurrentLorawanTableData.data.totalPage}
            getTableInfoCallback={getTableInfoCallback}
            saveExcelCallBack={saveExcelCallBack}
            parameterValue={tableType}
            deviceName={getCurrentLorawanTableData.deviceName}
          />
        )}

      {!getTableConsiderDataFetching && lorawanFilter.groupValue === 'CURRENT' && (
        <>
          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          {(tableType === "activeEnergyPlus" || tableType === "activeEnergyMinus") && (
            <LoraTableActiveEnergy tableType={tableType} columnName="Активная энергия" tableData={loraTableData} />
          )}
          {(tableType === "reactiveEnergyPlus" || tableType === "reactiveEnergyMinus") && (
            <LoraTableActiveEnergy tableType={tableType} columnName="Реактивная энергия" tableData={loraTableData} />
          )}

          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          {tableType === "voltageByPhase" && (
            <LoraTableVoltageEnergy columnName="Напряжение, В" tableData={loraTableDataVoltage} />
          )}
          {tableType === "amperageByPhase" && (
            <LoraTableVoltageEnergy columnName="Ток, А" tableData={loraTableDataVoltage} />
          )}

          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          {tableType === "totalActivePower" && <LoraTablePowerActive tableData={loraTablePower} />}
          {tableType === "totalReactivePower" && <LoraTablePowerActive tableData={loraTablePower} />}
          {tableType === "totalPower" && <LoraTablePowerActive tableData={loraTablePower} />}
        </>
      )}


    </div>
  );
};
