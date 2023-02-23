import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo } from "react";
// icons
import {OrganizationTree} from "../../../../../ts/types/groupcontrol.types";
import { useDispatch } from "react-redux";
import { addKeyToFolders, removeKeyFromFolder } from "../../../../../store/slicesAndThunks/reports/reports.slices";
import { useTypedSelector } from "../../../../../utils/hooks/reduxHooks";

type PropsType = {
  concentratorData: OrganizationTree;
  setSelectedGatewayFunc: (id: string, index: number) => void;
  index: number
  depthIndex?: number
  key: string | number
};

//@ts-ignore
export const ConcentratorWaterCounterListItem: FC<PropsType> = (props) => {
  const { key, concentratorData, setSelectedGatewayFunc, index, depthIndex } = props;
  
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    if(concentratorData.children?.some(child => child.unitedMeter)) return setSelectedGatewayFunc(concentratorData.key as string, index)
    setOpen(!open)
  }
  
  const computeConcentratorWaterCounterListItem = () => {
    return concentratorData.children && concentratorData.children
    .map((child, i) => <ConcentratorWaterCounterListItem concentratorData={child} key={i} 
    setSelectedGatewayFunc={setSelectedGatewayFunc} index={index} depthIndex={(+depthIndex! ? +Number(depthIndex!) : 0) + 1}/>)
  }

  const dispatch = useDispatch();
  const {selectedFolders} = useTypedSelector((state) => state.reports);

  return (
    <>
      <Row className="concentrators-list-item__row" style={{
        paddingLeft: depthIndex && depthIndex * 20
      }}>
         <Col
          xl={1}
          lg={1}
          md={1}
          sm={1}
          className="concentrators-list-item__column"
        >
          <input 
            type="checkbox"
            className="checkbox-table"
            checked={selectedFolders.includes(concentratorData.key as string)}
            onChange={(e) => {
                if (e.target.checked) dispatch(addKeyToFolders(concentratorData.key as string));
                else dispatch(removeKeyFromFolder(concentratorData.key as string));
            }}
          />
        </Col>
        <Col
          xl={3}
          lg={3}
          md={4}
          sm={4}
          onClick={handleClick}
          className="concentrators-list-item__column"
        >
          <span className="concentrators-list-item__id">
            {concentratorData.title}
          </span>
        </Col>

        <Col
          xl={3}
          lg={3}
          md={4}
          sm={4}
          className="concentrators-list-item__column"
          onClick={handleClick}
        >
          <span className="concentrators-list-item__id">{Number(concentratorData.inactiveMeters) + Number(concentratorData.activeMeters)}</span>
        </Col>
      </Row>
      {
        open && concentratorData && concentratorData.children && computeConcentratorWaterCounterListItem()
      }
      <hr className="tableDivider" />
    </>
  );
}