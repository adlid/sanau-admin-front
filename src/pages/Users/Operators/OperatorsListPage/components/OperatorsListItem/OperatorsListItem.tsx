import moment from "moment";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import React, { FC, useState, useEffect, memo } from "react";
// icons
import { icons } from "../../../../../../utils/icons/icons";
import { ReactComponent as Pencil } from "../../../../../../assets/imgs/pencil.svg";
import { ReactComponent as Checked } from "../../../../../../assets/imgs/checked.svg";
import { ReactComponent as Blocked } from "../../../../../../assets/imgs/blocked.svg";
import { ReactComponent as Trash } from "../../../../../../assets/imgs/trash.svg";
// redux
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import {
  blockUnblockOperatorThunk,
  deleteOperatorThunk,
} from "../../../../../../store/slicesAndThunks/users/operators/operators.thunks";
// ts
import { IOperatorsListItemWithSelect } from "../../../../../../ts/interfaces/users.interface";

type PropsType = {
  number?: number;
  isScroll: boolean;
  operatorData: IOperatorsListItemWithSelect;
  handleIsScroll: (scroll: boolean) => void;
  addOperatorsIdToArrCallBack: (id: string) => void;
  removeOperatorsIdFromArrCallBack: (id: string) => void;
  openDeleteModal: (id: string) => void;
};

export const OperatorsListItem: FC<PropsType> = memo((props) => {
  const {
    number,
    isScroll,
    operatorData,
    handleIsScroll,

    addOperatorsIdToArrCallBack,
    removeOperatorsIdFromArrCallBack,
    openDeleteModal,
  } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const blockUnblockOperator = async (id: string) => await dispatch(blockUnblockOperatorThunk(id));
  const activateOperator = async (id: string) => await dispatch(deleteOperatorThunk(id));

  useEffect(() => {
    if (isScroll) {
      setIsPopoverOpen(false);
      handleIsScroll(false);
    }
  }, [isScroll]);

  return (
    <>
      <Row
        className="operators-list-item__row"
        onMouseEnter={() => setHoveredItem(true)}
        onMouseLeave={() => setHoveredItem(false)}
        style={{ background: hoveredItem ? "#EBEDEF" : "#FFFFFF" }}
      >
        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
          <input
            onChange={(e) => {
              e.stopPropagation();
              if (e.target.checked) addOperatorsIdToArrCallBack(operatorData.id);
              else removeOperatorsIdFromArrCallBack(operatorData.id);
            }}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            className="checkbox-table"
            checked={operatorData.selected ? true : false}
          />
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id">{number}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id">
            {operatorData.createdAt ? moment(operatorData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
          </p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id word-break">{operatorData.login}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id ellipsis-wrap">{operatorData.fullName}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id ellipsis-wrap">{operatorData.position || "-"}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id word-break">{operatorData.phoneNumber}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id word-break">{operatorData.email}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id ellipsis-wrap_line">
            {operatorData?.privileges.map((right) => right.name + ", ").join("")}
          </p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
          <p className="operators-list-item__id">{"-"}</p>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column d-flex flex-column">
          {/*  deleted, deactivated  */}
          {operatorData.status === "active" && <div className="operators-list-item__active">Активен</div>}
          {operatorData.status === "non-active" && (
            <div className="operators-list-item__notactivated">Не активирован</div>
          )}
          {operatorData.status === "blocked" && <div className="operators-list-item__blocked">Заблокирован</div>}
          {operatorData.status === "deleted" && <div className="operators-list-item__active">Удален</div>}
          {operatorData.status === "deactivated" && <div className="operators-list-item__inactive">Неактивен</div>}
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="table-group__column" style={{ textAlign: "right" }}>
          <Popover
            isOpen={isPopoverOpen}
            padding={10}
            containerClassName="operators-list-item__container "
            positions={["bottom", "left"]}
            onClickOutside={() => {
              setIsPopoverOpen(false);
              setIsActive(false);
            }} // handle click events outside of the popover/target here!
            content={
              <div className="operators-list-item__extra-info">
                <div
                  className="operators-list-item__extra-info_itemBox"
                  onClick={() => history.push(`/admin/users/operators/edit?operatorId=${operatorData.id}`)}
                >
                  <p className="operators-list-item__extra-info_item">
                    <Pencil />
                    Изменить
                  </p>
                </div>

                {operatorData.status === "blocked" || operatorData.status === "deactivated" ? (
                  <div
                    className="operators-list-item__extra-info_itemBox"
                    onClick={() =>
                      operatorData.status === "blocked"
                        ? blockUnblockOperator(operatorData.id)
                        : activateOperator(operatorData.id)
                    }
                  >
                    <p className="operators-list-item__extra-info_item">
                      <Checked />
                      Восстановить
                    </p>
                  </div>
                ) : operatorData.status === "active" ? (
                  <div
                    className="operators-list-item__extra-info_itemBox"
                    onClick={() => blockUnblockOperator(operatorData.id)}
                  >
                    <p className="operators-list-item__extra-info_item">
                      <Blocked />
                      Заблокировать
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="operators-list-item__extra-info_itemBox"
                  onClick={() => openDeleteModal(operatorData.id)}
                >
                  <p className="operators-list-item__extra-info_item">
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
              className="operators-list-item__more"
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
