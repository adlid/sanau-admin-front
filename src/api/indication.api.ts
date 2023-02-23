import { instance } from "./axios.instance";
import {
  ReadMeterInfoFilterType,
  ReadMeterConsiderInfoFilterType,
  GetMainTableDataType,
  ReadWaterMeterInfoFilterType,
  PowerIndicationMetersSearchBodyType,
  BluetoothBodyType,
  IParametersWaterHourlyMeterData,
  getHourlyWaterMeterInfoProps,
  IMetersListByGroupKey,
  ReadHourlyWaterMeterInfoFilterType,
  ReadGasMeterInfoFilterType,
  GetGasMeterDetailSidebarInfoPropsType,
  gprsFilterType,
  gprsExcellType,
  GetGasTableDataType,
  gprsGetDataEventsType,
} from "../ts/types/indication.types";

// POWER
export const indicationAPI = {
  metersListByGroupKey: async (params: IMetersListByGroupKey) => {
    try {
      return await instance.post(
        `/admin-system/group/meter/united/meter/by/key/search?page=${params.page - 1}&size=10`,
        {
          field: params.field,
          key: params.key,
          query: params.query,
        }
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  readMeterRecordInfo: async (mainTableBody: GetMainTableDataType) => {
    try {
      return await instance.post(`/admin-system/record/full/${mainTableBody.token}?page=${mainTableBody.page - 1}`);
    } catch (error: any) {
      throw error.response;
    }
  },
  readMeterConsiderInfo: async (body: ReadMeterConsiderInfoFilterType) => {
    try {
      return await instance.post("/admin-system/consider/meters", body);
    } catch (error: any) {
      throw error.response;
    }
  },
  getMeterInfoGraph: async (token: string) => {
    try {
      return await instance.post(`/admin-system/read/record/full/graph/${token}`);
    } catch (error: any) {
      throw error.response;
    }
  },
  saveMainTableExcel: async (token: string) => {
    try {
      return await instance.post(`/admin-system/read/full/excel/${token}`, {}, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  getTokenForMeter: async (body: ReadMeterInfoFilterType) => {
    try {
      return await instance.post("/admin-system/generate/record/read/token", body);
    } catch (error: any) {
      throw error.response;
    }
  },
  searchPowerIndicationMeters: async (powerIndicationMetersSearchBody: PowerIndicationMetersSearchBodyType) => {
    try {
      return await instance.get(
        `/admin-system/search/electric/meters/serial?text=${powerIndicationMetersSearchBody.value}&page=${powerIndicationMetersSearchBody.page - 1
        }`
      );
    } catch (error: any) {
      throw error.response;
    }
  },
  getBluetoothMetersToken: async (bluetoothBody: BluetoothBodyType) => {
    try {
      return await instance.post("/admin-system/bluetooth/meter/data/token/generate", bluetoothBody);
    } catch (error: any) {
      throw error.response;
    }
  },

  getBluetoothTableGraphValues: async (body: GetMainTableDataType) => {
    try {
      return await instance.get(`/admin-system/bluetooth/meter/data/${body.token}?page=${body.page - 1}`);
    } catch (error: any) {
      throw error.response;
    }
  },
  saveExcelBluetoothMeters: async (token: string) => {
    try {
      return await instance.get(`/admin-system/bluetooth/meter/data/excel/${token}`, {
        responseType: "arraybuffer",
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  saveExcelGRPSMeters: async (body: gprsExcellType) => {
    try {
      return await instance.post(`/gprs/read/record/excel`, body, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  saveExcelLorawanMeters: async (body: gprsExcellType) => {
    try {
      return await instance.post(`/lorawan-electric/read/excel`, body, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  getBluetoothGraphValues: async (token: string) => {
    try {
      return await instance.get(`/admin-system/bluetooth/meter/data/graph/${token}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  // GRPS METERS
  getGPRSTableValues: async (body: gprsFilterType) => {
    const { page, ...rest } = body;

    try {
      return await instance.post(`/gprs/read/record?page=${page - 1}&size=10`, rest);
    } catch (error: any) {
      throw error.response;
    }
  },
  getGPRSEventsTableValues: async (body: gprsGetDataEventsType) => {
    try {
      return await instance.post(`/gprs/full/event?page=0&size=10`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
  readGPRSEventsTableValues: async (meterId: Array<string>) => {
    try {
      return await instance.post("/gprs/event", { meterId, type: "ALL" });
    } catch (error: any) {
      throw error.response;
    }
  },
  onOffRelayGprs: async (meterId: Array<string>) => {
    try {
      return await instance.post("/gprs/relay", { meterId });
    } catch (error: any) {
      throw error.response;
    }
  },
  getGPRSGraphValues: async (body: gprsFilterType) => {
    const { page, ...rest } = body;

    try {
      return await instance.post(`/gprs/read/record/graph`, rest);
    } catch (error: any) {
      throw error.response;
    }
  },

  // OTAN METERS
  // READ DATA FROM METERS
  readOtanInstantaneousTableValues: async (body: gprsFilterType) => {
    try {
      return await instance.post(`/otan/read/instantaneous`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
  readOtanHourlyTableValues: async (body: gprsFilterType) => {
    try {
      return await instance.post(`/otan/read/hourly`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
  readOtanQuarterlyTableValues: async (body: gprsFilterType) => {
    try {
      return await instance.post(`/otan/read/quarterly`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
  readOtanDailyTableValues: async (body: gprsFilterType) => {
    try {
      return await instance.post(`/otan/read/daily`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
  readOtanMonthlyTableValues: async (body: gprsFilterType) => {
    try {
      return await instance.post(`/otan/read/monthly`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  // GET EXISTING OTAN DATA
  getOtanTableValues: async (body: gprsFilterType) => {
    const { page, ...rest } = body;

    try {
      return await instance.post(`/otan/read/record?page=${page - 1}&size=10`, rest);
    } catch (error: any) {
      throw error.response;
    }
  },
  getOtanGraphValues: async (body: gprsFilterType) => {
    const { page, ...rest } = body;

    try {
      return await instance.post(`/otan/read/record/graph`, rest);
    } catch (error: any) {
      throw error.response;
    }
  },
  // EXCELL
  saveExcelOtanMeters: async (body: gprsExcellType) => {
    try {
      return await instance.post(`/otan/read/record/excel`, body, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  addMetersToFolder: async (body: { folderId: string, meterId: string[], type: 'gprs' | 'otan' | 'dinrail' | 'bluetooth' }) => {
    try {
      return await instance.post(`/${body.type}/add/to/folder`, body);
    } catch (error: any) {
      throw error.response;
    }
  },
};

// WATER
export const waterIndicationAPI = {
  metersList: async (waterMeterPage: number) => {
    try {
      return await instance.get(`/admin-system/water/meters/list?page=${waterMeterPage - 1}&size=10`);
    } catch (error: any) {
      throw error.response;
    }
  },

  metersListByGroupKey: async (params: IMetersListByGroupKey) => {
    try {
      return await instance.post(
        `/admin-system/group/meter/united/meter/by/key/search?page=${params.page - 1}&size=10`,
        {
          field: params.field,
          key: params.key,
          query: params.query,
        }
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  readMeterRecordInfo: async (mainTableBody: GetMainTableDataType) => {
    try {
      return await instance.get(
        `/admin-system/water/meter/full/data/${mainTableBody.token}?page=${mainTableBody.page - 1}&size=10`
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  readMeterConsiderInfo: async (body: ReadMeterConsiderInfoFilterType) => {
    try {
      return await instance.post("/admin-system/consider/meters", body);
    } catch (error: any) {
      throw error.response;
    }
  },
  getMeterInfoGraph: async (token: string) => {
    try {
      return await instance.get(`/admin-system/water/meter/full/graph/${token}`);
    } catch (error: any) {
      throw error.response;
    }
  },
  saveMainTableExcel: async (token: string) => {
    try {
      return await instance.get(`/admin-system/water/meter/data/excel/${token}`, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  getTokenForMeter: async (body: ReadWaterMeterInfoFilterType) => {
    try {
      return await instance.post("/admin-system/water/data/token/generate", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getTokenForHourlyMeter: async (body: ReadHourlyWaterMeterInfoFilterType) => {
    try {
      return await instance.post("/admin-system/generate/water/hourly/token", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getHourlyMeterInfoGraph: async (parameters: IParametersWaterHourlyMeterData) => {
    try {
      return await instance.get(`/admin-system/water/hourly/graph/${parameters.token}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  getHourlyMeterInfoTable: async (parameters: getHourlyWaterMeterInfoProps) => {
    try {
      return await instance.get(
        `/admin-system/water/hourly/full/data/${parameters.token}?page=${parameters.pageNum - 1}&size=10`
      );
    } catch (error: any) {
      throw error.response;
    }
  },
};

// GAS

export const gasIndicationAPI = {
  metersList: async (waterMeterPage: number) => {
    try {
      return await instance.get(`/admin-system/water/meters/list?page=${waterMeterPage - 1}&size=10`);
    } catch (error: any) {
      throw error.response;
    }
  },

  metersListByGroupKey: async (params: IMetersListByGroupKey) => {
    try {
      return await instance.post(
        `/admin-system/group/meter/united/meter/by/key/search?page=${params.page - 1}&size=10`,
        {
          field: params.field,
          key: params.key,
          query: params.query,
        }
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  readMetersTableData: async (body: GetGasTableDataType) => {
    try {
      return await instance.post(`/gas-java/read`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getMetersTableData: async (body: GetGasTableDataType) => {
    try {
      return await instance.post(`/gas-java/read/record?page=${body.page || 1 - 1}&size=10`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getMetersGraphData: async (body: GetGasTableDataType) => {
    try {
      return await instance.post(`/gas-java/read/record/graph`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveMainTableExcel: async (body: GetGasTableDataType) => {
    try {
      return await instance.post(`/gas-java/read/record/excel`, body, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  getDetailGasUdpSidebarInfo: async (params: GetGasMeterDetailSidebarInfoPropsType) => {
    try {
      return await instance.post(`/gas/detail`, params);
    } catch (error: any) {
      throw error.response;
    }
  },
};
