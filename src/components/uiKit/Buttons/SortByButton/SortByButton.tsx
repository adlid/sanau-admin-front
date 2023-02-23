import { FC, useState } from "react"
import { Popover } from "react-tiny-popover";

import {
  Button,
} from "react-bootstrap";
import { CustomRadio } from "../../Inputs/CustomRadio"

type PropsType = {
  getBtnValue: (value: string) => void
}


export const SortByButton: FC<PropsType> = ({getBtnValue}) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [sortValue, setSortValue] = useState("default")

  return <Popover
    isOpen={isPopoverOpen}
    padding={10}
    positions={["bottom", "left"]}
    onClickOutside={() => {
      setIsPopoverOpen(false);
    }}
    content={
      <div className="info-by-bluetooth__sort">
        <CustomRadio
          title="По умолчанию"
          value="default"
          selectedRadioValue={sortValue}
          isSecondary
          onClick={(target) => {
            setSortValue(target)
            getBtnValue(target)
          }}
        />
        <div className="mb12px"></div>
        <CustomRadio
          title="От А до Я"
          value="asc"
          selectedRadioValue={sortValue}
          isSecondary
          onClick={(target) => {
            setSortValue(target)
            getBtnValue(target)
          }}
        />
        <div className="mb12px"></div>
        <CustomRadio
          title="От Я до А"
          value="desc"
          selectedRadioValue={sortValue}
          isSecondary
          onClick={(target) => {
            setSortValue(target)
            getBtnValue(target)
          }}
        />
      </div>
    }
  >
    <Button
      onClick={() => {
        setIsPopoverOpen(true);
      }}
      className="info-by-bluetooth__btn sort-by-button"
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.480419 4.14634L3.47693 1.14964C3.6543 0.972251 3.93182 0.955978 4.12757 1.10092L4.18366 1.14924L7.18689 4.14594C7.38237 4.34099 7.38271 4.65757 7.18766 4.85305C7.01035 5.03075 6.73259 5.04719 6.53669 4.90217L6.48056 4.85382L4.33198 2.70925L4.33243 10.5065C4.33243 10.7596 4.14432 10.9688 3.90027 11.0019L3.83243 11.0065C3.57929 11.0065 3.3701 10.8184 3.33699 10.5743L3.33243 10.5065L3.33198 2.70792L1.18755 4.85342C1.01004 5.03094 0.732269 5.04708 0.536523 4.90185L0.480442 4.85344C0.302926 4.67594 0.286779 4.39816 0.432009 4.20242L0.480419 4.14634L3.47693 1.14964L0.480419 4.14634ZM10.1 1.00115L10.1679 0.996582C10.421 0.996582 10.6302 1.18468 10.6633 1.42874L10.6679 1.49658L10.6673 9.29391L12.8136 7.14647C12.9911 6.96889 13.2688 6.95264 13.4646 7.09779L13.5207 7.14618C13.6983 7.32362 13.7146 7.60139 13.5694 7.79719L13.521 7.85329L10.5235 10.8533C10.3461 11.0309 10.0683 11.0471 9.87252 10.902L9.81642 10.8536L6.81391 7.85358C6.61857 7.6584 6.61844 7.34182 6.81362 7.14647C6.99105 6.96889 7.26882 6.95264 7.46462 7.09779L7.52072 7.14618L9.66732 9.29125L9.66789 1.49658C9.66789 1.24345 9.85599 1.03425 10.1 1.00115L10.1679 0.996582L10.1 1.00115Z"
          fill="white"
        />
      </svg>

      <span>Сортировать</span>

      <svg
        className={
          !isPopoverOpen
            ? "info-by-bluetooth__icon"
            : "info-by-bluetooth__icon info-by-bluetooth__icon--rotated"
        }
        width="11"
        height="6"
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8757 0.125877C10.9151 0.165677 10.9464 0.212958 10.9677 0.265012C10.989 0.317066 11 0.37287 11 0.429228C11 0.485585 10.989 0.541389 10.9677 0.593443C10.9464 0.645497 10.9151 0.692779 10.8757 0.732579L5.79939 5.87412C5.7601 5.91402 5.71341 5.94568 5.66202 5.96728C5.61063 5.98888 5.55553 6 5.49989 6C5.44425 6 5.38915 5.98888 5.33776 5.96728C5.28636 5.94568 5.23968 5.91402 5.20039 5.87412L0.124058 0.732579C0.0446243 0.652125 -2.37356e-08 0.543006 -1.87621e-08 0.429227C-1.37887e-08 0.315449 0.0446243 0.20633 0.124058 0.125876C0.203491 0.0454224 0.311226 0.000223861 0.423561 0.000223866C0.535897 0.000223871 0.643632 0.0454224 0.723064 0.125876L5.49989 4.96493L10.2767 0.125877C10.316 0.0859754 10.3627 0.0543181 10.4141 0.032718C10.4655 0.011118 10.5206 -2.09564e-08 10.5762 -1.85242e-08C10.6319 -1.60919e-08 10.687 0.011118 10.7383 0.0327181C10.7897 0.0543181 10.8364 0.0859754 10.8757 0.125877Z"
          fill="white"
        />
      </svg>
    </Button>
  </Popover>
}