import React from "react";

export const FlowSensorErrIcon = ({ color, ...rest }: any) => {
  return (
    <svg {...rest} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g  clipPath="url(#clip0)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
          fill={color || "#EB5757"}
        />
        <g  clipPath="url(#clip1)">
          <path
            d="M3.13631 8.29662C3.72788 8.80402 4.39834 9.37916 5.69524 9.37916C6.99217 9.37914 7.66268 8.80402 8.25426 8.29662C8.81371 7.81678 9.29688 7.40234 10.3047 7.40234C11.3124 7.40234 11.7956 7.81678 12.355 8.29662C12.5188 8.43707 12.7654 8.4182 12.9059 8.25445C13.0463 8.09068 13.0274 7.84408 12.8637 7.70363C12.2721 7.19623 11.6016 6.62109 10.3047 6.62109C9.00772 6.62109 8.33721 7.19621 7.74563 7.70363C7.18618 8.18348 6.70301 8.59791 5.69524 8.59791C4.68748 8.59791 4.20438 8.18349 3.64497 7.70363C3.48122 7.56318 3.23461 7.58203 3.09414 7.7458C2.95368 7.90955 2.97256 8.15617 3.13631 8.29662Z"
            fill={color || "#EB5757"}
          />
          <path
            d="M3.13631 6.1599C3.72786 6.66732 4.39832 7.24244 5.69524 7.24244C6.99217 7.24244 7.66268 6.66732 8.25426 6.1599C8.81371 5.68006 9.29686 5.26562 10.3047 5.26562C11.3124 5.26562 11.7956 5.68004 12.355 6.1599C12.5188 6.30039 12.7654 6.28146 12.9058 6.1177C13.0463 5.95395 13.0274 5.7073 12.8636 5.56687C12.2721 5.05945 11.6015 4.48438 10.3047 4.48438C9.00772 4.48438 8.33721 5.05949 7.74563 5.56691C7.18618 6.04676 6.70301 6.46119 5.69524 6.46119C4.6875 6.46119 4.20438 6.04678 3.64497 5.56691C3.48122 5.42645 3.23459 5.44531 3.09414 5.60908C2.95368 5.77283 2.97256 6.01945 3.13631 6.1599Z"
            fill={color || "#EB5757"}
          />
          <path
            d="M12.8637 9.84035C12.2721 9.33295 11.6016 8.75781 10.3046 8.75781C9.0077 8.75781 8.33719 9.33293 7.74561 9.84035C7.18616 10.3202 6.703 10.7346 5.69522 10.7346C4.68753 10.7346 4.20438 10.3202 3.64497 9.84039L3.64493 9.84035C3.48118 9.69994 3.2346 9.71881 3.09413 9.88254C2.95368 10.0463 2.97257 10.2929 3.13632 10.4334C3.72788 10.9408 4.39837 11.5159 5.69522 11.5159C6.99216 11.5159 7.66266 10.9408 8.25425 10.4333C8.8137 9.9535 9.29686 9.53906 10.3046 9.53906C11.3124 9.53906 11.7956 9.9535 12.355 10.4333C12.5188 10.5738 12.7654 10.5549 12.9058 10.3912C13.0463 10.2274 13.0274 9.9808 12.8637 9.84035Z"
            fill={color || "#EB5757"}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip1">
          <rect width="10" height="10" fill="white" transform="translate(3 3)" />
        </clipPath>
      </defs>
    </svg>
  );
};
