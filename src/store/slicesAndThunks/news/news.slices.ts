import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newsState } from "./news.state";
import { newsSearchListThunk, detailNewsThunk, deleteNewsThunk, changeVisibilityNewsThunk } from "./news.thunks";
import { IDetailNewsProps, INewsListWithPagination } from "../../../ts/interfaces/news.interface";

const newsSlice = createSlice({
  name: "news",
  initialState: newsState,
  reducers: {
    resetNewsState: () => {
      return newsState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(newsSearchListThunk.fulfilled, (state, action: PayloadAction<INewsListWithPagination>) => {
      state.newsList = action.payload;
    });

    builder.addCase(detailNewsThunk.fulfilled, (state, action: PayloadAction<IDetailNewsProps>) => {
      state.detailNews = action.payload;
    });

    builder.addCase(deleteNewsThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.newsList) return;
      state.newsList = {
        ...state.newsList,
        data: state.newsList?.data.filter((news) => news.id !== action.payload),
      };
    });

    builder.addCase(changeVisibilityNewsThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.newsList) return;
      state.newsList = {
        ...state.newsList,
        data: state.newsList?.data.map((news) => {
          if (news.id === action.payload) {
            return { ...news, visible: !news.visible };
          } else {
            return { ...news };
          }
        }),
      };
    });
  },
});

export const newsReducer = newsSlice.reducer;

export const { resetNewsState } = newsSlice.actions;
