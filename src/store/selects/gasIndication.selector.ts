import { AppStateType } from "../store";
import { createSelector } from "reselect";

const getValues = (state: AppStateType) => state.gasIndication.mainGraphData || [];
const getSelectedGraphsName = (state: AppStateType) => state.gasIndication.selectedGraphName;
const getSelectedGraphsItem = (state: AppStateType) => state.gasIndication.selectedGraphItem;

export const getXaxisValues = createSelector(getValues, getSelectedGraphsItem, (graphData, selectedGraphItem) => {
  return graphData.filter((item) => item.barcode === selectedGraphItem).map((data) => data.fixedAt);
});

export const getYaxisValues = createSelector(
  getValues,
  getSelectedGraphsName,
  getSelectedGraphsItem,
  (graphData, selectedGraphName, selectedGraphItem) => {
    return graphData.filter((item) => item.barcode === selectedGraphItem).map((data) => +data[selectedGraphName]);
  }
);
