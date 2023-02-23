import {Drawer} from "@material-ui/core";
import {Col, Row} from "react-bootstrap";
import React, {FC, useState, memo, Fragment} from "react";
// icons
import {icons} from "../../../../../utils/icons/icons";
import {useAppDispatch} from "../../../../../utils/hooks/reduxHooks";
import {
    addMetersIdToArr,
    removeMetersIdFromArr,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import {AccordionSidebar} from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByTransmissionDevice/components/ConcentratorDetailListAccordion/AccordionSidebar";
import {ReactComponent as Checked} from "../../../../../assets/imgs/checked.svg";
import {ReactComponent as NotChecked} from "../../../../../assets/imgs/notChecked.svg";

type PropsType = {
    counterItem: any;
    index: number
};

export const ConcencatorWaterCountersChildrenListItem: FC<PropsType> = memo((props) => {
    const {counterItem, index} = props;

    const dispatch = useAppDispatch();
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

    const addMetersIdToArrCallBack = (item: any) => {
        if(item.unitedMeter && item.unitedMeter.waterMeter && item.unitedMeter.waterMeter.id) {
            return dispatch(addMetersIdToArr(item.unitedMeter.waterMeter.id))
        }
        return dispatch(addMetersIdToArr(item.key))
    };

    const removeMetersIdFromArrCallBack = (item: any) => {
        if(item.unitedMeter && item.unitedMeter.waterMeter && item.unitedMeter.waterMeter.id) {
            return dispatch(removeMetersIdFromArr(item.unitedMeter.waterMeter.id))
        }
        return dispatch(removeMetersIdFromArr(item.key))
    };

    return (
        <Fragment key={index}>
            <Drawer
                anchor={"right"}
                open={sideBarOpen}
                onClose={() => setSideBarOpen(false)}
                classes={{paper: "table-drawer"}}
            >
                <div style={{width: "450px", height: "100%"}}>
                    <AccordionSidebar meter={counterItem} close={() => setSideBarOpen(false)}/>
                </div>
            </Drawer>
            <div className="accordion-item ">
                <Row className="accordion-item__header " style={{maxWidth: "100%"}}>
                    <Col xl={2} lg={2} md={4} sm={4}>
                        <input
                            type="checkbox"
                            className="checkbox-table"
                            onChange={(e) => {
                                e.stopPropagation();
                                if (e.target.checked) addMetersIdToArrCallBack(counterItem);
                                else removeMetersIdFromArrCallBack(counterItem);
                            }}
                        />
                        <span style={{marginLeft: "20px"}}>{index}</span>
                    </Col>

                    <Col xl={2} lg={2} md={4} sm={4}>
                        {
                            counterItem.title
                        }
                    </Col>

                    <Col xl={2} lg={2} md={4} sm={4}>
                        {counterItem.unitedMeter.waterMeter && counterItem.unitedMeter.waterMeter.userInfo && counterItem.unitedMeter.waterMeter.userInfo.roleName
                            ? counterItem.unitedMeter.waterMeter.userInfo.roleName === "ROLE_USER"
                                ? "Физ. лицо"
                                : "Юр. лицо"
                            : "-"}
                    </Col>

                    <Col xl={2} lg={2} md={4} sm={4}>
                        {counterItem.unitedMeter.waterMeter.serial || '-'}
                    </Col>

                    <Col xl={1} lg={1} md={4} sm={4}>
                        {counterItem.unitedMeter.active ? <Checked/> : <NotChecked/>}
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
});
