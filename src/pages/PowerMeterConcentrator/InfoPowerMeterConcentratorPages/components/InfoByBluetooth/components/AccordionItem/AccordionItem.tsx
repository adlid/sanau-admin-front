import { FC, useState, useEffect } from "react";
import { CCollapse } from "@coreui/react";
import { Popover } from "react-tiny-popover";
import { Col, Row } from "react-bootstrap";
import { IBluetoothConcentratorMeterWithSelectFlag } from "../../../../../../../ts/interfaces/powerMeterConcentrator";
import { useHistory } from "react-router-dom";

type PropsType = {
  setAccordion: (accordion: null | number) => void;
  addMetersIdToArrCallBack: (id: string) => void;
  removeMetersIdFromArrCallBack: (id: string) => void;
  accordion: null | number;
  index: number;
  meterData: IBluetoothConcentratorMeterWithSelectFlag;
};

export const AccordionItem: FC<PropsType> = ({
  setAccordion,
  addMetersIdToArrCallBack,
  removeMetersIdFromArrCallBack,
  accordion,
  index,
  meterData,
}) => {
  const history = useHistory();

  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (accordion === index) setIsClosed(false);
    else setIsClosed(true);
  }, [accordion, index]);

  return (
    <div className="info-by-bluetooth__item">
      <div className="info-by-bluetooth__wrap">
        <Row>
          <Col xl={8}>
            <Row>
              <Col xl={3} lg={3}>
                <div className="d-flex">
                  <div className="d-flex justify-content-end">
                    <div
                      onClick={() => setAccordion(accordion === index ? null : index)}
                      className={
                        isClosed ? "accordion-item__arrow" : "accordion-item__arrow accordion-item__arrow--rotated"
                      }
                    >
                      <svg
                        style={{ cursor: "pointer", marginLeft: "15px" }}
                        width="10"
                        height="18"
                        viewBox="0 0 10 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.807359 16.9433C0.749155 16.8853 0.702976 16.8163 0.671469 16.7404C0.63996 16.6644 0.623742 16.583 0.623742 16.5008C0.623742 16.4186 0.63996 16.3372 0.671469 16.2613C0.702976 16.1854 0.749155 16.1164 0.807359 16.0583L7.86611 9.00084L0.807357 1.94334C0.689999 1.82598 0.624068 1.66681 0.624068 1.50084C0.624068 1.33487 0.689999 1.1757 0.807357 1.05834C0.924716 0.940978 1.08389 0.875048 1.24986 0.875048C1.41583 0.875048 1.575 0.940978 1.69236 1.05834L9.19236 8.55834C9.25056 8.61639 9.29674 8.68536 9.32825 8.76129C9.35976 8.83723 9.37598 8.91863 9.37598 9.00084C9.37598 9.08305 9.35976 9.16445 9.32825 9.24038C9.29674 9.31631 9.25056 9.38528 9.19236 9.44334L1.69236 16.9433C1.6343 17.0015 1.56533 17.0477 1.4894 17.0792C1.41347 17.1107 1.33207 17.127 1.24986 17.127C1.16765 17.127 1.08625 17.1107 1.01032 17.0792C0.934386 17.0477 0.865416 17.0015 0.807359 16.9433Z"
                          fill={isClosed ? "#8A93A2" : "#355169"}
                        />
                      </svg>
                    </div>

                    <input
                      type="checkbox"
                      style={{ marginRight: "25px" }}
                      className="checkbox-table"
                      checked={meterData.selected}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (e.target.checked) addMetersIdToArrCallBack(meterData.serialNumber);
                        else removeMetersIdFromArrCallBack(meterData.serialNumber);
                      }}
                    />
                  </div>

                  <span>{meterData.createdAt}</span>
                </div>
              </Col>
              <Col xl={2} lg={2}>
                {meterData.serialNumber}
              </Col>
              <Col xl={3} lg={3}>
                {meterData.type}
              </Col>
              <Col xl={2} lg={2}>
                {meterData.personalAccountNumber}
              </Col>
              <Col xl={2} lg={2}>
                {meterData.fullName}
              </Col>
            </Row>
          </Col>

          <Col xl={4}>
            <Row>
              <Col xl={3} lg={2}>
                {meterData.position}
              </Col>
              <Col xl={4} lg={4}>
                {meterData.lastFixDate}
              </Col>
              <Col xl={2} lg={2}>
                {meterData.active === "true" && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                        fill="#355169"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.9706 4.97028C11.1106 4.83155 11.2995 4.75348 11.4966 4.75293C11.6936 4.75239 11.883 4.82942 12.0237 4.96737C12.1644 5.10533 12.2452 5.29312 12.2485 5.49015C12.2519 5.68718 12.1776 5.87761 12.0416 6.02028L8.04965 11.0103C7.98104 11.0842 7.89823 11.1435 7.80618 11.1846C7.71413 11.2258 7.61472 11.248 7.5139 11.2499C7.41308 11.2517 7.31292 11.2332 7.2194 11.1955C7.12589 11.1578 7.04094 11.1016 6.96965 11.0303L4.32465 8.38428C4.25096 8.31562 4.19186 8.23282 4.15086 8.14082C4.10987 8.04882 4.08783 7.94951 4.08605 7.8488C4.08428 7.7481 4.1028 7.64807 4.14052 7.55468C4.17824 7.46129 4.23439 7.37646 4.30561 7.30524C4.37683 7.23402 4.46166 7.17788 4.55505 7.14016C4.64844 7.10244 4.74847 7.08391 4.84917 7.08569C4.94987 7.08747 5.04918 7.10951 5.14118 7.1505C5.23318 7.19149 5.31598 7.25059 5.38465 7.32428L7.47865 9.41728L10.9516 4.99228C10.9578 4.98453 10.9645 4.97719 10.9716 4.97028H10.9706Z"
                        fill="#355169"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}

                {meterData.active === "false" && (
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
              <Col xl={2} lg={2}>
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
                          setIsPopoverOpen(false);
                          toggleIsSvgHovered(false);
                          history.push(
                            `/admin/concentrators/power-meter/edit/connection-by-bluetooth?serialNumber=${meterData.serialNumber}&meterId=${meterData.id}&meterName=${meterData.serialNumber}`
                          );
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
                    </div>
                  }
                  onClickOutside={() => {
                    setIsPopoverOpen(false);
                    toggleIsSvgHovered(false);
                  }}
                >
                  <div className="d-flex justify-content-end">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setIsPopoverOpen(true);
                      }}
                      onMouseEnter={() => toggleIsSvgHovered(true)}
                      onMouseLeave={() => {
                        if (!isPopoverOpen) toggleIsSvgHovered(false);
                      }}
                      className={
                        isSvgHovered
                          ? "accordion-item__icon accordion-item__icon--hovered d-flex justify-content-center align-items-center"
                          : "accordion-item__icon d-flex justify-content-center align-items-center"
                      }
                    >
                      <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.00024 0.375C8.89729 0.375 9.6245 1.10221 9.6245 1.99926C9.6245 2.89632 8.89729 3.62352 8.00024 3.62352C7.10318 3.62352 6.37598 2.89632 6.37598 1.99926C6.37598 1.10221 7.10318 0.375 8.00024 0.375ZM14.0002 0.375C14.8973 0.375 15.6245 1.10221 15.6245 1.99926C15.6245 2.89632 14.8973 3.62352 14.0002 3.62352C13.1032 3.62352 12.376 2.89632 12.376 1.99926C12.376 1.10221 13.1032 0.375 14.0002 0.375ZM2.00024 0.375C2.89729 0.375 3.6245 1.10221 3.6245 1.99926C3.6245 2.89632 2.89729 3.62352 2.00024 3.62352C1.10318 3.62352 0.375977 2.89632 0.375977 1.99926C0.375977 1.10221 1.10318 0.375 2.00024 0.375Z"
                          fill={isSvgHovered ? "white" : "#355169"}
                        />
                      </svg>
                    </div>
                  </div>
                </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <CCollapse show={accordion === index}>
        <div className="accordion-item__body">
          <div className="accordion-item__wrap d-flex justify-content-between">
            <span>Наименование организации</span>
            <span>{meterData.organization}</span>
          </div>
          <div className="accordion-item__wrap d-flex justify-content-between">
            <span>Адрес</span>
            <span>{meterData.location}</span>
          </div>
        </div>
      </CCollapse>
    </div>
  );
};
