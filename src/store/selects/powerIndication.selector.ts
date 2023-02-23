import { AppStateType } from "../store";
import moment from "moment";
import { createSelector } from "reselect";
import { LorawanGraphsNameType } from "../../ts/types/indication.types";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

const getValues = (state: AppStateType) => {
  if (state.powerIndication.mainGraphData !== null) {
    return state.powerIndication.mainGraphData;
  } else {
    return [];
  }
};

const getValuesGPRS = (state: AppStateType) => {
  if (state.powerIndication.GPRSGraphData !== null) {
    return state.powerIndication.GPRSGraphData;
  } else {
    return [];
  }
};

const getValuesOTAN = (state: AppStateType) => {
  if (state.powerIndication.OtanGraphData !== null) {
    return state.powerIndication.OtanGraphData;
  } else {
    return [];
  }
};

const getValuesDinRail = (state: AppStateType) => {
  return state.powerIndication.DinRailGraphData;
};

const getSerialNumbers = (state: AppStateType) => {
  if (state.powerIndication.mainGraphData) {
    return state.powerIndication.mainGraphData.map((i) => i.serial);
  } else {
    return [];
  }
};

const getValuesBluetooth = (state: AppStateType) => {
  if (state.powerIndication.bluetoothMeterTableGraphData !== null) {
    return state.powerIndication.bluetoothGraph;
  } else {
    return [];
  }
};

export const getValuesLorawan = (state: AppStateType) => {
  if (state.powerIndication.lorawanGraph !== null) {
    return state.powerIndication.lorawanGraph;
  }
};

const getSerialNumbersBluetooth = (state: AppStateType) => {
  if (state.powerIndication.bluetoothMeterTableGraphData !== null) {
    return state.powerIndication.bluetoothMeterTableGraphData.data.map((i) => i.serialNumber);
  } else {
    return [];
  }
};

const getDeviceIdGPRS = (state: AppStateType) => {
  if (state.powerIndication.GPRSGraphData !== null) {
    return state.powerIndication.GPRSGraphData.map((i) => i.deviceId);
  } else {
    return [];
  }
};

const getDeviceIdOTAN = (state: AppStateType) => {
  if (state.powerIndication.OtanGraphData !== null) {
    return state.powerIndication.OtanGraphData.map((i) => i.deviceName);
  } else {
    return [];
  }
};

const getDeviceIdDinRail = (state: AppStateType) => {
  if (state.powerIndication.DinRailGraphData.length !== 0) {
    return state.powerIndication.DinRailGraphData.map((i) => i.deviceName);
  } else {
    return [];
  }
};

export const filteredList = createSelector(getSerialNumbers, (graphData) => {
  return graphData.filter(function (elem, pos) {
    return graphData.indexOf(elem) === pos;
  });
});

export const filteredBluetoothMetersList = createSelector(getSerialNumbersBluetooth, (graphData) => {
  return graphData.filter(function (elem, pos) {
    return graphData.indexOf(elem) === pos;
  });
});

export const filteredGPRSList = createSelector(getDeviceIdGPRS, (graphData) => {
  return graphData.filter(function (elem, pos) {
    return graphData.indexOf(elem) === pos;
  });
});

export const filteredOTANList = createSelector(getDeviceIdOTAN, (graphData) => {
  return graphData.filter(function (elem, pos) {
    return graphData.indexOf(elem) === pos;
  });
});

export const filteredDinRailList = createSelector(getDeviceIdDinRail, (graphData) => {
  return graphData.filter(function (elem, pos) {
    return graphData.indexOf(elem) === pos;
  });
});

const getSelectedGraphsName = (state: AppStateType) => {
  return state.powerIndication.selectedGraphName;
};

const getSelectedGraphsNameGPRS = (state: AppStateType) => {
  return state.powerIndication.selectedGraphNameGPRS;
};

const getSelectedGraphsNameDinRail = (state: AppStateType) => {
  return state.powerIndication.selectedGraphNameDinRail;
};

const getSelectedGraphsNameLorawan = (state: AppStateType) => {
  return state.powerIndication.selectedGraphNameLorawan;
};

const getSelectedGraphsItem = (state: AppStateType) => {
  if (state.powerIndication.selectedGraphNumber !== null) {
    return state.powerIndication.selectedGraphNumber;
  } else {
    return 0;
  }
};

export const getXaxisValues = createSelector(
  getValues,
  getSelectedGraphsName,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    return graphData
      .filter((i) => i[selectedGraphName] !== null)
      .filter((i) => i.serial?.toString() === selectedItem)
      .map((data) => moment(data[selectedGraphName]!.fixedAt).format("DD.MM.YYYY"));
  }
);

export const getYaxisValues = createSelector(
  getValues,
  getSelectedGraphsName,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    return graphData
      .filter((i) => i[selectedGraphName] !== null)
      .filter((i) => i.serial?.toString() === selectedItem)
      .map((data) => data[selectedGraphName]!.value);
  }
);

export const getXaxisValuesBluetooth = createSelector(
  getValuesBluetooth,
  getSelectedGraphsItem,
  (graphData, selectedItem) => {
    return graphData.filter((i) => i.serialNumber === selectedItem?.toString()).map((data) => data.lastFixDate);
  }
);

export const getYaxisValuesBluetooth = createSelector(
  getValuesBluetooth,
  getSelectedGraphsItem,
  (graphData, selectedItem) => {
    return graphData.filter((i) => i.serialNumber === selectedItem?.toString()).map((data) => +data.indication);
  }
);

// new by Islam:
const getCurrentLorawanDeviceName = (state: AppStateType) => {
  return state.powerIndication.currentLorawanItemDeviceName
}

const getLorawanTableData = (state: AppStateType) => {
  return state.powerIndication.lorawanTableDataNew
}

export const getCurrentLorawanTableDataNew = (state: AppStateType, currentDeviceName: string | null) => {
  const { lorawanTableDataNew: tableData } = state.powerIndication;
  if (currentDeviceName && tableData?.length) {
    tableData.filter(item => item.deviceName === currentDeviceName)
    if (tableData.length) {
      return tableData[0].data
    }
    return null
  }
  return null
}

export const getCurrentLorawanTableData = createDraftSafeSelector(
  getCurrentLorawanDeviceName,
  getLorawanTableData,
  (currentDeviceName, tableData) => {
    if (currentDeviceName && tableData?.length) {
      const res = tableData.filter(item => item.deviceName === currentDeviceName)
      if (res.length) {
        return res[0].data
      }
      return null
    }
    return null
  }
)

// by Islam new:
const getLorawanGraphData = (state: AppStateType) => {
  return state.powerIndication.lorawanGraphDataNew
}

const getLorawanSelectedGraph = (state: AppStateType) => {
  return state.powerIndication.selectedGraphNameLorawan
}

// to get current phase for amperage and power in Graphs
const getCurrentGraphPhase = (state: AppStateType) => {
  return state.powerIndication.selectedGraphPhase
}

export const getCurrentLorawanGraphData = (state: AppStateType) => {
  if (state.powerIndication.lorawanGraphDataNew) {
    let index = state.powerIndication.lorawanGraphDataNew.findIndex(val => val.deviceName === state.powerIndication.currentLorawanItemDeviceName);
    if (index != -1) {
      return state.powerIndication.lorawanGraphDataNew[index].data;
    }
  }
  return null
}

export const getXaxisValuesLorawanNew = createSelector(
  getLorawanGraphData,
  getLorawanSelectedGraph,
  getCurrentLorawanDeviceName,
  (graphData, selectedGraphName, currentDeviceName) => {
    if (graphData && currentDeviceName) {
      const data = graphData.filter(item => item.deviceName === currentDeviceName)
      console.log(graphData);
      console.log(currentDeviceName);
      console.log(data)
      const res = data[0].data;
      if (res.length) {
        const final = res
          .filter((item) => item[selectedGraphName] !== null)
          .map((item) => {
            return moment(item[selectedGraphName].fixedAt).format("DD.MM.YYYY")
          })
        return final;
      }
      return []
    } else {
      return []
    }
  }
)

export const getYaxisValuesLorawanNew = createSelector(
  getCurrentGraphPhase,
  getCurrentLorawanGraphData,
  getLorawanSelectedGraph,
  (phase, graphData, selectedGraphName) => {
    if (graphData) {
      let res = graphData
        .filter((i) => i[selectedGraphName] !== null)
        .map((data) => {
          if ((selectedGraphName === 'amperage' || selectedGraphName === 'voltage') && data[selectedGraphName]) {
            let temp = data[selectedGraphName];
            return temp[phase];
          }
          return data[selectedGraphName]!.value;
        });
      return res
    } else {
      return null
    }
  }
)

//gprs
export const getXaxisValuesGPRS = createSelector(
  getValuesGPRS,
  getSelectedGraphsNameGPRS,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    return graphData
      .filter((i) => i[selectedGraphName] !== null)
      .filter((i) => i.deviceId?.toString() === selectedItem)
      .map((data) => moment(data[selectedGraphName]!.fixedAt).format("DD.MM.YYYY"));
  }
);

export const getYaxisValuesGPRS = createSelector(
  getValuesGPRS,
  getSelectedGraphsNameGPRS,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    return graphData
      .filter((i) => i[selectedGraphName] !== null)
      .filter((i) => i.deviceId?.toString() === selectedItem)
      .map((data) => data[selectedGraphName]!.value);
  }
);

//otan
export const getXaxisValuesOTAN = createSelector(
  getValuesOTAN,
  getSelectedGraphsNameGPRS,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    const currentGraphItem = graphData.filter((i) => i.deviceName.toString() === selectedItem)
    if (currentGraphItem.length) {
      return currentGraphItem[0].data
        .filter((i) => i[selectedGraphName] !== null)
        .map((data) => moment(data[selectedGraphName]!.fixedAt).format("DD.MM.YYYY"));
    }
    return []
  }
);

export const getYaxisValuesOTAN = createSelector(
  getValuesOTAN,
  getSelectedGraphsNameGPRS,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    const currentGraphItem = graphData.filter((i) => i.deviceName.toString() === selectedItem)
    if (currentGraphItem.length) {
      return currentGraphItem[0].data
        .filter((i) => i[selectedGraphName] !== null)
        .map((data) => data[selectedGraphName]!.value);
    }
    return []
  }
);

//otan
export const getXaxisValuesDinRail = createSelector(
  getValuesDinRail,
  getSelectedGraphsNameDinRail,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    const currentGraphItem = graphData.filter((i) => i.deviceName.toString() === selectedItem)
    if (currentGraphItem.length) {
      return currentGraphItem[0].data
        .filter((i) => i[selectedGraphName] !== null)
        .map((data) => moment(data[selectedGraphName]!.fixedAt).format("DD.MM.YYYY"));
    }
    return []
  }
);

export const getYaxisValuesDinRail = createSelector(
  getValuesDinRail,
  getSelectedGraphsNameDinRail,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedItem) => {
    const currentGraphItem = graphData.filter((i) => i.deviceName.toString() === selectedItem)
    if (currentGraphItem.length) {
      return currentGraphItem[0].data
        .filter((i) => i[selectedGraphName] !== null)
        .filter((i) => i.deviceId?.toString() === selectedItem)
        .map((data) => data[selectedGraphName]!.value);
    }
    return []
  }
);

export const getCurrentGPRSTableData = (state: AppStateType) => {
  if (state.powerIndication.GPRSTableDataNew) {
    let index = state.powerIndication.GPRSTableDataNew.findIndex(val => val.deviceName === state.powerIndication.currentGPRSItemDeviceName);
    if (index != -1) {
      return state.powerIndication.GPRSTableDataNew[index].data;
    }
  }
  return null
}

export const getCurrentGPRSGraphData = (state: AppStateType) => {
  if (state.powerIndication.GPRSGraphDataNew) {
    let index = state.powerIndication.GPRSGraphDataNew.findIndex(val => val.deviceName === state.powerIndication.currentGPRSItemDeviceName);
    if (index != -1) {
      return state.powerIndication.GPRSGraphDataNew[index].data;
    }
  }
  return null
}

const getCurrentGPRSDeviceName = (state: AppStateType) => {
  return state.powerIndication.currentGPRSItemDeviceName
}

// by Islam new: 
export const getXaxisValuesGPRSNew = createSelector(
  getCurrentGPRSGraphData,
  getSelectedGraphsNameGPRS,
  getCurrentGPRSDeviceName,
  (graphData, selectedGraphName, selectedItem) => {
    if (graphData) {
      return graphData
        .filter((i) => i[selectedGraphName] !== null)
        .filter((i) => i.deviceId === selectedItem)
        .map((data) => moment(data[selectedGraphName]!.fixedAt).format("DD.MM.YYYY"));
    } else {
      return null
    }
  }
);

// by Islam new: 
export const getYaxisValuesGPRSNew = createSelector(
  getCurrentGraphPhase,
  getCurrentGPRSGraphData,
  getSelectedGraphsNameGPRS,
  getCurrentGPRSDeviceName,
  (phase, graphData, selectedGraphName, selectedItem) => {
    if (graphData) {
      let res = graphData
        .filter((i) => i[selectedGraphName] !== null)
        .filter((i) => i.deviceId === selectedItem)
        .map((data) => {
          if (selectedGraphName === 'amperage' || selectedGraphName === 'voltage') {
            let temp = data[selectedGraphName];
            return temp[phase];
          }
          return data[selectedGraphName]!.value;
        });
      return res
    } else {
      return null
    }
  }
);