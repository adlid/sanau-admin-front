import { FC, useState } from "react";

import { CSidebarNavItem, CLink } from "@coreui/react";

import { ISidebarNavDropdownChildren, ISidebarNavDropdown } from "../../../../ts/interfaces/sidebar.interface";

import { useTypedSelector } from "../../../../utils/hooks/reduxHooks";

type PropsType = {
  dropdownParams: ISidebarNavDropdown;
};

export const SidebarNavDropdown: FC<PropsType> = ({ dropdownParams }) => {
  const [toggleDropdownValue, handleToggleDropdownValue] = useState(false);

  const { role, privileges } = useTypedSelector((state) => state.auth);
  const priv = JSON.parse(privileges || "[]");

  return (
    <li className={toggleDropdownValue ? "c-sidebar-nav-dropdown c-show" : "c-sidebar-nav-dropdown"}>
      <div
        onClick={() => handleToggleDropdownValue(!toggleDropdownValue)}
        className="c-sidebar-nav-dropdown-toggle custom-sidebar"
        aria-label="menu dropdown"
      >
        <div className="d-flex justify-content-center" style={{ marginLeft: "-16px", minWidth: "56px" }}>
          <img alt="img" src={dropdownParams.customIcon} />
        </div>

        {dropdownParams.name}
      </div>
      <ul className="c-sidebar-nav-dropdown-items">
        {(role === "ROLE_GLOBAL"
          ? dropdownParams.children
          : dropdownParams.children.filter(
              (item) => item.id === "" || priv.filter((p: any) => p.name === item.id).length > 0
            )
        ).map((item: ISidebarNavDropdownChildren) => (
          <CSidebarNavItem key={item.name}>
            <CLink to={item.to} className="c-sidebar-nav-link">
              <span className="custom-sidebar-item">{item.name}</span>
            </CLink>
          </CSidebarNavItem>
        ))}
      </ul>
    </li>
  );
};
