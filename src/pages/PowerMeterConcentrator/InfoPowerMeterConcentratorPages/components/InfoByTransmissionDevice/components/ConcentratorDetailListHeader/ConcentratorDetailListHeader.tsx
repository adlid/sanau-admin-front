import { FC, useRef, useState } from "react";
import { Drawer } from "@material-ui/core";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { Popover } from "react-tiny-popover";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { AddButton } from "../../../../../../../components/uiKit/Buttons/AddButton/AddButton";

//ts
import { ConcentratorItemType } from "../../../../../../../ts/types/dataTransmissionsDevice.types";
import { DateType } from "../../../../../../../ts/types/indication.types";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { uploadUSPDExcelThunk } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

type PropsType = {
  toggleDeleteConcentratorPopup: (deleteConcentratorPopup: boolean) => void;
  toggleActivateConcentratorPopup: (activeConcentratorPopup: boolean) => void;
  toggleResetConcentratorPopup: (bool: boolean) => void;
  getSidebarConcentratorDateCallback: () => void;
  setSelectedConcentratorSchedule: () => void;
  toggleChangeConcentratorDatePopup: (bool: boolean) => void;
  toggleIsSidebarOpen: (bool: boolean) => void;
  isConcentratorSelected: boolean;
  isSidebarOpen: boolean;
  selectedConcentrator: ConcentratorItemType | null;
  sideBarConcentratorDate: DateType | null;
  filterRef?: any;
};

export const ConcentratorDetailListHeader: FC<PropsType> = ({
  toggleDeleteConcentratorPopup,
  toggleActivateConcentratorPopup,
  setSelectedConcentratorSchedule,
  toggleResetConcentratorPopup,
  getSidebarConcentratorDateCallback,
  toggleChangeConcentratorDatePopup,
  toggleIsSidebarOpen,
  isConcentratorSelected,
  selectedConcentrator,
  sideBarConcentratorDate,
  isSidebarOpen,
  filterRef,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const [isSidebarOpen, toggleIsSidebarOpen] = useState(false);
  const history = useHistory();
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
    formData.append('type', 'USPD')

    dispatch(uploadUSPDExcelThunk(formData))
  }

  const { isExcelLoading } = useTypedSelector(state => state.powerMeterTransmissionDeviceConcentrator)

  return (
    <div className="concentrator-detail-list-header" ref={filterRef}>
      {isConcentratorSelected && selectedConcentrator !== null && (
        <Drawer
          anchor={"right"}
          open={isSidebarOpen}
          onClose={() => toggleIsSidebarOpen(false)}
          classes={{ paper: "table-drawer" }}
        >
          <div className="concentrator-detail-list-header-sidebar">
            <div className="concentrator-detail-list-header-sidebar__top">
              <svg
                onClick={() => toggleIsSidebarOpen(false)}
                className="concentrator-detail-list-header-sidebar__close"
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

              <h2 className="concentrator-detail-list-header-sidebar__title">{selectedConcentrator.name}</h2>
              <h3 className="concentrator-detail-list-header-sidebar__subtitle">Информация</h3>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Сетевой адрес</span>
              <span>123.123.123.123</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>IP</span>
              <span>{selectedConcentrator.ip}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Порт</span>
              <span>{selectedConcentrator.port}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Город</span>
              <span>{selectedConcentrator.city}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Адрес</span>
              <span>{selectedConcentrator.address}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Создано</span>
              <span>
                {selectedConcentrator.createdAt
                  ? moment(selectedConcentrator.createdAt).format("DD.MM.YYYY HH:mm")
                  : "-"}
              </span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Дата и время</span>

              {sideBarConcentratorDate !== null && (
                <span>
                  <span>
                    {sideBarConcentratorDate ? moment(sideBarConcentratorDate).format("DD.MM.YYYY HH:mm") : "-"}
                  </span>
                  <span
                    className="link link--active"
                    onClick={() => {
                      toggleChangeConcentratorDatePopup(true);
                      toggleIsSidebarOpen(false);
                    }}
                  >
                    Изменить
                  </span>
                </span>
              )}
              {sideBarConcentratorDate === null && (
                <span className="link link--active" onClick={() => getSidebarConcentratorDateCallback()}>
                  Запросить
                </span>
              )}
            </div>

            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Последняя активность</span>
              <span>
                {selectedConcentrator.lastFixDate
                  ? moment(selectedConcentrator.lastFixDate).format("DD.MM.YYYY HH:mm")
                  : "-"}
              </span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Расписание автоматического запроса</span>
              <span> {selectedConcentrator.schedule}</span>
            </div>

            <div className="concentrator-detail-list-header-sidebar__block">Сервер АСКУЭ</div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>IP</span>
              <span>{selectedConcentrator.domainIp}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Порт</span>
              <span>{selectedConcentrator.domainPort}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__block">APN</div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Наименование</span>
              <span>{selectedConcentrator.apnName}</span>
            </div>
            <div className="concentrator-detail-list-header-sidebar__item">
              <span>Имя пользователя</span>
              <span>{selectedConcentrator.apnUsername}</span>
            </div>

            <div className="concentrator-detail-list-header-sidebar__footer d-flex">
              <MainButton
                title="Изменить"
                style={{ width: 126, height: 40, fontSize: 14 }}
                onClick={() => {
                  setSelectedConcentratorSchedule();
                  history.push("/admin/concentrators/power-meter/edit/connection-by-transmission-device");
                }}
              />
              <div className="mr16px"></div>

              <Popover
                isOpen={isPopoverOpen}
                positions={["bottom", "right"]}
                padding={19}
                onClickOutside={() => {
                  setIsPopoverOpen(false);
                }}
                containerClassName="concentrator-detail-popover__container-sidebar"
                content={
                  <div className="accordion-popover">
                    {!selectedConcentrator.active && (
                      <div
                        className="accordion-popover__item"
                        onClick={(e) => {
                          toggleIsSidebarOpen(false);
                          setIsPopoverOpen(false);
                          toggleActivateConcentratorPopup(true);
                          e.stopPropagation();
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.2C4.24446 1.2 1.2 4.24446 1.2 8C1.2 11.7555 4.24446 14.8 8 14.8C11.7555 14.8 14.8 11.7555 14.8 8C14.8 4.24446 11.7555 1.2 8 1.2ZM7 9.15147L10.5757 5.57574C10.8101 5.34142 11.1899 5.34142 11.4243 5.57574C11.6373 5.78875 11.6566 6.12208 11.4824 6.35697L11.4243 6.42426L7.42426 10.4243C7.21125 10.6373 6.87792 10.6566 6.64303 10.4824L6.57574 10.4243L4.57574 8.42426C4.34142 8.18995 4.34142 7.81005 4.57574 7.57574C4.78875 7.36272 5.12208 7.34336 5.35697 7.51764L5.42426 7.57574L7 9.15147L10.5757 5.57574L7 9.15147Z"
                            fill="#31B77E"
                          />
                        </svg>

                        <span>Активировать</span>
                      </div>
                    )}
                    {selectedConcentrator.active && (
                      <div
                        className="accordion-popover__item"
                        onClick={(e) => {
                          toggleIsSidebarOpen(false);
                          setIsPopoverOpen(false);
                          toggleDeleteConcentratorPopup(true);
                          e.stopPropagation();
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2.3424 2.34315C5.4666 -0.781049 10.5319 -0.781048 13.6561 2.34315C16.7803 5.46734 16.7803 10.5327 13.6561 13.6569C10.5319 16.781 5.4666 16.781 2.3424 13.6569C-0.781793 10.5327 -0.781793 5.46734 2.3424 2.34315ZM3.19093 3.19167C0.535364 5.84724 0.535364 10.1528 3.19093 12.8083C5.84649 15.4639 10.152 15.4639 12.8076 12.8083C15.4631 10.1528 15.4631 5.84724 12.8076 3.19167C10.152 0.536109 5.84649 0.536109 3.19093 3.19167ZM5.17083 5.17157C5.40514 4.93726 5.78504 4.93726 6.01936 5.17157L7.99926 7.15147L9.97915 5.17157C10.2135 4.93726 10.5934 4.93726 10.8277 5.17157C11.062 5.40589 11.062 5.78579 10.8277 6.0201L8.84778 8L10.8277 9.9799C11.062 10.2142 11.062 10.5941 10.8277 10.8284C10.5934 11.0627 10.2135 11.0627 9.97915 10.8284L7.99926 8.84853L6.01936 10.8284C5.78504 11.0627 5.40514 11.0627 5.17083 10.8284C4.93651 10.5941 4.93651 10.2142 5.17083 9.9799L7.15073 8L5.17083 6.0201C4.93651 5.78579 4.93651 5.40589 5.17083 5.17157Z"
                            fill="#EB5757"
                          />
                        </svg>

                        <span>Деактивировать</span>
                      </div>
                    )}

                    <div
                      className="accordion-popover__item"
                      onClick={(e) => {
                        toggleResetConcentratorPopup(true);
                        toggleIsSidebarOpen(false);
                        setIsPopoverOpen(false);
                        e.stopPropagation();
                      }}
                    >
                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.34244 2.92473C3.52904 3.16984 3.48196 3.52007 3.2373 3.707C1.90883 4.72197 1.11429 6.29448 1.11429 8C1.11429 10.7803 3.21348 13.0694 5.91069 13.3634L5.40825 12.8598C5.19067 12.6418 5.19067 12.2884 5.40825 12.0705C5.60604 11.8723 5.91557 11.8543 6.13368 12.0164L6.19616 12.0705L7.68188 13.5588C7.87968 13.757 7.89766 14.0671 7.73582 14.2856L7.68188 14.3482L6.19616 15.8365C5.97859 16.0545 5.62582 16.0545 5.40825 15.8365C5.21045 15.6384 5.19247 15.3283 5.3543 15.1098L5.40825 15.0472L5.96556 14.4899C2.62571 14.2176 0 11.416 0 8C0 5.94252 0.959612 4.04332 2.56157 2.8194C2.80624 2.63247 3.15585 2.67963 3.34244 2.92473ZM7.59176 0.163475C7.80933 0.381442 7.80933 0.734837 7.59176 0.952804L7.03518 1.51013C10.3747 1.78277 13 4.58425 13 8C13 9.96797 12.1225 11.7934 10.6371 13.0226C10.3999 13.2189 10.0487 13.1854 9.85275 12.9477C9.65678 12.7101 9.69024 12.3583 9.92747 12.162C11.1593 11.1426 11.8857 9.63141 11.8857 8C11.8857 5.21999 9.78691 2.93106 7.09006 2.63666L7.59176 3.14022C7.80933 3.35819 7.80933 3.71158 7.59176 3.92955C7.37418 4.14752 7.02141 4.14752 6.80384 3.92955L5.31812 2.44118C5.10054 2.22321 5.10054 1.86981 5.31812 1.65185L6.80384 0.163475C7.02141 -0.0544918 7.37418 -0.0544918 7.59176 0.163475Z"
                          fill="#8A93A2"
                        />
                      </svg>

                      <span>Перезагрузить</span>
                    </div>
                  </div>
                }
              >
                <MainButton
                  isSecondary
                  title="Еще"
                  onClick={() => setIsPopoverOpen(true)}
                  style={{ width: 62, height: 40, fontSize: 14 }}
                />
              </Popover>
            </div>
          </div>
        </Drawer>
      )}

      {!isConcentratorSelected && (
        <div className="d-flex justify-content-between align-items-center">
          <span className="concentrator-detail-list-header__title">УСПД не выбран</span>

          <div className="d-flex">
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
          </div>
        </div>
      )}

      {isConcentratorSelected && selectedConcentrator !== null && (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="concentrator-detail-list-header__title">{selectedConcentrator.name}</span>
            <div>
              <span className="concentrator-detail-list-header__subtitle">
                {selectedConcentrator.city}, ул. {selectedConcentrator.address}
              </span>
              <span
                onClick={() => {
                  toggleIsSidebarOpen(true);
                }}
                className="link link--active link--no-line"
              >
                Подробнее
              </span>
            </div>
          </div>

          <div className="d-flex">
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
            />
            {/* <MainButton isSecondary title="Импорт данных из Excel" style={{ width: 200, height: 40, fontSize: 14 }} /> */}
            <div className="mr12px"></div>
            <AddButton
              title="Добавить ПУ"
              style={{ width: 146, height: 40, fontSize: 14 }}
              onClick={() => {
                history.push("/admin/concentrators/power-meter/add-meter/connection-by-transmission-device");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
