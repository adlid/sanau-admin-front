import { instance } from "./axios.instance";
// ts
import {
  IDownloadAllElectrocityReportParamsProps,
  IDownloadNewReport2ParamsProps,
  IDownloadNewReportParamsProps,
  IDownloadReportParamsProps, IDownloadReportWaterMeters, IGasReportParams, IGetTokenLorawanWater,
} from "../ts/interfaces/reports.interface";

export const reportsAPI = {
  downloadUSPDReport: async (bodyParams: IDownloadReportParamsProps) => {
    try {
      return await instance.post(`/admin-system/meter/balance`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  downloadDiffUSPDAndWaterReport: async (bodyParams: IDownloadReportParamsProps) => {
    try {
      return await instance.post(`/record/read/difference/daily/electric/data`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  downloadAllElecticityReport: async (bodyParams: IDownloadAllElectrocityReportParamsProps) => {
    try {
      return await instance.post(`/record/read/full/daily/electric/data`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  async downloadReportWaterMeters(bodyParams: IDownloadReportWaterMeters) {
    try {
      return await instance.post('/record/read/full/water/data', bodyParams, { responseType: 'arraybuffer' })
    } catch (e: any) {
      throw e.response
    }
  },

  getWaterMetersByFolder: async (folderId: string) => {
    try {
      return await instance.get(`/admin-system/meter/list/by/${folderId}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  getTokenLorawanWaterReports: async (body: IGetTokenLorawanWater) => {
    try {
      return await instance.post('/admin-system/water/data/token/generate', body)
    } catch (error: any) {
      throw error.response;
    }
  },

  downloadReportLorawanWaterReportsByToken: async (token: string) => {
    try {
      return await instance.get(`/admin-system/water/meter/data/excel/${token}`, { responseType: 'arraybuffer' })
    } catch (error: any) {
      throw error.response;
    }
  },

  downloadNewReport1: async (bodyParams: IDownloadNewReportParamsProps) => {
    try {
      return await instance.post(`/record/read/full/suntown`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  downloadNewReport2: async (bodyParams: IDownloadNewReport2ParamsProps) => {
    try {
      return await instance.post(`/record/read/direct/connection`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  // same props for the new report 2,3,4
  downloadNewReport3: async (bodyParams: IDownloadNewReport2ParamsProps) => {
    try {
      return await instance.post(`/record/read/data/yearly`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  downloadNewReport4: async (bodyParams: IDownloadNewReport2ParamsProps) => {
    try {
      return await instance.post(`/record/read/daily/archive`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  // same prop for report 1 and 5
  downloadNewReport5: async (bodyParams: IDownloadNewReportParamsProps) => {
    try {
      return await instance.post(`/record/read/consolidated/report`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },
  downloadNewReport6: async (bodyParams: IDownloadNewReportParamsProps) => {
    try {
      return await instance.post(`/record/read/quality/evidence`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveGasReportExcel: async (bodyParams: IGasReportParams) => {
    try {
      return await instance.post(`/record/read/full/gas/data`, bodyParams, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

};
