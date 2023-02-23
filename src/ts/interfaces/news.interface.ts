import { DateType } from "../types/indication.types";

export interface INewsFilterProps {
  status: string[];
  privileges: string[];
  createFrom: DateType;
  createTo: DateType;
  query: string;
}
export interface INewsListProps {
  options: INewsFilterProps;
  sortBy: string;
  page: number;
}

export interface IDetailNewsProps {
  id: string;
  visible: boolean;
  titleImageURL: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface IEditNewsProps extends ICreateNewsProps {
  id: string;
}

export interface ICreateNewsProps {
  title: string;
  text: string;
  imagesName: string;
}

export interface INewsListItem {
  id: string;
  visible: boolean;
  titleImageURL: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface INewsList {
  elementSize: number;
  hasNext: false;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
}

export interface INewsListWithPagination extends INewsList {
  data: Array<INewsListItem>;
}
