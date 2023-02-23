import { FC } from "react";

import { CSidebarNavItem, CLink } from "@coreui/react";
import { ISidebarNavItem } from "../../../../ts/interfaces/sidebar.interface";

type PropsType = {
  navItem: ISidebarNavItem;
};

export const SidebarNavItem: FC<PropsType> = ({ navItem }) => {
  return (
    <CSidebarNavItem>
      {!navItem.link ? (
        <CLink to={navItem.to} className="c-sidebar-nav-link">
          <div className="d-flex justify-content-center" style={{ marginLeft: "-16px", minWidth: "56px" }}>
            <img alt="icons" src={navItem.customIcon} />
          </div>

          <span className="custom-sidebar-item">{navItem.name}</span>
        </CLink>
      ) : (
        <a href={navItem.to} target="_blank" rel="noopener noreferrer" className="c-sidebar-nav-link">
          <div className="d-flex justify-content-center" style={{ marginLeft: "-16px", minWidth: "56px" }}>
            <img alt="icons" src={navItem.customIcon} />
          </div>

          <span className="custom-sidebar-item">{navItem.name}</span>
        </a>
      )}
    </CSidebarNavItem>
  );
};
