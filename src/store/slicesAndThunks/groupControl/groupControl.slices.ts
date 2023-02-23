import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroupControlItemData } from "../../../ts/types/groupcontrol.types";
import { groupControlState } from "./groupControl.state";
import {
  createGroupTreeItemThunk,
  deleteGroupTreeItemThunk,
  getDetailGroupTreeItemThunk,
  getGroupTreeBySearchThunk,
  getGroupTreeByTypeThunk,
  getGroupTreeItemMaterIndicatorsListThunk,
  getGroupTreeWithNewItemByKeyThunk,
} from "./groupControl.thunks";

const filteredFromDuplicateArray = (array: string[]) => array.filter((v, i) => array.indexOf(v) === i);

const groupControlSlice = createSlice({
  name: "groupControl",
  initialState: groupControlState,
  reducers: {
    addIdToSelectedList: (state, action: PayloadAction<any>) => {
      state.selectedMeters = filteredFromDuplicateArray([...state.selectedMeters, action.payload]);
      state.removedChildrenKey = state.removedChildrenKey.filter((id) => id !== action.payload);
    },

    removeIdFromSelectedList: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.removedChildrenKey = filteredFromDuplicateArray([...state.removedChildrenKey, action.payload]);
    },

    selectAllMeters: (state) => {
      const ids: string[] = [];
      const removedIds: string[] = [...state.removedChildrenKey];
      state.metersList?.data.map((meter: any) => {
        if (!state.selectedMeters.includes(meter.groupMeter.key)) ids.push(meter.groupMeter.key);
        if (state.removedChildrenKey.includes(meter.groupMeter.key)) {
          for (var i = 0; i < removedIds.length; i++) {
            if (removedIds[i] === meter.groupMeter.key) removedIds.splice(i, 1);
          }
        }
      });
      state.selectedMeters = [...state.selectedMeters, ...ids];
      state.removedChildrenKey = [...removedIds];
    },

    removeAllMeters: (state) => {
      let selectedIds: string[] = [...state.selectedMeters];
      const removedIds: string[] = [...state.removedChildrenKey];
      state.metersList?.data.map((meter: any) => {
        if (selectedIds.includes(meter.groupMeter.key))
          selectedIds = selectedIds.filter((id) => id !== meter.groupMeter.key);
        if (!state.removedChildrenKey.includes(meter.groupMeter.key)) removedIds.push(meter.groupMeter.key);
      });
      state.selectedMeters = selectedIds;
      state.removedChildrenKey = [...removedIds];
    },

    resetDetailTreeItem: () => {
      return groupControlState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGroupTreeByTypeThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.tree = action.payload;
    });

    builder.addCase(getGroupTreeBySearchThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.tree = action.payload;
    });

    builder.addCase(getGroupTreeWithNewItemByKeyThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.tree = action.payload;
    });

    builder.addCase(getDetailGroupTreeItemThunk.fulfilled, (state, action: PayloadAction<IGroupControlItemData>) => {
      state.detailTreeItem = action.payload;
    });

    builder.addCase(createGroupTreeItemThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.createdItemKey = action.payload.key;
    });

    builder.addCase(getGroupTreeItemMaterIndicatorsListThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.metersList = {
        ...action.payload,
        data: action.payload.data.map((item: any) => {
          if (state.selectedMeters.includes(item.groupMeter.key)) {
            return { ...item, selected: true };
          } else {
            return item;
          }
        }),
      };
    });

    builder.addCase(deleteGroupTreeItemThunk.fulfilled, (state, action: PayloadAction<any>) => {
      const filterTree = (data: any) => {
        return data
          .map((item: any) => {
            if (item.key === action.payload) {
            } else return { ...item, children: filterTree(item.children) };
          })
          .filter(Boolean);
      };
      state.tree = filterTree(state.tree);
    });
  },
});

export const groupControlReducer = groupControlSlice.reducer;

export const { addIdToSelectedList, removeIdFromSelectedList, selectAllMeters, removeAllMeters, resetDetailTreeItem } =
  groupControlSlice.actions;
