import moment from "moment";
import parse from "html-react-parser";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import React, { FC, useState, useEffect, memo } from "react";
// redux
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import { INewsListItem } from "../../../../../ts/interfaces/news.interface";
import { changeVisibilityNewsThunk } from "../../../../../store/slicesAndThunks/news/news.thunks";
// icons
import { icons } from "../../../../../utils/icons/icons";
import { ReactComponent as Eye } from "../../../../../assets/imgs/eye.svg";
import { ReactComponent as Trash } from "../../../../../assets/imgs/trash.svg";
import { ReactComponent as Pencil } from "../../../../../assets/imgs/pencil.svg";

type PropsType = {
  number?: number;
  isScroll: boolean;
  newsData: INewsListItem;
  handleIsScroll: (scroll: boolean) => void;
  openDeleteModal: (newsItem: any) => void;
};

export const NewsListItem: FC<PropsType> = memo((props) => {
  const { number, isScroll, newsData, handleIsScroll, openDeleteModal } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const changeVisibility = async () => {
    await dispatch(changeVisibilityNewsThunk(newsData.id));
  };

  useEffect(() => {
    if (isScroll) {
      setIsPopoverOpen(false);
      handleIsScroll(false);
    }
  }, [isScroll]);

  return (
    <>
      <Row
        className="news-list-item__row"
        onMouseEnter={() => setHoveredItem(true)}
        onMouseLeave={() => setHoveredItem(false)}
        style={{ background: hoveredItem ? "#EBEDEF" : "#FFFFFF" }}
      >
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="news-list-item__id" style={{ paddingLeft: "15px" }}>
            {number}
          </p>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <p className="news-list-item__id">
            {newsData.created_at ? moment(newsData.created_at).format("DD.MM.YYYY HH:mm") : "-"}
          </p>
        </Col>

        <Col xl={8} lg={8} md={4} sm={4} className="table-group__column">
          <div className="news-list-item__id news_body" style={{ color: !newsData.visible ? "red" : "#3c4b64" }}>
            {newsData.title}
          </div>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "center" }}>
          <Popover
            isOpen={isPopoverOpen}
            padding={10}
            containerClassName="news-list-item__container "
            positions={["bottom", "left"]}
            onClickOutside={() => {
              setIsPopoverOpen(false);
              setIsActive(false);
            }} // handle click events outside of the popover/target here!
            content={
              <div className="news-list-item__extra-info">
                <div
                  className="news-list-item__extra-info_itemBox"
                  onClick={() => history.push(`/admin/news/edit?newsId=${newsData.id}`)}
                >
                  <p className="news-list-item__extra-info_item">
                    <Pencil />
                    Изменить
                  </p>
                </div>
                <div className="news-list-item__extra-info_itemBox" onClick={changeVisibility}>
                  <p className="news-list-item__extra-info_item">
                    <Eye />
                    {newsData.visible ? "Скрыть" : "Показать"}
                  </p>
                </div>
                <div className="news-list-item__extra-info_itemBox" onClick={() => openDeleteModal(newsData)}>
                  <p className="news-list-item__extra-info_item">
                    <Trash />
                    Удалить
                  </p>
                </div>
              </div>
            }
          >
            <img
              src={hovered ? icons.moreActiveIcon : isActive ? icons.moreActiveIcon : icons.moreIcon}
              alt="alt"
              className="news-list-item__more"
              onClick={(e) => {
                e.stopPropagation();
                setIsPopoverOpen(true);
                setIsActive(true);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </Popover>
        </Col>
      </Row>
      <hr
        style={{
          height: 1,
          margin: 0,
          backgroundColor: "#D7E2F2",
          border: "none",
        }}
      />
    </>
  );
});
