import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { pushRedirect, addNotistack } from "../redirectAndNotification/redirectAndNotification.slice";

import {
  PowerIndicationMetersSearchBodyType,
  ReadMeterInfoFilterType,
  ReadMeterConsiderInfoFilterType,
  GetMainTableDataType,
  BluetoothBodyType,
  IMetersListByGroupKey,
  gprsFilterType,
  gprsExcellType,
  dinRailFilterType,
  readDinRailFilterType,
  dinRailExcellFilterType,
  gprsGetDataType,
  getAllMetersIdType,
  gprsGetDataEventsType,
} from "../../../ts/types/indication.types";
import { indicationAPI } from "../../../api/indication.api";
// import {
//   toggleGetTableDataFetching,
//   toggleGetTableConsiderDataFetching,
//   resetIndicationStatePower,
// } from "./powerIndication.slices";
import { powerMeterLorawanUdpDeviceConcentratorAPI } from "../../../api/concentrator/powerMeterLorawanUdpDeviceConcentratorAPI";
import {
  ILorawanDailyConsiderData,
  ISendRequestAnswer,
  ISendRequestAnswerHourly,
  ISendRequestAnswerHourlyGraph,
} from "../../../ts/interfaces/powerMeterConcentrator";
import { powerMeterGPRsAPI } from "../../../api/concentrator/powerMeterGPRS.api";
import { powerMeterDinRailAPI } from "../../../api/concentrator/powerMeterDinRail.api";
import { reportsAPI } from "../../../api/reports.api";
import { GPRSGraphResponse, GPRSTableResponse } from "../../../ts/types/gprsReadingTypes";

export const indicationPowerMetersListByGroupKey = createAsyncThunk(
  "indicationPowerMetersListByGroupKey",
  async (params: IMetersListByGroupKey, thunkAPI) => {
    try {
      const response = await indicationAPI.metersListByGroupKey(params);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getMeterInfoTable = createAsyncThunk(
  "getMeterInfoTable",
  async (mainTableBody: GetMainTableDataType, thunkAPI) => {
    try {
      const response = await indicationAPI.readMeterRecordInfo(mainTableBody);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getMeterConsiderInfoTable = createAsyncThunk(
  "getMeterConsiderInfoTable",
  async (body: ReadMeterConsiderInfoFilterType, thunkAPI) => {
    try {
      const response = await indicationAPI.readMeterConsiderInfo(body);

      if (body.type !== "HOURLY") {
        thunkAPI.dispatch(pushRedirect("/admin/reading/views/consider"));
      } else {
        thunkAPI.dispatch(pushRedirect("/admin/reading/power-meter/hourly/views"));
      }

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getMeterInfoGraph = createAsyncThunk("getMeterInfoGraph", async (token: string, thunkAPI) => {
  try {
    const response = await indicationAPI.getMeterInfoGraph(token);
    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const saveMainTableExcel = createAsyncThunk("saveMainTableExcel", async (token: string, thunkAPI) => {
  try {
    const response = await indicationAPI.saveMainTableExcel(token);
    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const getTokenForMeter = createAsyncThunk(
  "getTokenForMeter",
  async (body: any, thunkAPI) => {
    try {
      const response = await indicationAPI.getTokenForMeter(body);
      if (body.meterId.length === 1) {
        if (body.type !== "HOURLY") {
          thunkAPI.dispatch(
            pushRedirect(
              `/admin/reading/views?page=1&token=${response.data.token}&meterId=${body.meterId[0]}&type=concentrator&parameterValue=${body.parameterValue}&groupValue=${body.type}`
            )
          );
        } else {
          thunkAPI.dispatch(
            pushRedirect(
              `/admin/reading/power-meter/hourly/views?page=1&token=${response.data.token}&meterId=${body.meterId[0]}&type=concentrator`
            )
          );
        }
      } else {
        if (body.type !== "HOURLY") {
          thunkAPI.dispatch(pushRedirect(`/admin/reading/views?page=1&token=${response.data.token}&type=concentrator`));
        } else {
          thunkAPI.dispatch(
            pushRedirect(
              `/admin/reading/power-meter/hourly/views?page=1&token=${response.data.token}&type=concentrator`
            )
          );
        }
      }
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const saveExcelGRPSMeters = createAsyncThunk("saveExcelGRPSMeters", async (body: gprsExcellType, thunkAPI) => {
  try {
    const response = await indicationAPI.saveExcelGRPSMeters(body);

    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const saveExcelLorawanMetersThunk = createAsyncThunk(
  "saveExcelLorawanMetersThunk",
  async (body: gprsExcellType, thunkAPI) => {
    try {
      const response = await indicationAPI.saveExcelLorawanMeters(body);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getGPRSTableValuesThunk = createAsyncThunk(
  "getGPRSTableValuesThunk",
  async (body: gprsFilterType, thunkAPI) => {
    try {
      await thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/power-meter/gprs/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&dateFrom=${body.from}&dateTo=${body.to}&parameterValue=${body.parameterValue}`
        )
      );

      const response = await indicationAPI.getGPRSTableValues(body);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getGPRSEventsTableValuesThunk = createAsyncThunk(
  "getGPRSEventsTableValuesThunk",
  async (body: gprsGetDataEventsType, thunkAPI) => {
    try {
      const response = await indicationAPI.getGPRSEventsTableValues(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const readGPRSEventsTableValuesThunk = createAsyncThunk(
  "readGPRSEventsTableValuesThunk",
  async (meters: Array<string>, thunkAPI) => {
    try {
      const response = await indicationAPI.readGPRSEventsTableValues(meters);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const onOffRelayGprsThunk = createAsyncThunk("onOffRelayGprsThunk", async (meters: Array<string>, thunkAPI) => {
  try {
    const response = await indicationAPI.onOffRelayGprs(meters);
    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const getGPRSGraphValuesThunk = createAsyncThunk(
  "getGPRSGraphValuesThunk",
  async (body: gprsFilterType, thunkAPI) => {
    try {
      const response = await indicationAPI.getGPRSGraphValues(body);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const searchPowerIndicationMeters = createAsyncThunk(
  "concentrators/searchPowerIndicationMeters",
  async (powerIndicationMetersSearchBody: PowerIndicationMetersSearchBodyType, thunkAPI) => {
    try {
      const response = await indicationAPI.searchPowerIndicationMeters(powerIndicationMetersSearchBody);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

//bluetooth
export const getBluetoothMetersToken = createAsyncThunk(
  "getBluetoothMetersToken",
  async (bluetoothBody: BluetoothBodyType, thunkAPI) => {
    try {
      const response = await indicationAPI.getBluetoothMetersToken(bluetoothBody);

      if (bluetoothBody.id.length === 1) {
        thunkAPI.dispatch(
          pushRedirect(
            `/admin/reading/power-meter/bluetooth/views?page=1&token=${response.data.token}&bluetoothId=${bluetoothBody.id[0]}&type=bluetooth`
          )
        );
      } else {
        thunkAPI.dispatch(
          pushRedirect(`/admin/reading/power-meter/bluetooth/views?page=1&token=${response.data.token}&type=bluetooth`)
        );
      }
      // thunkAPI.dispatch(resetIndicationState())
      // thunkAPI.dispatch(toggleGetTableDataFetching(false));

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getBluetoothTableGraphValues = createAsyncThunk(
  "getBluetoothTableGraphValues",
  async (body: GetMainTableDataType, thunkAPI) => {
    try {
      const response = await indicationAPI.getBluetoothTableGraphValues(body);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getBluetoothGraphValues = createAsyncThunk("getBluetoothGraphValues", async (token: string, thunkAPI) => {
  try {
    const response = await indicationAPI.getBluetoothGraphValues(token);

    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const saveExcelBluetoothMeters = createAsyncThunk(
  "saveExcelBluetoothMeters",
  async (token: string, thunkAPI) => {
    try {
      const response = await indicationAPI.saveExcelBluetoothMeters(token);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

//lora
export const getAnswerLorawanDailyConsiderDataThunk = createAsyncThunk(
  "getAnswerLorawanDailyConsiderDataThunk",
  async (body: ILorawanDailyConsiderData, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.getAnswerLorawanDailyConsiderData(body);
      return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const sendRequestLorabanConsider = createAsyncThunk(
  "sendRequest",
  async (body: ISendRequestAnswer, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.sendRequestLorabanConsider(body);

      setTimeout(() => {
        thunkAPI.dispatch(
          requestAnswerLorabanConsider({
            id: body.id,
            type: body.type,
          })
        );
      }, 5000);

      return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const requestAnswerLorabanConsider = createAsyncThunk(
  "sendRequest/answer",
  async (body: ISendRequestAnswer, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.requestAnswerLorabanConsider(body);
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      thunkAPI.dispatch(
        pushRedirect(`/admin/reading/power-meter/lora/views?tableType=${body.type}&lorawanId=${body.id}`)
      );

      return {
        data: response.data,
        type: body.type,
      };
    } catch (error: any) {

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const requestLoravanReadDataThunk = createAsyncThunk(
  "sendRequest/requestLoravanReadData",
  async (body: ISendRequestAnswerHourly, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.requestLoravanReadData({
        meterId: body.id || "",
        startDate: body.startDate,
        endDate: body.endDate,
        startTime: body.startTime,
        endTime: body.endTime,
        format: body.format,
        type: body.type
      });

      setTimeout(() => {
        thunkAPI.dispatch(requestAnswerLorabanHourly(body));
        thunkAPI.dispatch(requestAnswerLorabanHourlyGraph(body));
      }, response.data.result || 0);

      return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      // notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const requestAnswerLorabanHourly = createAsyncThunk(
  "sendRequest/requestAnswerLorabanHourly",
  async (body: any, thunkAPI) => {
    try {
      const { id, ...rest } = body;
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.requestAnswerLorabanHourly({
        ...rest,
        meterId: body.id,
      });
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      thunkAPI.dispatch(
        pushRedirect(`/admin/reading/power-meter/lora/views?tableType=${body.type}&lorawanId=${body.id}&groupValue=${body.groupValue}&parameterValue=${body.parameterValue}&dateFrom=${body.from}&dateTo=${body.to}`)
      );

      return {
        data: response.data,
        type: body.type,
      };
    } catch (error: any) {
      // thunkAPI.dispatch(toggleGetTableConsiderDataFetching(false));
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

// new by Islam:

export const requestAnswerLorabanHourlyGraph = createAsyncThunk(
  "sendRequest/requestAnswerLorabanHourlyGraph",
  async (body: ISendRequestAnswerHourlyGraph, thunkAPI) => {
    try {
      const { id, ...rest } = body;
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.requestAnswerLorabanGraph({
        ...rest,
        meterId: body.id,
      });
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

//gprs andrey
//read current
export const getGPRSReadCurrent = createAsyncThunk("concentrator/getGPRSReadCurrent", async (body: any, thunkAPI) => {
  try {
    const response = await powerMeterGPRsAPI.GPRSReadCurrent(body.id, body.parameterValue);

    return response.data.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getGPRSReadHourly = createAsyncThunk("concentrator/getGPRSReadHourly", async (body: any, thunkAPI) => {
  try {
    const response = await powerMeterGPRsAPI.GPRSReadHourly(
      body.id,
      body.dateFrom,
      body.dateTo,
      body.parameterValue,
      body.timeFrom,
      body.timeTo
    );

    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getGPRSReadDaily = createAsyncThunk("concentrator/getGPRSReadDaily", async (body: any, thunkAPI) => {
  try {
    const response = await powerMeterGPRsAPI.GPRSReadyDaily(body.id, body.dateFrom, body.dateTo, body.parameterValue).then(res => res.data);
    let res: { data: Array<GPRSTableResponse>, graph: Array<GPRSGraphResponse> } = {
      data: response.data.map((item: any) => {
        return {
          data: {
            data: response.data,
            elementsSize: response.data.length,
            hasNext: false,
            page: 1,
            size: response.data.length,
            totalElementsOnPage: response.data.length,
            totalPage: response.data.length,
          },
          deviceName: item.deviceId
        }
      }),
      graph: response.graph.map((item: any) => {
        return {
          data: response.graph,
          deviceName: item.deviceId
        }
      })
    }
    return res;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getGPRSReadMonthly = createAsyncThunk("concentrator/getGPRSReadMonthly", async (body: any, thunkAPI) => {
  try {
    const response = await powerMeterGPRsAPI.GPRSReadMonthly(body.id, body.dateFrom, body.dateTo, body.parameterValue);

    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

// ------------ OTAN METERS ---------- //

export const getOtanReadCurrent = createAsyncThunk("power/getOtanReadCurrent", async (body: any, thunkAPI) => {
  try {
    const response = await indicationAPI.readOtanInstantaneousTableValues(body);
    return response.data.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getOtanReadQuarterly = createAsyncThunk("power/getOtanReadQuarterly", async (body: any, thunkAPI) => {
  try {
    const response = await indicationAPI.readOtanQuarterlyTableValues(body);
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getOtanReadHourly = createAsyncThunk("power/getOtanReadHourly", async (body: any, thunkAPI) => {
  try {
    const response = await indicationAPI.readOtanHourlyTableValues(body);
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getOtanReadDaily = createAsyncThunk("power/getOtanReadDaily", async (body: any, thunkAPI) => {
  try {
    const response = await indicationAPI.readOtanDailyTableValues(body);
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const getOtanReadMonthly = createAsyncThunk("power/getOtanReadMonthly", async (body: any, thunkAPI) => {
  try {
    const response = await indicationAPI.readOtanMonthlyTableValues(body);
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

// GET EXISTING DATA OTAN
export const getOtanHourlyTableValuesThunk = createAsyncThunk(
  "getOtanHourlyTableValuesThunk",
  async (body: gprsFilterType, thunkAPI) => {
    try {
      await thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/power-meter/otan/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&parameterValue=${body.parameterValue}&dateFrom=${body.from}&dateTo=${body.to}`
        )
      );

      const response = await indicationAPI.getOtanTableValues(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getOtanDailyTableValuesThunk = createAsyncThunk(
  "getOtanDailyTableValuesThunk",
  async (body: gprsFilterType, thunkAPI) => {
    try {
      await thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/power-meter/otan/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&parameterValue=${body.parameterValue}&dateFrom=${body.from}&dateTo=${body.to}&page=${body.page}`
        )
      );

      const response = await indicationAPI.getOtanTableValues(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getOtanGraphValuesThunk = createAsyncThunk(
  "getOtanGraphValuesThunk",
  async (body: gprsFilterType, thunkAPI) => {
    try {
      const response = await indicationAPI.getOtanGraphValues(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const saveExcelOtanMeters = createAsyncThunk("saveExcelOtanMeters", async (body: gprsExcellType, thunkAPI) => {
  try {
    const response = await indicationAPI.saveExcelOtanMeters(body);

    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});

// ------------ DINRAIL METERS ---------- //

export const getDinRailReadCurrent = createAsyncThunk(
  "power/getDinRailReadCurrent",
  async (body: readDinRailFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailReadCurrent(body.meterId, body.type);
      return response.data.data;
    } catch (error: any) {
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getDinRailReadHourly = createAsyncThunk(
  "power/getDinRailReadHourly",
  async (body: readDinRailFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailReadHourly(body);
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getDinRailReadDaily = createAsyncThunk(
  "power/getDinRailReadDaily",
  async (body: readDinRailFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailReadyDaily(body);
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getDinRailReadMonthly = createAsyncThunk(
  "power/getDinRailReadMonthly",
  async (body: readDinRailFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailReadMonthly(body);
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

// GET EXISTING DATA DinRail
export const getDinRailTableValuesThunk = createAsyncThunk(
  "getDinRailTableValuesThunk",
  async (body: dinRailFilterType, thunkAPI) => {
    try {
      await thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/power-meter/dinrail/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&parameterValue=${body.parameterValue}&dateFrom=${body.from}&dateTo=${body.to}`
        )
      );

      const response = await powerMeterDinRailAPI.getDinRailTableData(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getDinRailGraphValuesThunk = createAsyncThunk(
  "getDinRailGraphValuesThunk",
  async (body: dinRailFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.getDinRailGraphData(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const saveExcelDinRailMeters = createAsyncThunk(
  "saveExcelDinRailMeters",
  async (body: dinRailExcellFilterType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.saveExcelDinRailMeters(body);

      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

// by Islam
export const getGPRSTableDataNew = createAsyncThunk(
  "getGPRSTableDataNEW",
  async (body: gprsGetDataType, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.getGPRSTableData(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
)

export const getGPRSGraphDataNew = createAsyncThunk(
  "getGPRSGraphData",
  async (body: gprsGetDataType, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.getGPRSGraphData(body);
      await thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/power-meter/gprs/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&&parameterValue=${body.parameterValue}&dateFrom=${body.from}&dateTo=${body.to}`
        )
      );
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
)

export const getGPRSTableEventsDataNew = createAsyncThunk(
  "getGPRSTableDataNEW",
  async (body: gprsGetDataEventsType, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.getGPRSTableEventsData(body);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
)

export const getAllMeterIdsThunk = createAsyncThunk(
  "getAllMetersId",
  async (body: getAllMetersIdType, thunkAPI) => {
    try {
      const response = await reportsAPI.getWaterMetersByFolder(body.groupId);
      let appropriateMeterType = body.meterType === 'uspdMeter' ? 'meter' : body.meterType;
      const res = response.data.map((item: any) => {
        if (item.unitedMeter[appropriateMeterType].id) {
          return item.unitedMeter[appropriateMeterType].id
        }
      })
      return res
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
)

export const getUsdpGraphData = createAsyncThunk("getUsdpGraphData", async (token: string, thunkAPI) => {
  try {
    const response = await indicationAPI.getMeterInfoGraph(token);
    return response.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );

    return thunkAPI.rejectWithValue(error.data.status);
  }
});


export const getUsdpTableData = createAsyncThunk(
  "getUsdpTableData",
  async (mainTableBody: GetMainTableDataType, thunkAPI) => {
    try {
      const response = await indicationAPI.readMeterRecordInfo(mainTableBody);
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const addMetersToFolderThunk = createAsyncThunk(
  "addMetersToFolderThunk",
  async (data: { folderId: string, meterId: string[], type: 'gprs' | 'otan' | 'dinrail' | 'bluetooth' }, thunkAPI) => {
    try {
      const response = await indicationAPI.addMetersToFolder(data);
      if (response.data) {
        thunkAPI.dispatch(
          addNotistack({
            statusCode: "",
            statusText: 'Счетчики добавлены в группу',
            variant: "success",
          })
        );
      }
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);