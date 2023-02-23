import { instance } from "../axios.instance";
import { ConnectPowerMeterBluetoothType, EditPowerMeterBluetoothType } from "../../ts/types/powerMeterBluetooth.types";
import { IBluetoothNewFilter } from "../../ts/interfaces/powerMeterConcentrator";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";

export const powerMeterBluetoothConcentratorAPI = {
  connectBluetooth: async (bluetoothDeviceBody: ConnectPowerMeterBluetoothType) => {
    try {
      return await instance.post("/admin-system/add/bluetooth/meter", bluetoothDeviceBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  connectBluetoothPersonalAccountSearch: async (personalAccountNumber: string) => {
    try {
      return await instance.post("/admin-system/user/by/personalAccountNumber", {
        personalAccountNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  activateOrDeactivateBluetoothConcentratorMeters: async (body: { ids: Array<string>; value: string }) => {
    try {
      return await instance.put(`/admin-system/bluetooth/meter/${body.value}/list`, {
        serialNumber: body.ids,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  bluetoothNewFilter: async (searchBody: IBluetoothNewFilter) => {
    const { sortBy, page, ...body } = searchBody;
    try {
      return await instance.post(`/admin-system/bluetooth/meter/filter/search?sortBy=${sortBy}&page=${page - 1}&size=10`, body)
    } catch (error: any) {
      throw error.response;
    }
  },
  getBluetoothInfo: async (serialNumber: string) => {
    try {
      return await instance.post(`/admin-system/bluetooth/meter/by/serial/number`, {
        serialNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  editConnectBluetooth: async (bluetoothDeviceBody: EditPowerMeterBluetoothType) => {
    try {
      return await instance.put("/admin-system/bluetooth/meter/edit", bluetoothDeviceBody);
    } catch (error: any) {
      throw error.response;
    }
  },

  bluetoothConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "bluetooth",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveBluetoothConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },
};
