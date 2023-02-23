import React, { FC } from "react";
import { Button } from "react-bootstrap";
// import excelIcon from "../../../../assets/imgs/excelIcon.svg";

type PropsType = {
  onClick?: () => void;
};

const ExcelButton: FC<PropsType> = ({ onClick }) => {
  return (
    <Button onClick={onClick} className={"btn excel-btn"}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.819 0.614381C8.705 0.520381 8.554 0.481381 8.408 0.508381L0.408 2.00838C0.171 2.05238 0 2.25838 0 2.49938V13.4994C0 13.7394 0.171 13.9464 0.408 13.9904L8.408 15.4904C8.438 15.4964 8.47 15.4994 8.5 15.4994C8.615 15.4994 8.729 15.4594 8.819 15.3844C8.934 15.2894 9 15.1474 9 14.9994V0.999381C9 0.850381 8.934 0.709381 8.819 0.614381ZM8 14.3964L1 13.0844V2.91438L8 1.60238V14.3964Z"
          fill="white"
        />
        <path
          d="M15.5 2.5H8.5C8.224 2.5 8 2.724 8 3C8 3.276 8.224 3.5 8.5 3.5H15V12.5H8.5C8.224 12.5 8 12.724 8 13C8 13.276 8.224 13.5 8.5 13.5H15.5C15.776 13.5 16 13.276 16 13V3C16 2.724 15.776 2.5 15.5 2.5Z"
          fill="white"
        />
        <path
          d="M10.5 4.5H8.5C8.224 4.5 8 4.724 8 5C8 5.276 8.224 5.5 8.5 5.5H10.5C10.776 5.5 11 5.276 11 5C11 4.724 10.776 4.5 10.5 4.5Z"
          fill="white"
        />
        <path
          d="M10.5 6.5H8.5C8.224 6.5 8 6.724 8 7C8 7.276 8.224 7.5 8.5 7.5H10.5C10.776 7.5 11 7.276 11 7C11 6.724 10.776 6.5 10.5 6.5Z"
          fill="white"
        />
        <path
          d="M10.5 8.5H8.5C8.224 8.5 8 8.724 8 9C8 9.276 8.224 9.5 8.5 9.5H10.5C10.776 9.5 11 9.276 11 9C11 8.724 10.776 8.5 10.5 8.5Z"
          fill="white"
        />
        <path
          d="M10.5 10.5H8.5C8.224 10.5 8 10.724 8 11C8 11.276 8.224 11.5 8.5 11.5H10.5C10.776 11.5 11 11.276 11 11C11 10.724 10.776 10.5 10.5 10.5Z"
          fill="white"
        />
        <path
          d="M13.5 4.5H12.5C12.224 4.5 12 4.724 12 5C12 5.276 12.224 5.5 12.5 5.5H13.5C13.776 5.5 14 5.276 14 5C14 4.724 13.776 4.5 13.5 4.5Z"
          fill="white"
        />
        <path
          d="M13.5 6.5H12.5C12.224 6.5 12 6.724 12 7C12 7.276 12.224 7.5 12.5 7.5H13.5C13.776 7.5 14 7.276 14 7C14 6.724 13.776 6.5 13.5 6.5Z"
          fill="white"
        />
        <path
          d="M13.5 8.5H12.5C12.224 8.5 12 8.724 12 9C12 9.276 12.224 9.5 12.5 9.5H13.5C13.776 9.5 14 9.276 14 9C14 8.724 13.776 8.5 13.5 8.5Z"
          fill="white"
        />
        <path
          d="M13.5 10.5H12.5C12.224 10.5 12 10.724 12 11C12 11.276 12.224 11.5 12.5 11.5H13.5C13.776 11.5 14 11.276 14 11C14 10.724 13.776 10.5 13.5 10.5Z"
          fill="white"
        />
        <path
          d="M6.8771 9.67022L3.3771 5.67022C3.1931 5.46122 2.8781 5.44122 2.6711 5.62322C2.4631 5.80522 2.4421 6.12122 2.6241 6.32822L6.1241 10.3282C6.2231 10.4412 6.3611 10.4992 6.5001 10.4992C6.6171 10.4992 6.7341 10.4582 6.8301 10.3752C7.0381 10.1932 7.0591 9.87822 6.8771 9.67022Z"
          fill="white"
        />
        <path
          d="M6.80702 5.10594C6.58902 4.93494 6.27502 4.97594 6.10502 5.19294L2.60502 9.69293C2.43602 9.91093 2.47502 10.2259 2.69302 10.3949C2.78502 10.4659 2.89302 10.4999 3.00002 10.4999C3.14802 10.4999 3.29602 10.4339 3.39402 10.3079L6.89402 5.80794C7.06402 5.58894 7.02502 5.27494 6.80702 5.10594Z"
          fill="white"
        />
      </svg>

      <span>Скачать в Excel</span>
    </Button>
  );
};

export { ExcelButton };