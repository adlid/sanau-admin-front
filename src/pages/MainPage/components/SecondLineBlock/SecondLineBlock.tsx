import React, { FC } from "react";
import { IUserDashboardInfo } from "../../../../ts/interfaces/dashboard.interface";

interface ISecondLineBlockProps {
  user: IUserDashboardInfo;
}

const name: any = {
  ROLE_USER: "Физические лица",
  ROLE_OPERATOR: "Операторы",
  ROLE_ADMIN: "Юридические лица",
  ROLE_LEGAL: "Сотрудники юридических лиц",
};

export const SecondLineBlock: FC<ISecondLineBlockProps> = (props: any) => {
  const { user } = props;

  const round = (number: any) => {
    return number.toString().length > 4 ? number.toString().slice(0, 4) : number || 0;
  };
  return (
    <div className="info_block">
      <p className="info_block__title">{name[user.role]}</p>
      <p className="info_block__value">{user.total}</p>
      <div className="info_block__progress">
        <div
          className="info_block__progress_block green"
          style={{ width: `${user.activePercent}%`, display: user.activePercent ? "block" : "none" }}
        />
        <div
          className="info_block__progress_block blue"
          style={{ width: `${user.nonActivePercent}%`, display: user.nonActivePercent ? "block" : "none" }}
        />
        <div
          className="info_block__progress_block grey"
          style={{ width: `${user.deactivatedPercent}%`, display: user.deactivatedPercent ? "block" : "none" }}
        />
        <div
          className="info_block__progress_block red"
          style={{ width: `${user.blockedPercent}%`, display: user.blockedPercent ? "block" : "none" }}
        />
      </div>
      <div className="info_block__indications">
        <div className="info_block__indications_block">
          <div className="info_block__indications_block__text">
            <div className="round_sm green" /> <p>Активные: {user.active}</p>
          </div>
          <p className="info_block__indications_block__text">{round(user.activePercent)}%</p>
        </div>
        <div className="info_block__indications_block">
          <div className="info_block__indications_block__text">
            <div className="round_sm blue" /> <p>Неактивированные: {user.nonActive}</p>
          </div>
          <p className="info_block__indications_block__text">{round(user.nonActivePercent)}%</p>
        </div>
        <div className="info_block__indications_block">
          <div className="info_block__indications_block__text">
            <div className="round_sm grey" /> <p>Неактивные: {user.deactivated}</p>
          </div>
          <p className="info_block__indications_block__text">{round(user.deactivatedPercent)}%</p>
        </div>
        <div className="info_block__indications_block">
          <div className="info_block__indications_block__text">
            <div className="round_sm red" /> <p>Заблокированные: {user.blocked}</p>
          </div>
          <p className="info_block__indications_block__text">{round(user.blockedPercent)}%</p>
        </div>
      </div>
    </div>
  );
};
