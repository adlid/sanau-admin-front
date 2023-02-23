import { FC, useEffect } from "react";

//components
import { PowerBluetoothGraphs } from "./components/Graphs";
import { PowerMeterBluetooth } from "./components/tables/MainTable";
// import { PowerIndicationFilter } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilter";
import { PowerIndicationFilterBluetooth } from "../MeterIndicationReadingPage/components/IndicationFilter/PowerIndicationFilterBluetooth";

import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";

import {
  saveExcelBluetoothMeters,
  getBluetoothTableGraphValues,
  getBluetoothGraphValues,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import {
  resetIndicationStatePower,
  setCurrentReadMeterName,
} from "../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

export const PowerReadBluetoothDataViewsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { bluetoothMeterTableGraphData } = useTypedSelector((state) => state.powerIndication);
  const history = useHistory();

  const { token, page, bluetoothId }: any = queryString.parse(history.location.search.substring(1));

  useEffect(() => {
    if (token !== undefined) {
      dispatch(getBluetoothTableGraphValues({ page: +page, token: token as string }));
      dispatch(getBluetoothGraphValues(token as string));
    }
  }, [token]);

  const getTableInfoCallback = (page: number) => {};

  const saveExcelCallBack = () => {
    if (token !== undefined) {
      dispatch(saveExcelBluetoothMeters(token as string));
    }
  };

  useEffect(() => {
    dispatch(
      setCurrentReadMeterName(
        bluetoothMeterTableGraphData &&
          bluetoothMeterTableGraphData.data.length !== 0 &&
          bluetoothMeterTableGraphData.data.length === 1
          ? bluetoothMeterTableGraphData.data[0].serialNumber
          : "ПУ электроэнергии Bluetooth"
      )
    );

    return () => {
      dispatch(setCurrentReadMeterName(""));
    };
  }, [bluetoothMeterTableGraphData]);

  useEffect(() => {
    return () => {
      dispatch(resetIndicationStatePower());
    };
  }, []);

  return (
    <div className="read-data-views-page ">
      {bluetoothId && <PowerIndicationFilterBluetooth />}

      {bluetoothMeterTableGraphData !== null && (
        <>
          <PowerBluetoothGraphs />

          <PowerMeterBluetooth
            tableData={bluetoothMeterTableGraphData.data}
            token={""}
            page={1}
            totalPages={100}
            saveExcelCallBack={saveExcelCallBack}
            getTableInfoCallback={getTableInfoCallback}
          />
        </>
      )}
    </div>
  );
};
