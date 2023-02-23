import React, {FC, useEffect, useMemo} from "react";
import {Col, Row,} from "react-bootstrap";
import {useAppDispatch, useTypedSelector} from "../../../../../utils/hooks/reduxHooks";
import {
    removeSelectAllMeters,
    selectAllMeters
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import {findByKeyInGroup} from '../../../../../utils/groupControl/findByKeyInGroup'
import { ConcencatorPowerCountersChildrenListItem } from "../ConcentratorPowerCountersChildrenListItem/ConcentratorPowerCountersChildrenListItem";
import { addKeyToFolders, removeKeyFromFolder, setSelectedAllReport } from "../../../../../store/slicesAndThunks/reports/reports.slices";
import * as queryString from "querystring";
import { useHistory } from "react-router";

interface IProps {
    index: number
    keyOfTree?: string
}

export const ConcentratorPowerCountersChildren: FC<IProps> = ({index, keyOfTree}) => {
    // hooks
    const dispatch = useAppDispatch();
    const {tree} = useTypedSelector(state => state.groupsControl)
    
    const computePowerCounter = useMemo(() => {
        if(tree[index].key === keyOfTree) return tree[index]
        return findByKeyInGroup(tree, keyOfTree as string)
    }, [tree, keyOfTree, index])

    useEffect(() => {
        return () => {
            dispatch(removeSelectAllMeters())
            dispatch(setSelectedAllReport(false))
        }
    }, [])

  const history = useHistory();
  const { id }: any = queryString.parse(history.location.search.substring(1));


    return (
        <div className="reports__table-block">
            <Row className="reports__table-group">
                <Col xl={2} lg={2} md={4} sm={4}>
                    <input
                        type="checkbox"
                        className="checkbox-table"
                        onChange={(e) => {
                            if (e.target.checked) {
                                dispatch(selectAllMeters())
                                dispatch(setSelectedAllReport(true))
                                dispatch(addKeyToFolders(id as string))
                            }
                            else {
                                dispatch(removeSelectAllMeters())
                                dispatch(setSelectedAllReport(false))
                                dispatch(removeKeyFromFolder(id as string))
                            }
                        }}
                    />
                    <span style={{ marginLeft: "20px" }}>№</span>
                </Col>

                <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
                    <span className="reports__card-title">Наименование</span>
                </Col>
                <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                    <span className="reports__card-title">Контрагент</span>
                </Col>
                <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                    <span className="reports__card-title">Лицевой счет</span>
                </Col>
                <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                    <span className="reports__card-title">Активный</span>
                </Col>
            </Row>
            <hr className="tableHeaderLine"/>

            <div className="reports__wrap">
                {!tree[index].children?.length || !tree[index].children ? (
                    <div className="reports__preloader">
                        <p>Список пуст</p>
                    </div>
                ) : (
                    //@ts-ignore
                    computePowerCounter!.children.map((item, index) => {
                        return <ConcencatorPowerCountersChildrenListItem counterItem={item} index={index + 1}/>
                    })
                )
                }
            </div>
        </div>
    );
};
