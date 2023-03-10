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
    saveAllElectocityReportExcel, saveBillingExcelBDF, saveBillingExcelXLSX, saveBrokenExcel, saveDaylyExcel,
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
import {Col, Row, Spinner} from "react-bootstrap";
import {ConcentratorWaterCounterListItem} from "./components/power/ConcentratorWaterCounterListItem";

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
    console.log(currentReportType)
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
      enqueueSnackbar("???????????????? ????????????", { variant: "error" });
      return;
    }
    console.log(currentReportType)
    setLoading(true);
    if (currentReportType === "???????????? ???????????????????????????? ???? ????????") {
      for (let i: number = 0; i < selectedId.length; i++) {
        await dispatch(
          saveUSPDReportExcel({
            id: selectedId[i],
            from: startDate,
            to: finishDate,
          })
        );
      }
    } else if (currentReportType === "???????????????? ???????????? ??????????????????????????") {
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

    } else if (currentReportType === "???????????????? ???????????? ?????????????????????????? ?? ??????????????????") {
      for (let i: number = 0; i < selectedId.length; i++) {
        await dispatch(
          saveDiffUSPDLorawanReportExcel({
            id: selectedId[i],
            from: startDate,
            to: finishDate,
          })
        );
      }
    } else if (currentReportType === "???????????? ???????? ?? ??????????????????") {
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

    } else if (currentReportType === '?????????? ???? ??????????????????????????') {
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

    }else if(currentReportType === '?????????? ???????????????????????????? ??????????????????????'){
            await dispatch(
                saveBrokenExcel({
                    from: startDate,
                    to: finishDate,
                    groupId:selectedFolders[0]==='299af6f1-038b-4bd1-bd37-771986bddfa8' ? "2": "1"
                })
            )
    } else if(currentReportType === '???????????????? ?????????? ????????????'){
        await dispatch(
            saveDaylyExcel({
                from: startDate,
                to: finishDate,
            })
        )
    } else if(currentReportType === '?????????? ?????? ????????????????'){
        await dispatch(
            saveBillingExcelBDF({
                from: startDate,
                to: finishDate,
            })
        )
        await dispatch(
            saveBillingExcelXLSX({
                from: startDate,
                to: finishDate,
            })
        )
    } else if (currentReportType === "?????????? ?????????? 1") {
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

    } else if (currentReportType === "?????????? ?????????? 2") {
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

    } else if (currentReportType === "?????????? ?????????? 3") {
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
    } else if (currentReportType === "?????????? ?????????? 4") {
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
    } else if (currentReportType === "?????????? ?????????? 5") {
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
    } else if (currentReportType === "?????????? ?????????? 6") {
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
    } else if (currentReportType === "?????????? ???? ??????????????????????????") {
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
    console.log(currentReportType)
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

        {/* ???????????? ???????????????????????????? */}
        {currentReportType && currentGroup === "power" && (
          <div className="reports__body_rightSide">
            {/* ???????????? ???????????????????????????? ???? ???????? */}
            {currentReportType === "???????????? ???????????????????????????? ???? ????????" && (
              <ConcentratorUspdList
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
              />
            )}

              {currentReportType === '???????????????? ?????????? ????????????' && (id && index ? <>
                  <ConcentratorPowerCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorPowerCounters
                  addKeyToArrCallBack={addIdToArrCallBack}
                  removeKeyFromArrCallBack={removeIdFromArrCallBack}
              />)}
              {currentReportType === '?????????? ???????????????????????????? ??????????????????????' && (id && index ? <>
                  <ConcentratorPowerCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorPowerCounters
                  addKeyToArrCallBack={addIdToArrCallBack}
                  removeKeyFromArrCallBack={removeIdFromArrCallBack}
              />)}
            {/* ???????????????? ???????????? ?????????????????????????? */}
            {currentReportType === "???????????????? ???????????? ??????????????????????????" &&
              (id && index ? <>
                <ConcentratorPowerCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorPowerCounters
                addKeyToArrCallBack={addIdToArrCallBack}
                removeKeyFromArrCallBack={removeIdFromArrCallBack}
              />)
              // (type === "????????" ? (
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

            {/* ???????????????? ???????????? ?????????????????????????? ?? ?????????????????? */}
            {currentReportType === "???????????????? ???????????? ?????????????????????????? ?? ??????????????????" && (
              <ConcentratorUspdList
                addIdToArrCallBack={addIdToArrCallBack}
                removeIdFromArrCallBack={removeIdFromArrCallBack}
              />
            )}
            {(currentReportType === "?????????? ?????????? 1"
              || currentReportType === "?????????? ?????????? 2"
              || currentReportType === "?????????? ?????????? 3"
              || currentReportType === "?????????? ?????????? 4"
              || currentReportType === "?????????? ?????????? 5"
              || currentReportType === "?????????? ?????????? 6"
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

        {/* ???????????? ???????? */}
        {currentReportType && currentGroup === "water" && (
          <div className="reports__body_rightSide">
            {/* ???????????? ???????? ?? ?????????????????? */}
            {currentReportType === "???????????? ???????? ?? ??????????????????" &&
              (id && index ? <>
                <ConcentratorWaterCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorWaterCounters
                addKeyToArrCallBack={addKeyToFolders}
                removeKeyFromArrCallBack={removeKeyFromFolder}
              />)}
            {currentReportType === "?????????? ???? ??????????????????????????" &&
              (id && index ? <>
                <ConcentratorWaterCountersChildren index={+index} keyOfTree={id} />
              </> : <ConcentratorWaterCounters
                addKeyToArrCallBack={addKeyToFolders}
                removeKeyFromArrCallBack={removeKeyFromFolder}
              />)}
          </div>
        )}

        {/* ???????????? ?????? */}
        {currentReportType && currentGroup === "gas" && (
          <div className="reports__body_rightSide">
            {/* ?????????? ???? ?????????????????????????? */}
            {currentReportType === "?????????? ???? ??????????????????????????" &&
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
