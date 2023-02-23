import { FC, useState, useEffect } from "react";
import { CCollapse } from "@coreui/react";
import { Popover } from "react-tiny-popover";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { ConcentratorMeterType } from "../../../../../../../ts/types/dataTransmissionsDevice.types";
import { ICreateConcentrtorMeter } from "../../../../../../../ts/interfaces/powerMeterConcentrator";
import { personalAccountInitialValuesType } from "../../../../../../../ts/types/powerMeterBluetooth.types";
import { InfoIcon } from "../../../../../../../assets/imgs/InfoIcon";
import { LogsIcon } from "../../../../../../../assets/imgs/LogsIcon";

type PropsType = {
  setAccordion: (accordion: null | number) => void;
  addMetersIdToArrCallBack: (id: string) => void;
  removeMetersIdFromArrCallBack: (id: string) => void;
  toggleDeleteConcentratorMeter: (bool: boolean) => void;
  toggleDeactivateConcentratorMeter: (bool: boolean) => void;
  toggleActivateConcentratorMeter: (bool: boolean) => void;
  setSelectedMeterObjCallback: (meter: ConcentratorMeterType) => void;
  addOneIdToArrayCallBack: (id: string) => void;
  setMeterSettingsCallBack: (meterSettings: ICreateConcentrtorMeter) => void;
  setUserCallBack: (user: personalAccountInitialValuesType | null) => void;
  sideBarToggle: any;

  accordion: null | number;
  index: number;
  meterData: ConcentratorMeterType;
};

export const AccordionItem: FC<PropsType> = (props) => {
  const {
    sideBarToggle,
    addMetersIdToArrCallBack,
    removeMetersIdFromArrCallBack,
    toggleDeleteConcentratorMeter,
    toggleDeactivateConcentratorMeter,
    toggleActivateConcentratorMeter,
    setSelectedMeterObjCallback,
    addOneIdToArrayCallBack,
    setMeterSettingsCallBack,
    setUserCallBack,
    meterData,
  } = props;

  // hooks
  const history = useHistory();

  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     addOneIdToArrayCallBack("");
  //   };
  // }, []);

  return (
    <div className="accordion-item ">
      <Row className="accordion-item__header " style={{ maxWidth: "100%" }}>
        <Col xl={2} lg={2} md={4} sm={4}>
          <input
            type="checkbox"
            className="checkbox-table"
            checked={meterData.selected}
            onChange={(e) => {
              e.stopPropagation();
              if (e.target.checked) addMetersIdToArrCallBack(meterData.id);
              else removeMetersIdFromArrCallBack(meterData.id);
            }}
          />
          <span style={{ marginLeft: "20px" }}>{meterData.svr}</span>
        </Col>
        <Col xl={1} lg={1} md={4} sm={4}>
          {meterData.serial}
        </Col>
        <Col xl={2} lg={2} md={4} sm={4}>
          {meterData.meterSettings.userInfo?.roleName
            ? meterData.meterSettings.userInfo.roleName === "ROLE_USER"
              ? "Физ. лицо"
              : "Юр. лицо"
            : "-"}
        </Col>

        <Col xl={2} lg={2} md={4} sm={4}>
          {meterData.meterSettings.userInfo?.personalAccountNumber || "-"}
        </Col>

        <Col xl={2} lg={2} md={4} sm={4}>
          {meterData.meterSettings.userInfo
            ? `${meterData.meterSettings.userInfo.firstname} ${meterData.meterSettings.userInfo.lastname} ${meterData.meterSettings.userInfo.fathersname}`
            : "-"}
        </Col>

        <Col xl={1} lg={1} md={4} sm={4}>
          {meterData.active && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.2C4.24446 1.2 1.2 4.24446 1.2 8C1.2 11.7555 4.24446 14.8 8 14.8C11.7555 14.8 14.8 11.7555 14.8 8C14.8 4.24446 11.7555 1.2 8 1.2ZM7 9.15147L10.5757 5.57574C10.8101 5.34142 11.1899 5.34142 11.4243 5.57574C11.6373 5.78875 11.6566 6.12208 11.4824 6.35697L11.4243 6.42426L7.42426 10.4243C7.21125 10.6373 6.87792 10.6566 6.64303 10.4824L6.57574 10.4243L4.57574 8.42426C4.34142 8.18995 4.34142 7.81005 4.57574 7.57574C4.78875 7.36272 5.12208 7.34336 5.35697 7.51764L5.42426 7.57574L7 9.15147L10.5757 5.57574L7 9.15147Z"
                fill="#31B77E"
              />
            </svg>
          )}
          {!meterData.active && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                  fill="#EB5757"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.29368 4.29368C4.38653 4.20058 4.49684 4.12673 4.61828 4.07633C4.73973 4.02594 4.86992 4 5.00141 4C5.13289 4 5.26308 4.02594 5.38453 4.07633C5.50597 4.12673 5.61628 4.20058 5.70914 4.29368L8.00026 6.5868L10.2914 4.29368C10.4791 4.10597 10.7337 4.00052 10.9991 4.00052C11.2646 4.00052 11.5191 4.10597 11.7068 4.29368C11.8946 4.48138 12 4.73596 12 5.00141C12 5.26686 11.8946 5.52143 11.7068 5.70914L9.41372 8.00026L11.7068 10.2914C11.8946 10.4791 12 10.7337 12 10.9991C12 11.2646 11.8946 11.5191 11.7068 11.7068C11.5191 11.8946 11.2646 12 10.9991 12C10.7337 12 10.4791 11.8946 10.2914 11.7068L8.00026 9.41372L5.70914 11.7068C5.52143 11.8946 5.26686 12 5.00141 12C4.73596 12 4.48138 11.8946 4.29368 11.7068C4.10597 11.5191 4.00052 11.2646 4.00052 10.9991C4.00052 10.7337 4.10597 10.4791 4.29368 10.2914L6.5868 8.00026L4.29368 5.70914C4.20058 5.61628 4.12673 5.50597 4.07633 5.38453C4.02594 5.26308 4 5.13289 4 5.00141C4 4.86992 4.02594 4.73973 4.07633 4.61829C4.12673 4.49684 4.20058 4.38653 4.29368 4.29368Z"
                  fill="#EB5757"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </Col>

        <Col xl={1} lg={1} md={4} sm={4}>
          {!meterData.meterSettings.userInfo?.personalAccountNumber ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                  fill="#EB5757"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.29368 4.29368C4.38653 4.20058 4.49684 4.12673 4.61828 4.07633C4.73973 4.02594 4.86992 4 5.00141 4C5.13289 4 5.26308 4.02594 5.38453 4.07633C5.50597 4.12673 5.61628 4.20058 5.70914 4.29368L8.00026 6.5868L10.2914 4.29368C10.4791 4.10597 10.7337 4.00052 10.9991 4.00052C11.2646 4.00052 11.5191 4.10597 11.7068 4.29368C11.8946 4.48138 12 4.73596 12 5.00141C12 5.26686 11.8946 5.52143 11.7068 5.70914L9.41372 8.00026L11.7068 10.2914C11.8946 10.4791 12 10.7337 12 10.9991C12 11.2646 11.8946 11.5191 11.7068 11.7068C11.5191 11.8946 11.2646 12 10.9991 12C10.7337 12 10.4791 11.8946 10.2914 11.7068L8.00026 9.41372L5.70914 11.7068C5.52143 11.8946 5.26686 12 5.00141 12C4.73596 12 4.48138 11.8946 4.29368 11.7068C4.10597 11.5191 4.00052 11.2646 4.00052 10.9991C4.00052 10.7337 4.10597 10.4791 4.29368 10.2914L6.5868 8.00026L4.29368 5.70914C4.20058 5.61628 4.12673 5.50597 4.07633 5.38453C4.02594 5.26308 4 5.13289 4 5.00141C4 4.86992 4.02594 4.73973 4.07633 4.61829C4.12673 4.49684 4.20058 4.38653 4.29368 4.29368Z"
                  fill="#EB5757"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.2C4.24446 1.2 1.2 4.24446 1.2 8C1.2 11.7555 4.24446 14.8 8 14.8C11.7555 14.8 14.8 11.7555 14.8 8C14.8 4.24446 11.7555 1.2 8 1.2ZM7 9.15147L10.5757 5.57574C10.8101 5.34142 11.1899 5.34142 11.4243 5.57574C11.6373 5.78875 11.6566 6.12208 11.4824 6.35697L11.4243 6.42426L7.42426 10.4243C7.21125 10.6373 6.87792 10.6566 6.64303 10.4824L6.57574 10.4243L4.57574 8.42426C4.34142 8.18995 4.34142 7.81005 4.57574 7.57574C4.78875 7.36272 5.12208 7.34336 5.35697 7.51764L5.42426 7.57574L7 9.15147L10.5757 5.57574L7 9.15147Z"
                fill="#31B77E"
              />
            </svg>
          )}
        </Col>
        <Col xl={1} lg={1} md={4} sm={4}>
          <Popover
            isOpen={isPopoverOpen}
            positions={["top", "right"]}
            padding={0}
            containerClassName="accordion-popover__container "
            content={
              <div className="accordion-popover">
                <div
                  className="accordion-popover__item"
                  onClick={(e) => {
                    history.push(
                      `/admin/concentrators/power-meter/edit-meter/connection-by-transmission-device?meterId=${meterData.id}&meterName=${meterData.meterSettings.meterName}`
                    );
                    setMeterSettingsCallBack(meterData.meterSettings);
                    setUserCallBack(meterData.meterSettings.userInfo);
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.1497 0.133222C12.1962 0.0866587 12.2513 0.0497158 12.3121 0.0245094C12.3728 -0.000697071 12.4379 -0.0136719 12.5037 -0.0136719C12.5695 -0.0136719 12.6346 -0.000697071 12.6953 0.0245094C12.7561 0.0497158 12.8113 0.0866587 12.8577 0.133222L15.8577 3.13322C15.9043 3.17967 15.9412 3.23484 15.9664 3.29559C15.9916 3.35633 16.0046 3.42145 16.0046 3.48722C16.0046 3.55299 15.9916 3.61811 15.9664 3.67886C15.9412 3.7396 15.9043 3.79478 15.8577 3.84122L5.85771 13.8412C5.80973 13.8889 5.75257 13.9263 5.68971 13.9512L0.689712 15.9512C0.598848 15.9876 0.499308 15.9965 0.403432 15.9768C0.307556 15.9572 0.21956 15.9098 0.150353 15.8406C0.0811466 15.7714 0.0337731 15.6834 0.0141056 15.5875C-0.00556185 15.4916 0.00334166 15.3921 0.0397123 15.3012L2.03971 10.3012C2.06464 10.2384 2.10206 10.1812 2.14971 10.1332L12.1497 0.133222ZM11.2107 2.48722L13.5037 4.78022L14.7967 3.48722L12.5037 1.19422L11.2107 2.48722ZM12.7967 5.48722L10.5037 3.19422L4.00371 9.69422V9.98722H4.50371C4.63632 9.98722 4.7635 10.0399 4.85727 10.1337C4.95103 10.2274 5.00371 10.3546 5.00371 10.4872V10.9872H5.50371C5.63632 10.9872 5.7635 11.0399 5.85727 11.1337C5.95103 11.2274 6.00371 11.3546 6.00371 11.4872V11.9872H6.29671L12.7967 5.48722ZM3.03571 10.6622L2.92971 10.7682L1.40171 14.5892L5.22271 13.0612L5.32871 12.9552C5.23333 12.9196 5.1511 12.8557 5.09303 12.772C5.03495 12.6884 5.00379 12.589 5.00371 12.4872V11.9872H4.50371C4.3711 11.9872 4.24393 11.9345 4.15016 11.8408C4.05639 11.747 4.00371 11.6198 4.00371 11.4872V10.9872H3.50371C3.40189 10.9871 3.30252 10.956 3.21889 10.8979C3.13526 10.8398 3.07135 10.7576 3.03571 10.6622Z"
                        fill="#8A93A2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Изменить</span>
                </div>

                <div
                  className="accordion-popover__item"
                  onClick={(e) => {
                    sideBarToggle(true, meterData);
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <InfoIcon />
                  <span>Информация</span>
                </div>

                {!meterData.active && (
                  <div
                    className="accordion-popover__item"
                    onClick={(e) => {
                      addOneIdToArrayCallBack(meterData.id);
                      toggleActivateConcentratorMeter(true);
                      setIsPopoverOpen(false);
                      toggleIsSvgHovered(false);
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

                {meterData.active && (
                  <div
                    className="accordion-popover__item"
                    onClick={(e) => {
                      addOneIdToArrayCallBack(meterData.id);
                      toggleDeactivateConcentratorMeter(true);
                      setIsPopoverOpen(false);
                      toggleIsSvgHovered(false);
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
                    toggleDeleteConcentratorMeter(true);
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                    e.stopPropagation();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                        d="M2.3424 2.34315C5.4666 -0.781049 10.5319 -0.781048 13.6561 2.34315C16.7803 5.46734 16.7803 10.5327 13.6561 13.6569C10.5319 16.781 5.4666 16.781 2.3424 13.6569C-0.781793 10.5327 -0.781793 5.46734 2.3424 2.34315ZM3.19093 3.19167C0.535364 5.84724 0.535364 10.1528 3.19093 12.8083C5.84649 15.4639 10.152 15.4639 12.8076 12.8083C15.4631 10.1528 15.4631 5.84724 12.8076 3.19167C10.152 0.536109 5.84649 0.536109 3.19093 3.19167ZM5.17083 5.17157C5.40514 4.93726 5.78504 4.93726 6.01936 5.17157L7.99926 7.15147L9.97915 5.17157C10.2135 4.93726 10.5934 4.93726 10.8277 5.17157C11.062 5.40589 11.062 5.78579 10.8277 6.0201L8.84778 8L10.8277 9.9799C11.062 10.2142 11.062 10.5941 10.8277 10.8284C10.5934 11.0627 10.2135 11.0627 9.97915 10.8284L7.99926 8.84853L6.01936 10.8284C5.78504 11.0627 5.40514 11.0627 5.17083 10.8284C4.93651 10.5941 4.93651 10.2142 5.17083 9.9799L7.15073 8L5.17083 6.0201C4.93651 5.78579 4.93651 5.40589 5.17083 5.17157Z"
                        fill="#EB5757"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Удалить</span>
                </div>

                <div
                  className="accordion-popover__item"
                  onClick={() => {
                    setIsPopoverOpen(false);
                    history.push(`/admin/concentrators/power-meter/concentrator-info/logs?id=${meterData.serial}&page=1`);
                  }}
                >
                  <LogsIcon />
                  <span>Логи</span>
                </div>
              </div>
            }
            onClickOutside={() => {
              setIsPopoverOpen(false);
              toggleIsSvgHovered(false);
            }}
          >
            <div
              onClick={(e) => {
                setIsPopoverOpen(true);
                setSelectedMeterObjCallback(meterData);
              }}
              onMouseEnter={() => toggleIsSvgHovered(true)}
              onMouseLeave={() => !isPopoverOpen && toggleIsSvgHovered(false)}
              className={
                isSvgHovered
                  ? "accordion-item__icon accordion-item__icon--hovered d-flex justify-content-center align-items-center"
                  : "accordion-item__icon d-flex justify-content-center align-items-center"
              }
            >
              {meterData.userId && (
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.99926 0.375732C8.89632 0.375732 9.62352 1.10294 9.62352 1.99999C9.62352 2.89705 8.89632 3.62426 7.99926 3.62426C7.10221 3.62426 6.375 2.89705 6.375 1.99999C6.375 1.10294 7.10221 0.375732 7.99926 0.375732ZM13.9993 0.375732C14.8963 0.375732 15.6235 1.10294 15.6235 1.99999C15.6235 2.89705 14.8963 3.62426 13.9993 3.62426C13.1022 3.62426 12.375 2.89705 12.375 1.99999C12.375 1.10294 13.1022 0.375732 13.9993 0.375732ZM1.99926 0.375732C2.89632 0.375732 3.62352 1.10294 3.62352 1.99999C3.62352 2.89705 2.89632 3.62426 1.99926 3.62426C1.10221 3.62426 0.375 2.89705 0.375 1.99999C0.375 1.10294 1.10221 0.375732 1.99926 0.375732Z"
                    fill={!isSvgHovered ? "#355169" : "#fff"}
                  />
                </svg>
              )}

              {!meterData.userId && (
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00024 0.375C8.89729 0.375 9.6245 1.10221 9.6245 1.99926C9.6245 2.89632 8.89729 3.62352 8.00024 3.62352C7.10318 3.62352 6.37598 2.89632 6.37598 1.99926C6.37598 1.10221 7.10318 0.375 8.00024 0.375ZM14.0002 0.375C14.8973 0.375 15.6245 1.10221 15.6245 1.99926C15.6245 2.89632 14.8973 3.62352 14.0002 3.62352C13.1032 3.62352 12.376 2.89632 12.376 1.99926C12.376 1.10221 13.1032 0.375 14.0002 0.375ZM2.00024 0.375C2.89729 0.375 3.6245 1.10221 3.6245 1.99926C3.6245 2.89632 2.89729 3.62352 2.00024 3.62352C1.10318 3.62352 0.375977 2.89632 0.375977 1.99926C0.375977 1.10221 1.10318 0.375 2.00024 0.375Z"
                    fill={isSvgHovered ? "white" : "#355169"}
                  />
                </svg>
              )}
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};
