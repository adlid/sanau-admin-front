import { useHistory } from "react-router";
import * as queryString from "querystring";
import React, { useState, useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
//redux
import { newsSearchListThunk } from "../../../store/slicesAndThunks/news/news.thunks";

import { useAppDispatch, useTypedSelector } from "../../../utils/hooks/reduxHooks";
import { INewsListWithPagination } from "../../../ts/interfaces/news.interface";
// components
import { Search } from "../../../components/uiKit/Search";
import { Pagination } from "../../../components/uiKit/Pagination";
import { AddButton } from "../../../components/uiKit/Buttons/AddButton";
import { NewsListItem } from "./components/NewsListItem/NewsListItem";
import { DeleteNewsModal } from "../../../components/uiKit/modals/DeleteNewsModal/DeleteNewsModal";

export const NewsListPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { page }: any = queryString.parse(history.location.search.substring(1));

  const { newsList } = useTypedSelector((state) => state.news);

  const [searchValue, setSearhValue] = useState<string>("");
  const [isScroll, handleIsScroll] = useState<boolean>(false);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);

  const dropFilters = () => {};

  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<any>();
  const openDeleteModal = (newsItem: any) => {
    setSelectedNews(newsItem);
    setDeleteModalOpen(true);
  };

  const getNewsList = async () => {
    setNewsLoading(true);
    await dispatch(newsSearchListThunk({ pageNum: page, title: searchValue }));
    setNewsLoading(false);
  };

  useEffect(() => {
    getNewsList();
  }, [page]);

  return (
    <>
      <DeleteNewsModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} news={selectedNews} />
      <div className="news-list">
        <div className="container_block">
          <h2 className="container_block__title">Управление новостями</h2>
          <div className="news-list__search-block">
            <div style={{ display: "flex", width: "100%" }}>
              <Search
                placeholder="Заголовок новости"
                value={searchValue}
                onChange={(value: string) => setSearhValue(value)}
                onEnterPress={getNewsList}
              />
            </div>

            <AddButton
              title="Добавить"
              style={{ width: 123, height: 40, fontSize: 14 }}
              onClick={() => history.push("/admin/news/create")}
            />
          </div>

          <div className="news-list__table-block">
            <Row className="news-list__table-group">
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="news-list__card-title" style={{ paddingLeft: "15px" }}>№</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="news-list__card-title">Дата создания</span>
              </Col>
              <Col xl={8} lg={7} md={4} sm={4} className="table-group__column">
                <span className="news-list__card-title">Заголовок</span>
              </Col>
              <Col xl={1} lg={2} md={4} sm={4} className="table-group__column" style={{ textAlign: "center" }}>
                <span className="news-list__card-title"> </span>
              </Col>
            </Row>
            <hr className="tableHeaderLine" />

            <div className="news-list__wrap" onScroll={() => handleIsScroll(true)}>
              {!newsList?.data.length || newsList === null ? (
                newsLoading ? (
                  <div className="news-list__preloader">
                    <Spinner animation="border" size="sm" />
                  </div>
                ) : (
                  <div className="news-list__preloader">
                    <p>Список пуст</p>
                  </div>
                )
              ) : (
                newsList.data.map((news, index) => {
                  return (
                    <NewsListItem
                      key={news.id}
                      number={page == 1 ? index + 1 : (page - 1 )* 10 + (index + 1)}
                      isScroll={isScroll}
                      handleIsScroll={handleIsScroll}
                      newsData={news}
                      openDeleteModal={openDeleteModal}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="indication-meters-list__pagination">
            <Pagination
              page={page !== undefined ? +page : 1}
              totalPage={newsList?.totalPage || 0}
              onPageChanged={(page) => history.push({ search: `?page=${page}` })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
