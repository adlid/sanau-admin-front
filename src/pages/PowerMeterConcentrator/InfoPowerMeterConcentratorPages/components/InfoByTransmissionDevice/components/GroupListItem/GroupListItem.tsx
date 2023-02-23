import { FC, useState } from "react";
import * as queryString from "querystring";
import { Popover } from "react-tiny-popover";
import { useHistory, useLocation } from "react-router-dom";
// icons
import { ReactComponent as Trash } from "../../../../../../../assets/imgs/trash.svg";

type PropsType = {
  toggleDeleteConcentratorPopup: (deleteConcentratorPopup: boolean) => void;
  setSelectedConcentrator: (id: string) => void;
  toggleIsSidebarOpen: (bool: boolean) => void;
  name: null | string;
  id: string;
  isActive: boolean;
};

export const GroupListItem: FC<PropsType> = (props) => {
  const { toggleDeleteConcentratorPopup, setSelectedConcentrator, toggleIsSidebarOpen, name, id, isActive } = props;

  // hooks
  const history = useHistory();

  // data from url
  const { tabValue } = queryString.parse(history.location.search.substring(1));

  // other handlers
  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setSelectedConcentrator(id);
      }}
      className="info-concentrators-list__item d-flex justify-content-between align-items-center"
    >
      <div>{name}</div>

      <div className="d-flex align-items-center">
        {!isActive && (
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
        <div className="mr12px"></div>

        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "left"]}
          padding={-7}
          containerClassName="concentrator-popover__container"
          onClickOutside={() => {
            setIsPopoverOpen(false);
            toggleIsSvgHovered(false);
          }}
          content={
            <div className="concentrator-popover">
              <div
                className="concentrator-popover__item"
                onClick={() => {
                  toggleIsSidebarOpen(true);
                  toggleIsSvgHovered(false);
                  setIsPopoverOpen(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                      fill="#8A93A2"
                    />
                    <path
                      d="M8.92995 6.58789L6.63995 6.87489L6.55795 7.25489L7.00795 7.33789C7.30195 7.40789 7.35995 7.51389 7.29595 7.80689L6.55795 11.2749C6.36395 12.1719 6.66295 12.5939 7.36595 12.5939C7.91095 12.5939 8.54395 12.3419 8.83095 11.9959L8.91895 11.5799C8.71895 11.7559 8.42695 11.8259 8.23295 11.8259C7.95795 11.8259 7.85795 11.6329 7.92895 11.2929L8.92995 6.58789Z"
                      fill="#8A93A2"
                    />
                    <path
                      d="M8 5.5C8.55228 5.5 9 5.05228 9 4.5C9 3.94772 8.55228 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z"
                      fill="#8A93A2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Подробнее</span>
              </div>
              <div
                className="concentrator-popover__item"
                onClick={() => {
                  setIsPopoverOpen(false);
                  history.push(
                    `/admin/concentrators/power-meter/${tabValue.includes("bluetooth") ? "bluetooth" : "tcp-ip"
                    }/editGroup`
                  );
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
                className="concentrator-popover__item"
                onClick={() => {
                  setIsPopoverOpen(false);
                  history.push(
                    `/admin/concentrators/power-meter/add-meters?meterType=${tabValue}&folderId=${id}`
                  );
                }}
              >
                <span>Добавить счетчики в группу</span>
              </div>

              <div
                className="concentrator-popover__item"
                onClick={() => {
                  setIsPopoverOpen(false);
                  toggleIsSvgHovered(false);
                  toggleDeleteConcentratorPopup(true);
                }}
              >
                <Trash />
                <span>Удалить</span>
              </div>
            </div>
          }
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsPopoverOpen(true);
              toggleIsSvgHovered(true);
            }}
            onMouseEnter={() => toggleIsSvgHovered(true)}
            onMouseLeave={() => !isPopoverOpen && toggleIsSvgHovered(false)}
            className={
              isSvgHovered
                ? "info-concentrators-list__icon info-concentrators-list__icon--hovered d-flex justify-content-center align-items-center"
                : "info-concentrators-list__icon d-flex justify-content-center align-items-center"
            }
          >
            <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.99999 0.375C8.89705 0.375 9.62426 1.10221 9.62426 1.99926C9.62426 2.89632 8.89705 3.62352 7.99999 3.62352C7.10294 3.62352 6.37573 2.89632 6.37573 1.99926C6.37573 1.10221 7.10294 0.375 7.99999 0.375ZM14 0.375C14.897 0.375 15.6243 1.10221 15.6243 1.99926C15.6243 2.89632 14.897 3.62352 14 3.62352C13.1029 3.62352 12.3757 2.89632 12.3757 1.99926C12.3757 1.10221 13.1029 0.375 14 0.375ZM1.99999 0.375C2.89705 0.375 3.62426 1.10221 3.62426 1.99926C3.62426 2.89632 2.89705 3.62352 1.99999 3.62352C1.10294 3.62352 0.375732 2.89632 0.375732 1.99926C0.375732 1.10221 1.10294 0.375 1.99999 0.375Z"
                fill={isSvgHovered ? "white" : "#355169"}
              />
            </svg>
          </div>
        </Popover>
      </div>
    </div>
  );
};
