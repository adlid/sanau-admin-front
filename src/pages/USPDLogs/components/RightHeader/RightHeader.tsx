import React, { FC } from "react";

interface IProps {
  headerRef: any;
}

export const RightHeader: FC<IProps> = (props) => {
  const { headerRef } = props;

  return (
    <div className="uspdLogs_right__header" ref={headerRef}>
      <h1 className="headingTitle">Логи</h1>
      <p className="headingText">
        Название прибора учета или серийный номер? <span className="headingLink">Подробнее</span>
      </p>
    </div>
  );
};
