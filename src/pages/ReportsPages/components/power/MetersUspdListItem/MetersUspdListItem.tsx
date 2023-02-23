import moment from "moment";
import { Drawer } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo } from "react";
// icons
import { icons } from "../../../../../utils/icons/icons";
// ts
import { ConcentratorItemType } from "../../../../../ts/types/dataTransmissionsDevice.types";
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { AccordionSidebar } from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByTransmissionDevice/components/ConcentratorDetailListAccordion/AccordionSidebar";

type PropsType = {
  meterData: any;
};

export const MetersUspdListItem: FC<PropsType> = memo((props) => {
  const { meterData } = props;

  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSidebar = (bool: boolean) => setSideBarOpen(bool);

  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));

  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px", height: "100%" }}>
          <AccordionSidebar meter={meterData} close={() => setSideBarOpen(false)} />
        </div>
      </Drawer>
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
            <img
              src={hovered ? icons.moreActiveIcon : icons.moreIcon}
              alt="menu"
              className="indication-meters-item__more"
              onClick={() => toggleSidebar(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </Col>
        </Row>
      </div>
    </>
  );
});
