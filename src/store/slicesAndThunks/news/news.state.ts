import { IDetailNewsProps, INewsListWithPagination } from "../../../ts/interfaces/news.interface";

type NewsStateType = {
  newsList: INewsListWithPagination | null;
  detailNews: IDetailNewsProps | null;
};

export const newsState: NewsStateType = {
  newsList: null,
  detailNews: null,
};
