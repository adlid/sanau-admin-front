import moment from "moment";
import { FC, useState } from "react";
import { Drawer } from "@material-ui/core";
//ts
import { ConcentratorItemType } from "../../../../../../ts/types/dataTransmissionsDevice.types";

type PropsType = {
  toggleIsSidebarOpen: (bool: boolean) => void;
  isSidebarOpen: boolean;
  selectedConcentrator: ConcentratorItemType;
};

export const ConcentratorUspdItemSidebar: FC<PropsType> = (props) => {
  const { isSidebarOpen, toggleIsSidebarOpen, selectedConcentrator } = props;

  return (
    <div className="concentrator-uspd-item-sidebar">
      <Drawer
        anchor={"right"}
        open={isSidebarOpen}
        onClose={() => toggleIsSidebarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div className="concentrator-uspd-item-sidebar-sidebar">
          <div className="concentrator-uspd-item-sidebar-sidebar__top">
            <svg
              onClick={() => toggleIsSidebarOpen(false)}
              className="concentrator-uspd-item-sidebar-sidebar__close"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
                fill="#253D51"
              />
            </svg>

            <h2 className="concentrator-uspd-item-sidebar-sidebar__title">
              {selectedConcentrator.name || selectedConcentrator.ip}
            </h2>
            <h3 className="concentrator-uspd-item-sidebar-sidebar__subtitle">Информация</h3>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Сетевой адрес</span>
            <span>{selectedConcentrator.ethernetIp}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>IP</span>
            <span>{selectedConcentrator.ip}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Порт</span>
            <span>{selectedConcentrator.port}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Город</span>
            <span>{selectedConcentrator.city}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Адрес</span>
            <span>{selectedConcentrator.address}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Создано</span>
            <span>
              {selectedConcentrator.createdAt ? moment(selectedConcentrator.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
            </span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Последняя активность</span>
            <span>
              {selectedConcentrator.lastFixDate
                ? moment(selectedConcentrator.lastFixDate).format("DD.MM.YYYY HH:mm")
                : "-"}
            </span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Расписание автоматического запроса</span>
            <span> {selectedConcentrator.schedule}</span>
          </div>

          <div className="concentrator-uspd-item-sidebar-sidebar__block">Сервер АСКУЭ</div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>IP</span>
            <span>{selectedConcentrator.domainIp}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Сетевой адрес</span>
            <span>{selectedConcentrator.domainPort}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__block">APN</div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Наименование</span>
            <span>{selectedConcentrator.apnName}</span>
          </div>
          <div className="concentrator-uspd-item-sidebar-sidebar__item">
            <span>Имя пользователя</span>
            <span>{selectedConcentrator.apnUsername}</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
