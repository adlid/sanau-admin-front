import React, { FC, useState } from "react";

import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";

//icons
import { ReactComponent as List } from "../../assets/imgs/headerList.svg";
import { ReactComponent as Bell } from "../../assets/imgs/bell.svg";
import { ReactComponent as Avatar } from "../../assets/imgs/headerAvatar.svg";
import { RouterBreadcrumbs } from "./RouterBreadcrumbs";
import { NavLink } from "react-router-dom";
import { Popover } from "react-tiny-popover";

import { icons } from "../../utils/icons/icons";
import { logOut } from "../../store/slicesAndThunks/auth/auth.slice";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = (props) => {
  // hooks
  const dispatch = useAppDispatch();
  const { role, fullName } = useTypedSelector((state) => state.auth);

  const roles: any = { ROLE_OPERATOR: "Оператор", ROLE_GLOBAL: "Администратор" };

  // pop up menus handlers
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__leftSide">
        <List />
        <div className="header__leftSide_path">
          <RouterBreadcrumbs />
        </div>
      </div>

      {/* <Bell style={{ cursor: "pointer" }} /> */}
      <Popover
        isOpen={isPopoverOpen}
        positions={["bottom", "right"]}
        padding={10}
        content={
          <div className="private-header__menu">
            {role === "ROLE_OPERATOR" && (
              <NavLink onClick={() => setIsPopoverOpen(false)} className="menu" to="/admin/profile">
                <img className="menu__item" src={icons.menuItem2} alt="menu-item" />
                <span className="menu__text">Настройки</span>
              </NavLink>
            )}

            <div onClick={() => dispatch(logOut())} className="menu">
              <img className="menu__item" src={icons.menuItem3} alt="menu-item" />
              <span className="menu__text">Выйти</span>
            </div>
          </div>
        }
        onClickOutside={() => setIsPopoverOpen(false)}
      >
        <div className="header__rightSide" onClick={() => setIsPopoverOpen(true)}>
          <div className="header__rightSide_avatar">
            <Avatar />
          </div>
          <div className="header__rightSide_info">
            <p className="fio">{fullName}</p>
            <p className="role">{role && roles[role]}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};
