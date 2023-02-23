import moment from "moment";
import { Drawer } from "@material-ui/core";
import React, { FC, useRef, useState } from "react";
// components
import { GroupItemSideBar } from "./GroupItemSideBar/GroupItemSideBar";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { AddButton } from "../../../../../../../components/uiKit/Buttons/AddButton";
import { useHistory } from "react-router";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { uploadUSPDExcelThunk } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { syncGprsMetersDynamic } from "../../../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";

type PropsType = {
  selectedGroup: any;
  filterRef?: any;
  type?: "DIRECT" | "DYNAMIC"
};

export const GroupDetailListHeader: FC<PropsType> = (props) => {
  const { selectedGroup, filterRef, type } = props;

  const history = useHistory();
  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    let formData = new FormData();

    formData.append('file', fileObj)
    formData.append('type', 'GPRS')

    dispatch(uploadUSPDExcelThunk(formData))
  }

  const { isExcelLoading } = useTypedSelector(state => state.powerMeterTransmissionDeviceConcentrator)
  const { GPRSloading } = useTypedSelector(state => state.powerMeterGPRSMeter)

  return (
    <>
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <GroupItemSideBar close={sideBarToggle(false)} />
        </div>
      </Drawer>

      <div className="power-gprs-detail-list-header" ref={filterRef}>
        {!selectedGroup && (
          <div className="d-flex justify-content-between align-items-center">
            <span className="power-gprs-detail-list-header__title">Группа не выбрана</span>
          </div>
        )}

        {selectedGroup && (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="power-gprs-detail-list-header__title">{selectedGroup.name}</span>
              <div>
                <span className="power-gprs-detail-list-header__subtitle">
                  Последняя активность: {moment().format("DD.MM.YYYY HH:mm")}
                </span>
                <span className="link link--active link--no-line" onClick={sideBarToggle(true)}>
                  Подробнее
                </span>
              </div>
            </div>

            {(type && type === 'DYNAMIC') ?

              <div style={{ display: "flex" }}>
                <MainButton
                  title="Синхронизировать"
                  style={{ width: 200, height: 40, fontSize: 14 }}
                  onClick={() => dispatch(syncGprsMetersDynamic())}
                  fetching={GPRSloading}
                  isDisabled={GPRSloading}
                />
              </div>
              :
              <div style={{ display: "flex" }}>
                <input
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                />
                <MainButton
                  title="Импорт данных из Excel"
                  style={{ width: 200, height: 40, fontSize: 14 }}
                  onClick={handleClick}
                  fetching={isExcelLoading}
                  isDisabled={isExcelLoading}
                />
                {/* <MainButton isSecondary title="Импорт данных из Excel" style={{ width: 220, height: 40, fontSize: 14 }} /> */}
                <div className="mr12px"></div>
                <AddButton
                  title="Добавить ПУ"
                  style={{ width: 146, height: 40, fontSize: 14 }}
                  onClick={() => history.push("/admin/concentrators/power-meter/add-concentrator/connection-by-gprs")}
                />
              </div>}
          </div>
        )}
      </div>
    </>
  );
};
