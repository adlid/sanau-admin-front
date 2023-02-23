import moment from "moment";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo } from "react";
// icons
import { icons } from "../../../../../utils/icons/icons";
// ts
import { ConcentratorItemType } from "../../../../../ts/types/lorawanUdpDevice.types";
// redux
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import { setSelectedConcentrator } from "../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";

type PropsType = {
  concentratorData: ConcentratorItemType;
  addIdToArrCallBack: (id: string) => void;
  removeIdFromArrCallBack: (id: string) => void;
  dontShowCheckbox?: boolean;
  toggleSidebar: (state: boolean) => void;
  selectedId: Array<string>;
};

export const ConcentratorLorawanUdpListItem: FC<PropsType> = memo((props) => {
  const { concentratorData, addIdToArrCallBack, removeIdFromArrCallBack, dontShowCheckbox, toggleSidebar, selectedId } =
    props;

  // hooks
  const dispatch = useAppDispatch();

  // state handlers
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Row className="concentrators-list-item__row">
        <Col xl={1} lg={1} md={4} sm={4} className="concentrators-list-item__column table-group__column-checkbox">
          {!dontShowCheckbox && (
            <input
              onChange={(e) => {
                e.stopPropagation();
                if (e.target.checked) addIdToArrCallBack(concentratorData.id);
                else removeIdFromArrCallBack(concentratorData.id);
              }}
              onClick={(e) => e.stopPropagation()}
              type="checkbox"
              className="checkbox-table"
              checked={selectedId.includes(concentratorData.id)}
            />
          )}
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="concentrators-list-item__column">
          <span className="concentrators-list-item__id">{concentratorData.gatewayID || "-"}</span>
        </Col>

        <Col xl={3} lg={3} md={4} sm={4} className="concentrators-list-item__column">
          <span className="concentrators-list-item__id">{concentratorData.name || "-"}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="concentrators-list-item__column">
          <span className="concentrators-list-item__id">{concentratorData.address || "-"}</span>
        </Col>

        <Col xl={2} lg={2} md={4} sm={4} className="concentrators-list-item__column">
          <span className="concentrators-list-item__id">
            {concentratorData.createdAt ? moment(concentratorData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
          </span>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="concentrators-list-item__column">
          <img
            src={hovered ? icons.moreActiveIcon : icons.moreIcon}
            alt="menu"
            className="indication-meters-item__more"
            onClick={() => {
              toggleSidebar(true);
              dispatch(setSelectedConcentrator(concentratorData));
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </Col>
      </Row>
      <hr className="tableDivider" />
    </>
  );
});
