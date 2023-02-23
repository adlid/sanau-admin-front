import * as queryString from "querystring";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { Popover } from "react-tiny-popover";
import { InfoIcon } from "../../../../../../../assets/imgs/InfoIcon";

type PropsType = {
  setSelectedConcentrator: (id: string) => void;
  id: string;
  stationIp: string;
  port: string;
  sideBarToggle: any;
};

export const ConcentratorListItem: FC<PropsType> = (props) => {
  const { setSelectedConcentrator, id, stationIp, port, sideBarToggle } = props;
  const [isSvgHovered, toggleIsSvgHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // hooks
  const history = useHistory();

  const { tabValue } = queryString.parse(history.location.search.substring(1));

  return (
    <div
      onClick={() => {
        history.push({ search: `?tabValue=${tabValue}&page=1` });
        setSelectedConcentrator(id);
      }}
      className="info-gas-udp-concentrators-list__item d-flex justify-content-between align-items-center"
    >
      <span>
        {stationIp}:{port}
      </span>
      <div className="d-flex align-items-center">
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "left"]}
          padding={-7}
          containerClassName="gas-udp-concentrator-popover__container "
          content={
            <div className="gas-udp-concentrator-popover">
              <div className="gas-udp-concentrator-popover__item" onClick={sideBarToggle(true)}>
                <InfoIcon />
                <span>Информация</span>
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
              e.stopPropagation();
              setIsPopoverOpen(true);
              toggleIsSvgHovered(true);
            }}
            onMouseEnter={() => toggleIsSvgHovered(true)}
            onMouseLeave={() => !isPopoverOpen && toggleIsSvgHovered(false)}
            className={
              isSvgHovered
                ? "info-gas-udp-concentrators-list__icon info-gas-udp-concentrators-list__icon--hovered d-flex justify-content-center align-items-center"
                : "info-gas-udp-concentrators-list__icon d-flex justify-content-center align-items-center"
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
