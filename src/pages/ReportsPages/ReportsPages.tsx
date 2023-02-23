import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import React, { FC, useState, useEffect, useMemo, useCallback } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
// components
import { ReportTypes } from "./components/ReportTypes/ReportTypes";
import { ReportsFilter } from "./components/ReportsFilter/ReportsFilter";
import { MetersUspdList } from "./components/power/MetersUspdList/MetersUspdList";
import { MetersTCPIPList } from "./components/power/MetersTCPIPList/MetersTCPIPList";
import { MetersLorawanList } from "./components/power/MetersLorawanList/MetersLorawanList";
import { ConcentratorUspdList } from "./components/power/ConcentratorUspdList/ConcentratorUspdList";
import { ConcentratorLorawanList } from "./components/power/ConcentratorLorawanList/ConcentratorLorawanList";
import { ConcentratorLorawanUdpList } from "./components/water/ConcentratorLorawanUdpList/ConcentratorLorawanUdpList";
// redux
import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";
import {
  addIdToArr,
  addKeyToFolders,
  removeIdFromArr,
  removeKeyFromFolder,
  removeSelectAllConcentrators,
  resetReportsState,
} from "../../store/slicesAndThunks/reports/reports.slices";
import {
  saveAllElectocityReportExcel,
  saveDiffUSPDLorawanReportExcel,
  saveGasReportExcelThunk,
  saveLorawanWaterReportsExcelFolderThunk,
  saveLorawanWaterReportsExcelThunk,
  saveNewReport1Excel,
  saveNewReport2Excel,
  saveNewReport3Excel,
  saveNewReport4Excel,
  saveNewReport5Excel,
  saveNewReport6Excel,
  saveUSPDReportExcel, saveWaterReportsExcelThunk, saveWaterReportsFolderExcelThunk,
} from "../../store/slicesAndThunks/reports/reports.thunks";
import { removeSelectAllMeters as removeTCPMeters } from "../../store/slicesAndThunks/powerConcentrator/gprs/gprs.slice";
import { removeSelectAllMeters as removeLoraMeters } from "../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { removeSelectAllMeters as removeUSPDMeters } from "../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { ConcentratorWaterCounters } from "./components/power/ConcentratorWaterCounters/ConcentratorWaterCounters";
import { ConcentratorWaterCountersChildren } from "./components/power/ConcentratorWaterCountersChildren/ConcentratorWaterCountersChildren";
import { ConcentratorPowerCounters } from "./components/power/ConcentratorPowerCounters/ConcentratorPowerCounters";
import { ConcentratorPowerCountersChildren } from "./components/power/ConcentratorPowerCountersChildren/ConcentratorPowerCountersChildren";
import { reportsAPI } from "../../api/reports.api";
import { ConcentratorGasCountersChildren } from "./components/power/ConcentratorGasCountersChildren/ConcentratorGasCountersChildren";
import { ConcentratorGasCounters } from "./components/power/ConcentratorGasCounters/ConcentratorGasCounters";

interface IReportsPagesProps { }

export const ReportsPages: FC<IReportsPagesProps> = (props) => {
  const { } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // data from url
  const { type, id, index }: any = queryString.parse(history.location.search.substring(1));

  // data from redux
  const { selectedId, selectedFolders, meterType, selectedAllReport, selectedFolderName } = useTypedSelector((state) => state.reports);
  const selectedMetersLorawan = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator.selectedMeters);
  const selectedMetersTCPIP = useTypedSelector((state) => state.powerMeterGPRSMeter.selectedMeters);
  const selectedMetersUSPD = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator.selectedMeters);

  // FILTER DATES HANDLERS
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);

  // SEARCH HANDLERS
  const [searchValue, setSearchValue] = useState("");
  const onSearchChange = (value: string) => setSearchValue(value);

  // GROUP TYPE and REPORT TYPE HANDLERS
  const [loading, setLoading] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<string>("power");
  const [currentReportType, setCurrentReportType] = useState<string>("");

  const addIdToArrCallBack = (id: string | number) => dispatch(addIdToArr(id));
  const removeIdFromArrCallBack = (id: string | number) => dispatch(removeIdFromArr(id));

  const getMetersByFolder = useCallback(async () => {
    let meterIds: string[] = [];
    for (let i = 0; i < selectedFolders.length; i++) {
      let listOfWaterMeters = await reportsAPI.getWaterMetersByFolder(selectedFolders[i]);
      meterIds = meterIds.concat(listOfWaterMeters.data.map((item: any) => {
        return (
          item.unitedMeter.waterMeter ? item.unitedMeter.waterMeter.id
            : item.unitedMeter.gprsMeter ? item.unitedMeter.gprsMeter.id
              : item.unitedMeter.otanMeter ? item.unitedMeter.otanMeter.id
                : item.unitedMeter.bluetoothMeter ? item.unitedMeter.bluetoothMeter.id
                  : item.unitedMeter.networkServerMeter.id
        )
      }))
    }
    return meterIds;
  }, [selectedFolders])

  const getReport = async () => {
    if (!startDate || !finishDate) {
      enqueueSnackbar("Выберите период", { variant: "error" });
      return;
    }

    setLoading(true);
    if (currentReportType === "Баланс электроэнергии по УСПД") {
      for (let i: number = 0; i < selectedId.length; i++) {
        await dispatch(
          saveUSPDReportExcel({
            id: selectedId[i],
            from: startDate,
            to: finishDate,
          })
        );
      }
    } else if (currentReportType === "Суточный баланс электричества") {
      let meters: Array<string> = [];
      if (selectedFolders.length) {
        meters = await getMetersByFolder()
      } else {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      }
      await dispatch(
        saveAllElectocityReportExcel({
          meterId: meters,
          from: startDate,
          to: finishDate,
        })
      );

    } else if (currentReportType === "Суточный баланс электричества с разностью") {
      for (let i: number = 0; i < selectedId.length; i++) {
        await dispatch(
          saveDiffUSPDLorawanReportExcel({
            id: selectedId[i],
            from: startDate,
            to: finishDate,
          })
        );
      }
    } else if (currentReportType === "Баланс воды с разностью") {
      const meters: Array<string> = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];

      if (selectedFolders.length === 0) {
        await dispatch(
          saveLorawanWaterReportsExcelThunk({
            meterId: meters,
            dateFrom: startDate,
            dateTo: finishDate,
          })
        );
      } else {
        await dispatch(
          saveLorawanWaterReportsExcelFolderThunk({
            meterId: selectedFolders,
            dateFrom: startDate,
            dateTo: finishDate,
          })
        );
      }

    } else if (currentReportType === 'Отчёт по водосчетчикам') {
      const meters: Array<string> = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];

      if (selectedFolders.length === 0) {
        await dispatch(
          saveWaterReportsExcelThunk({
            meterId: meters,
            from: startDate,
            to: finishDate,
          })
        );
      } else {
        await dispatch(
          saveWaterReportsFolderExcelThunk({
            folders: selectedFolders,
            from: startDate,
            to: finishDate,
          })
        );
      }

    } else if (currentReportType === "новый отчет 1") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport1Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
          folderName: selectedFolderName
        })
      );

    } else if (currentReportType === "новый отчет 2") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport2Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
          parameter: "A+"
        })
      );

    } else if (currentReportType === "новый отчет 3") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport3Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
          parameter: "A+"
        })
      );
    } else if (currentReportType === "новый отчет 4") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport4Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
          parameter: "A+"
        })
      );
    } else if (currentReportType === "новый отчет 5") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport5Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
        })
      );
    } else if (currentReportType === "новый отчет 6") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveNewReport6Excel({
          meterId: meters,
          from: startDate,
          to: finishDate,
          type: "DAILY",
          meterType: meterType,
        })
      );
    } else if (currentReportType === "Отчет по газосчетчикам") {
      let meters: Array<string> = [];
      if (selectedFolders.length === 0) {
        meters = [...selectedMetersUSPD, ...selectedMetersTCPIP, ...selectedMetersLorawan];
      } else {
        meters = await getMetersByFolder()
      }
      await dispatch(
        saveGasReportExcelThunk({
          meterId: meters,
          from: startDate,
          to: finishDate
        })
      );
    }

    setLoading(false);
  };

  const resetAll = () => {
    dispatch(resetReportsState());
    dispatch(removeUSPDMeters()); // USDP METERS
    dispatch(removeLoraMeters()); // LORAWAN METERS
    dispatch(removeTCPMeters()); // TCP/IP METERS
    setCurrentReportType("");
    setCurrentGroup("power");
  };

  useEffect(() => {
    resetAll();

    return () => {
      resetAll();
      dispatch(resetReportsState());
    };
  }, []);

  useEffect(() => {
    dispatch(removeSelectAllConcentrators());
  }, [currentReportType]);

  useEffect(() => {
    setCurrentReportType("");
    dispatch(resetReportsState());
    dispatch(removeUSPDMeters()); // USDP METERS
    dispatch(removeLoraMeters()); // LORAWAN METERS
    dispatch(removeTCPMeters()); // TCP/IP METERS
  }, [currentGroup]);

  useEffect(() => {
    dispatch(resetReportsState());
  }, [type]);

  return (
    <div className="reports">
      <ReportsFilter
        loading={loading}
        selectedId={selectedId}
        selectedFolders={selectedFolders}
        getReport={getReport}
        resetAll={resetAll}
        currentReportType={currentReportType}
        currentMeterType={type}
        startDate={startDate}
        setStartDate={setStartDate}
        finishDate={finishDate}
        setFinishDate={setFinishDate}
        selectedMetersLorawan={selectedMetersLorawan}
        selectedMetersTCPIP={selectedMetersTCPIP}
        selectedMetersUSPD={selectedMetersUSPD}
      />

      <div className="reports__body">
        <ReportTypes
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
          currentReportType={currentReportType}
          setCurrentReportType={setCurrentReportType}
          currentMeterType={type}
        />

        {/* ОТЧЕТЫ ЭЛЕКТРОЭНЕРГИЯ */}
        {currentReportType && currentGroup === "power" && (
          <div className="reports__body_rightSide">
            {/* БАЛАНС ЭЛЕКТРОЭНЕРГИИ ПО УСПД */}
            {currentReportType === "Баланс электроэнергии по УСПД" && (
              <ConcentratorUspdList
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
              />
            )}

            {/* СУТОЧНЫЙ БАЛАНС ЭЛЕКТРИЧЕСТВА */}
            {currentReportType === "Суточный баланс электричества" &&
              (id && index ? <>
                <ConcentratorPowerCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorPowerCounters
                addKeyToArrCallBack={addIdToArrCallBack}
                removeKeyFromArrCallBack={removeIdFromArrCallBack}
              />)
              // (type === "УСПД" ? (
              //   !id ? (
              //     <ConcentratorUspdList
              //       addIdToArrCallBack={addIdToArrCallBack}
              //       removeIdFromArrCallBack={removeIdFromArrCallBack}
              //       dontShowCheckbox
              //     />
              //   ) : (
              //     <MetersUspdList id={id} />
              //   )
              // ) : type === "TCP/IP" ? (
              //   <MetersTCPIPList />
              // ) : type === "Lorawan" ? (
              //   !id ? (
              //     <ConcentratorLorawanList />
              //   ) : (
              //     <MetersLorawanList id={id} />
              //   )
              // ) : null)
            }

            {/* СУТОЧНЫЙ БАЛАНС ЭЛЕКТРИЧЕСТВА С РАЗНОСТЬЮ */}
            {currentReportType === "Суточный баланс электричества с разностью" && (
              <ConcentratorUspdList
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
              />
            )}
            {(currentReportType === "новый отчет 1"
              || currentReportType === "новый отчет 2"
              || currentReportType === "новый отчет 3"
              || currentReportType === "новый отчет 4"
              || currentReportType === "новый отчет 5"
              || currentReportType === "новый отчет 6"
            ) &&
              (id && index ? <>
                <ConcentratorPowerCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorPowerCounters
                addKeyToArrCallBack={addIdToArrCallBack}
                removeKeyFromArrCallBack={removeIdFromArrCallBack}
              />)
            }
          </div>
        )}

        {/* ОТЧЕТЫ ВОДА */}
        {currentReportType && currentGroup === "water" && (
          <div className="reports__body_rightSide">
            {/* Баланс воды с разностью */}
            {currentReportType === "Баланс воды с разностью" &&
              (id && index ? <>
                <ConcentratorWaterCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorWaterCounters
                addKeyToArrCallBack={addKeyToFolders}
                removeKeyFromArrCallBack={removeKeyFromFolder}
              />)}
            {currentReportType === "Отчёт по водосчетчикам" &&
              (id && index ? <>
                <ConcentratorWaterCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorWaterCounters
                addKeyToArrCallBack={addKeyToFolders}
                removeKeyFromArrCallBack={removeKeyFromFolder}
              />)}
          </div>
        )}

        {/* ОТЧЕТЫ ГАЗ */}
        {currentReportType && currentGroup === "gas" && (
          <div className="reports__body_rightSide">
            {/* Отчет по газосчетчикам */}
            {currentReportType === "Отчет по газосчетчикам" &&
              (id && index ? <>
                <ConcentratorGasCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorGasCounters
                addKeyToArrCallBack={addKeyToFolders}
                removeKeyFromArrCallBack={removeKeyFromFolder}
              />)}
          </div>
        )
        }
      </div>
    </div>
  );
};
