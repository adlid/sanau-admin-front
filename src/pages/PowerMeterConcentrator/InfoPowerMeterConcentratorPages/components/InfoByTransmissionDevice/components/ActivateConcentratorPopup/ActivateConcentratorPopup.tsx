import { FC } from "react";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";

//redux
import { useAppDispatch } from "../../../../../../../utils/hooks/reduxHooks";

type PropsType = {
  isFetchingModal: boolean;
  onClick: () => void;
  toggleDeleteConcentratorPopup: (deleteConcentratorPopup: boolean) => void;
};

export const ActivateConcentratorPopup: FC<PropsType> = (props) => {
  const { toggleDeleteConcentratorPopup, onClick, isFetchingModal } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="delete-concentrator-popup__wrap">
      <div className="delete-concentrator-popup__header delete-concentrator-popup__header--green">
        Активировать УСПД?
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.2C4.24446 1.2 1.2 4.24446 1.2 8C1.2 11.7555 4.24446 14.8 8 14.8C11.7555 14.8 14.8 11.7555 14.8 8C14.8 4.24446 11.7555 1.2 8 1.2ZM7 9.15147L10.5757 5.57574C10.8101 5.34142 11.1899 5.34142 11.4243 5.57574C11.6373 5.78875 11.6566 6.12208 11.4824 6.35697L11.4243 6.42426L7.42426 10.4243C7.21125 10.6373 6.87792 10.6566 6.64303 10.4824L6.57574 10.4243L4.57574 8.42426C4.34142 8.18995 4.34142 7.81005 4.57574 7.57574C4.78875 7.36272 5.12208 7.34336 5.35697 7.51764L5.42426 7.57574L7 9.15147L10.5757 5.57574L7 9.15147Z"
            fill="#31B77E"
          />
        </svg>
      </div>
      <div className="delete-concentrator-popup__body">
        Приборы учета, связанные с УСПД, возобновят автоматическое считывание данных по настроенному расписанию.
      </div>
      <div className="delete-concentrator-popup__footer d-flex justify-content-end">
        <div className="d-flex">
          <MainButton
            title="Отмена"
            isSecondary
            style={{ width: 86, height: 40, fontSize: 16 }}
            onClick={() => toggleDeleteConcentratorPopup(false)}
          />
          <div className="mr8px"></div>
          <MainButton
            title="Активировать"
            fetching={isFetchingModal}
            style={{ width: 150, height: 40, fontSize: 16 }}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
