import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import React, { FC, useState, useEffect, memo } from "react";
// icons
import { icons } from "../../../../../../utils/icons/icons";
import { ReactComponent as Trash } from "../../../../../../assets/imgs/trash.svg";
import { ReactComponent as Pencil } from "../../../../../../assets/imgs/pencil.svg";
import { ReactComponent as Checked } from "../../../../../../assets/imgs/checked.svg";
import { ReactComponent as Blocked } from "../../../../../../assets/imgs/blocked.svg";
// ts
import { IDetailClientProps } from "../../../../../../ts/interfaces/users.interface";
// redux
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import {
  blockUnblockClientThunk,
  deleteClientThunk,
} from "../../../../../../store/slicesAndThunks/users/clients/clients.thunks";

type PropsType = {
  number?: number;
  isScroll: boolean;
  clientData: IDetailClientProps;
  handleIsScroll: (scroll: boolean) => void;
  openDeleteModal: (id: string) => void;
};

export const ClientsListItem: FC<PropsType> = memo((props) => {
  const { number, isScroll, clientData, handleIsScroll, openDeleteModal } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const blockUnblockClient = async (id: string) => await dispatch(blockUnblockClientThunk(id));
  const activateClient = async (id: string) => await dispatch(deleteClientThunk(id));

  useEffect(() => {
    if (isScroll) {
      setIsPopoverOpen(false);
      handleIsScroll(false);
    }
  }, [isScroll]);

  return (
    <>
      <Row
        className="clients-list-item__row"
        onMouseEnter={() => setHoveredItem(true)}
        onMouseLeave={() => setHoveredItem(false)}
        style={{ background: hoveredItem ? "#EBEDEF" : "#FFFFFF" }}
      >
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ paddingLeft: "30px" }}>
          <p className="clients-list-item__id">{number}</p>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <p className="clients-list-item__id">
            {clientData.createdAt ? moment(clientData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
          </p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="clients-list-item__id ellipsis-wrap">{clientData.roleName || "-"}</p>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <p className="clients-list-item__id word-break ellipsis-wrap">{clientData.fullName || "-"}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="clients-list-item__id word-break">{clientData.personalAccountNumber || "-"}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ wordWrap: "break-word" }}>
          <p className="clients-list-item__id word-break">{clientData.phoneNumber || "-"}</p>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
          <p className="clients-list-item__id ellipsis-wrap">{clientData.email || "-"}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column d-flex flex-column">
          {/*  deleted, deactivated  */}
          {clientData.status === "active" && <div className="clients-list-item__active">Активен</div>}
          {clientData.status === "non-active" && <div className="clients-list-item__notactivated">Не активирован</div>}
          {clientData.status === "blocked" && <div className="clients-list-item__blocked">Заблокирован</div>}
          {clientData.status === "deleted" && <div className="clients-list-item__active">Удален</div>}
          {clientData.status === "deactivated" && <div className="clients-list-item__inactive">Неактивен</div>}
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "right" }}>
          <Popover
            isOpen={isPopoverOpen}
            padding={10}
            containerClassName="clients-list-item__container "
            positions={["bottom", "left"]}
            onClickOutside={() => {
              setIsPopoverOpen(false);
              setIsActive(false);
            }} // handle click events outside of the popover/target here!
            content={
              <div className="clients-list-item__extra-info">
                <div
                  className="clients-list-item__extra-info_itemBox"
                  onClick={() =>
                    history.push(
                      `/admin/users/clients/edit/${clientData.roleName === "ФЛ" ? "FL" : "YL"}?clientId=${
                        clientData.id
                      }`
                    )
                  }
                >
                  <p className="clients-list-item__extra-info_item">
                    <Pencil />
                    Изменить
                  </p>
                </div>
                {clientData.status === "blocked" || clientData.status === "deactivated" ? (
                  <div
                    className="clients-list-item__extra-info_itemBox"
                    onClick={() =>
                      clientData.status === "blocked"
                        ? blockUnblockClient(clientData.id)
                        : activateClient(clientData.id)
                    }
                  >
                    <p className="clients-list-item__extra-info_item">
                      <Checked />
                      Восстановить
                    </p>
                  </div>
                ) : clientData.status === "active" ? (
                  <div
                    className="clients-list-item__extra-info_itemBox"
                    onClick={() => blockUnblockClient(clientData.id)}
                  >
                    <p className="clients-list-item__extra-info_item">
                      <Blocked />
                      Заблокировать
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="clients-list-item__extra-info_itemBox" onClick={() => openDeleteModal(clientData.id)}>
                  <p className="clients-list-item__extra-info_item">
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
              className="clients-list-item__more"
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
      <hr className="tableDivider" />
    </>
  );
});
