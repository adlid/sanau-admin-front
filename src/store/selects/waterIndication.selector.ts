import { AppStateType } from "../store";
import moment from "moment";
import { createSelector } from "reselect";

// DAILY VALUES
const getValues = (state: AppStateType) => state.waterIndication.mainGraphData || [];
const getSelectedGraphsName = (state: AppStateType) => state.waterIndication.selectedGraphName;
const getSelectedGraphsItem = (state: AppStateType) => state.waterIndication.selectedGraphItem;

export const getXaxisValues = createSelector(getValues, getSelectedGraphsItem, (graphData, selectedGraphItem) => {
  return graphData
    .filter((item) => item.devEUI === selectedGraphItem)
    .map((data) => moment(data.fixedAt).format("DD.MM.YYYY"));
});

export const getYaxisValues = createSelector(
  getValues,
  getSelectedGraphsName,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedGraphItem) => {
    return graphData.filter((item) => item.devEUI === selectedGraphItem).map((data) => data[selectedGraphName]);
  }
);

// HOURLY VALUES
const getHoursValues = (state: AppStateType) => state.waterIndication.mainHourlyGraphData || [];
const getHoursSelectedGraphsName = (state: AppStateType) => state.waterIndication.selectedGraphName;
const getHoursSelectedGraphsItem = (state: AppStateType) => state.waterIndication.selectedGraphItem;

export const getXaxisHoursValues = createSelector(
  getHoursValues,
  getHoursSelectedGraphsItem,
  (graphData, selectedGraphItem) => {
    return graphData
      ?.filter((item) => item.devEUI === selectedGraphItem)
      ?.map((data) => moment(data.hourlyDataTime).format("HH:mm"));
  }
);

export const getYaxisHoursValues = createSelector(
  getHoursValues,
  getHoursSelectedGraphsName,
  getHoursSelectedGraphsItem,
  (graphData, selectedGraphName, selectedGraphItem) => {
    return graphData.filter((item) => item.devEUI === selectedGraphItem).map((data) => data[selectedGraphName]);
  }
);
