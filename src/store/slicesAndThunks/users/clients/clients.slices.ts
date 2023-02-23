import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientsState } from "./clients.state";
import {
  clientsFilteredListThunk,
  blockUnblockClientThunk,
  detailClientThunk,
  deleteClientThunk,
} from "./clients.thunks";
import { IClientList, IDetailClientProps } from "../../../../ts/interfaces/users.interface";

const clientsSlice = createSlice({
  name: "clients",
  initialState: clientsState,
  reducers: {
    resetClientsState: () => {
      return clientsState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(clientsFilteredListThunk.fulfilled, (state, action: PayloadAction<IClientList>) => {
      state.clientsListArr = action.payload;
    });

    builder.addCase(blockUnblockClientThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.clientsListArr) return;
      state.clientsListArr = {
        ...state.clientsListArr,
        data: state.clientsListArr?.data.map((client) => {
          if (client.id === action.payload) {
            return { ...client, status: client.status === "blocked" ? "active" : "blocked" };
          } else return client;
        }),
      };
    });

    builder.addCase(detailClientThunk.fulfilled, (state, action: PayloadAction<IDetailClientProps>) => {
      state.detailClient = action.payload;
    });

    builder.addCase(deleteClientThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.clientsListArr) return;
      state.clientsListArr = {
        ...state.clientsListArr,
        data: state.clientsListArr?.data.map((client) => {
          if (client.id === action.payload) {
            return { ...client, status: client.status === "deactivated" ? "active" : "deactivated" };
          } else return client;
        }),
      };
    });
  },
});

export const clientsReducer = clientsSlice.reducer;

export const { resetClientsState } = clientsSlice.actions;
