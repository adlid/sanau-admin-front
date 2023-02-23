import React, { FC } from "react";
// import closeIcon from "../../assets/imgs/closeIcon.svg";

const Page500: FC = () => {
  return (
    <div className="page500">
      <div className="page500__container">
        <div className="page500__wrap">
          <div className="window">
            <div className="window__header">
              <svg
                className="window__close"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.29294 5.70711L4.65512e-05 10L1.41426 11.4142L5.70715 7.12132L10 11.4142L11.4143 10L7.12137 5.70711L11.4143 1.41421L10 0L5.70715 4.29289L1.41426 0L4.673e-05 1.41421L4.29294 5.70711Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="window__body">
              <span>500</span>
            </div>
          </div>

          <h1 className="page500__title">Произошла ошибка</h1>
          <p className="page500__descr">
            Мы работаем над устранением ошибки. Пожалуйста, попробуйте зайти
            позже
          </p>
        </div>
      </div>
    </div>
  );
};

export { Page500 };
