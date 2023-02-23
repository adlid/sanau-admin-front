import { ICreateNewsProps, IEditNewsProps } from "../ts/interfaces/news.interface";
import { instance } from "./axios.instance";

export const newsAPI = {
  newsSearchList: async (searchParams: any) => {
    try {
      return await instance.post(`/news/search?page=${searchParams.pageNum - 1}&size=10`, {
        title: searchParams.title,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  detail: async (id: string) => {
    try {
      return await instance.get(`/news/by/${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  create: async (values: any) => {
    try {
      return await instance.post(`/news/create`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  edit: async (params: any) => {
    try {
      return await instance.put(`/news/edit/${params.id}`, params.values);
    } catch (error: any) {
      throw error.response;
    }
  },

  changeVisibility: async (id: string) => {
    try {
      return await instance.put(`/news/edit/visibility/${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  delete: async (id: string) => {
    try {
      return await instance.post(`/news/delete`, { id: [id] });
    } catch (error: any) {
      throw error.response;
    }
  },
};
