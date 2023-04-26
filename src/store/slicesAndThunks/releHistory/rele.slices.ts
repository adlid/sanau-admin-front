import { createSlice } from "@reduxjs/toolkit";
import { releHistoryState } from "./rele.state";
import { releHistoryThunk } from "./rele.thunk";

const releHistorySlice = createSlice({
  name: "ss",
  initialState: releHistoryState,
  reducers:{},
  extraReducers(builder) {
    builder.addCase(releHistoryThunk.fulfilled, (state, action: any) => {
        state.history = action.payload;
      });
  },
});


export const releHistoryReducer = releHistorySlice.reducer;