import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { operatorsState } from "./operators.state";
import {
  operatorsListThunk,
  operatorsFilteredListThunk,
  templatesListThunk,
  blockUnblockOperatorThunk,
  detailOperatorThunk,
  detailAccessTemplatesThunk,
  deleteOperatorThunk,
  deleteTemplateThunk,
  searchTemplateThunk,
  operatorProfileThunk,
  changeOperatorsRightsThunk,
} from "./operators.thunks";
import {
  IChangeOperatorRightsProps,
  IDetailOperatorProps,
  IDetailTemplateProps,
  IOperatorProfile,
  IOperatorsListItemWithSelect,
  IOperatorsListWithoutSelect,
  ITemplatesProps,
} from "../../../../ts/interfaces/users.interface";

const toggleSelectedFlag = (metersList: Array<IOperatorsListItemWithSelect>, id: string, selectedFlag: boolean) => {
  return metersList.map((m) => {
    if (m.id === id) {
      return {
        ...m,
        selected: selectedFlag,
      };
    } else {
      return m;
    }
  });
};

const operatorsSlice = createSlice({
  name: "operators",
  initialState: operatorsState,
  reducers: {
    selectAllOperators: (state) => {
      let ids: Array<string> = [];
      state.selectedAllOperators = true;
      if (state.operatorsListArr !== null) {
        state.operatorsListArr = {
          ...state.operatorsListArr,
          data: state.operatorsListArr.data.map((m) => {
            ids.push(m.id);
            return { ...m, selected: true };
          }),
        };
      }

      state.metersId = ids;
    },
    removeSelectAllOperators: (state) => {
      state.selectedAllOperators = false;
      state.metersId = [];
      if (state.operatorsListArr !== null) {
        state.operatorsListArr = {
          ...state.operatorsListArr,
          data: state.operatorsListArr.data.map((m) => ({ ...m, selected: false })),
        };
      }
    },

    addOperatorsIdToArr: (state, action: PayloadAction<any>) => {
      state.metersId = [...state.metersId, action.payload];
      if (state.operatorsListArr !== null) {
        state.operatorsListArr = {
          ...state.operatorsListArr,
          data: toggleSelectedFlag(state.operatorsListArr.data, action.payload, true),
        };
      }
    },

    removeOperatorsIdFromArr: (state, action: PayloadAction<any>) => {
      state.metersId = state.metersId.filter((id) => id !== action.payload);
      if (state.operatorsListArr !== null) {
        state.operatorsListArr = {
          ...state.operatorsListArr,
          data: toggleSelectedFlag(state.operatorsListArr.data, action.payload, false),
        };
      }
    },

    resetOperatorsState: () => {
      return operatorsState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(operatorsListThunk.fulfilled, (state, action: PayloadAction<IOperatorsListWithoutSelect>) => {
      if (state.metersId.length > 0) {
        let a = {
          ...action.payload,
          data: action.payload.data.map((m) => {
            const ivan = state.metersId.find((m2: any) => {
              return m2 === m.id;
            });
            if (ivan) {
              return { ...m, selected: true };
            } else {
              return { ...m, selected: false };
            }
          }),
        };
        state.operatorsListArr = a;
      } else {
        state.operatorsListArr = {
          ...action.payload,
          data: action.payload.data.map((m) => ({ ...m, selected: false })),
        };
      }
    });

    builder.addCase(
      operatorsFilteredListThunk.fulfilled,
      (state, action: PayloadAction<IOperatorsListWithoutSelect>) => {
        if (state.metersId.length > 0) {
          let a = {
            ...action.payload,
            data: action.payload.data.map((m) => {
              const ivan = state.metersId.find((m2: any) => {
                return m2 === m.id;
              });
              if (ivan) {
                return { ...m, selected: true };
              } else {
                return { ...m, selected: false };
              }
            }),
          };
          state.operatorsListArr = a;
        } else {
          state.operatorsListArr = {
            ...action.payload,
            data: action.payload.data.map((m) => ({ ...m, selected: false })),
          };
        }
      }
    );

    builder.addCase(blockUnblockOperatorThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.operatorsListArr) return;
      state.operatorsListArr = {
        ...state.operatorsListArr,
        data: state.operatorsListArr?.data.map((operator) => {
          if (operator.id === action.payload) {
            return { ...operator, status: operator.status === "blocked" ? "active" : "blocked" };
          } else return operator;
        }),
      };
    });

    builder.addCase(templatesListThunk.fulfilled, (state, action: PayloadAction<Array<ITemplatesProps>>) => {
      state.templatesList = action.payload;
    });

    builder.addCase(searchTemplateThunk.fulfilled, (state, action: PayloadAction<Array<ITemplatesProps>>) => {
      state.templatesList = action.payload;
    });

    builder.addCase(detailOperatorThunk.fulfilled, (state, action: PayloadAction<IDetailOperatorProps>) => {
      state.detailOperator = action.payload;
    });

    builder.addCase(detailAccessTemplatesThunk.fulfilled, (state, action: PayloadAction<IDetailTemplateProps>) => {
      state.detailTemplate = action.payload;
    });

    builder.addCase(deleteOperatorThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.operatorsListArr) return;
      state.operatorsListArr = {
        ...state.operatorsListArr,
        data: state.operatorsListArr?.data.map((operator) => {
          if (operator.id === action.payload) {
            return { ...operator, status: operator.status === "deactivated" ? "active" : "deactivated" };
          } else return operator;
        }),
      };
    });

    builder.addCase(deleteTemplateThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.templatesList) return;
      state.templatesList = state.templatesList?.filter((template) => template.id !== action.payload);
    });

    builder.addCase(operatorProfileThunk.fulfilled, (state, action: PayloadAction<IOperatorProfile>) => {
      state.operatorProfile = action.payload;
    });

    builder.addCase(changeOperatorsRightsThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (state.operatorsListArr) {
        state.operatorsListArr.data = state.operatorsListArr.data.map((user) => {
          if (action.payload.id.includes(user.id)) {
            return { ...user, privileges: action.payload.privileges };
          } else return user;
        });
      }
    });
  },
});

export const operatorsReducer = operatorsSlice.reducer;

export const {
  selectAllOperators,
  removeSelectAllOperators,
  addOperatorsIdToArr,
  removeOperatorsIdFromArr,
  resetOperatorsState,
} = operatorsSlice.actions;
