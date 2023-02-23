import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import { icons } from "../../../../utils/icons/icons";
import React, { FC, useState, useEffect, memo } from "react";

import { ReactComponent as Trash } from "../../../../assets/imgs/trash.svg";
import { ReactComponent as Pencil } from "../../../../assets/imgs/pencil.svg";

import { ITemplatesProps } from "../../../../ts/interfaces/users.interface";

type PropsType = {
  number?: number;
  isScroll: boolean;
  templateData: ITemplatesProps;
  handleIsScroll: (scroll: boolean) => void;
  openDeleteModal: (template: any) => void;
};

export const AccessTemplateListItem: FC<PropsType> = memo((props) => {
  const { number, isScroll, templateData, handleIsScroll, openDeleteModal } = props;
  const history = useHistory();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isScroll) {
      setIsPopoverOpen(false);
      handleIsScroll(false);
    }
  }, [isScroll]);

  return (
    <>
      <Row
        className="templates-list-item__row"
        onMouseEnter={() => setHoveredItem(true)}
        onMouseLeave={() => setHoveredItem(false)}
        style={{ background: hoveredItem ? "#EBEDEF" : "white" }}
      >
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <span className="templates-list-item__id">{number}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <span className="templates-list-item__id">
            {templateData.createdAt ? moment(templateData.createdAt).format("DD.MM.YYYY") : "-"}
          </span>
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
          <span className="templates-list-item__id">{templateData.name}</span>
        </Col>

        <Col xl={5} lg={5} md={4} sm={4} className="table-group__column">
          <p
            className="templates-list-item__id"
            style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {templateData.privileges
              .map((right) => {
                return right.name + ", ";
              })
              .join("")}
          </p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "right" }}>
          <Popover
            isOpen={isPopoverOpen}
            padding={10}
            containerClassName="templates-list-item__container "
            positions={["bottom", "left"]}
            onClickOutside={() => {
              setIsPopoverOpen(false);
              setIsActive(false);
            }} // handle click events outside of the popover/target here!
            content={
              <div className="templates-list-item__extra-info">
                <div
                  className="templates-list-item__extra-info_itemBox"
                  onClick={() => history.push(`/admin/users/access-templates/edit?templateId=${templateData.id}`)}
                >
                  <p className="templates-list-item__extra-info_item">
                    <Pencil />
                    Изменить
                  </p>
                </div>

                <div className="templates-list-item__extra-info_itemBox" onClick={() => openDeleteModal(templateData)}>
                  <p className="templates-list-item__extra-info_item">
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
              className="templates-list-item__more"
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
