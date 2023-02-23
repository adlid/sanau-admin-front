import React, { memo } from "react";

import { CSidebarBrand, CSidebar, CSidebarNav, CSidebarMinimizer } from "@coreui/react";

// sidebar nav config
import { navigation } from "./_nav";

import { SidebarNavDropdown } from "../../components/uiKit/SideBar/SidebarNavDropdown/";
import { SidebarNavItem } from "../../components/uiKit/SideBar/SidebarNavItem";

import {
  ISidebarNavDropdownWithTag,
  SidebarNavItemTypeWithTag,
  ISidebarNavDropdown,
  ISidebarNavItem,
} from "../../ts/interfaces/sidebar.interface";
import { useTypedSelector } from "../../utils/hooks/reduxHooks";

import LinkIcon from "../../assets/sidebarIcons/LinkIcon.svg";

type NavigationItemType = ISidebarNavDropdownWithTag | SidebarNavItemTypeWithTag;

export const TheSidebar = memo(() => {
  const { role, privileges } = useTypedSelector((state) => state.auth);
  const priv = JSON.parse(privileges || "[]");

  return (
    <CSidebar
      show={true}
      //   onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <div className="sidebar-brand d-flex justify-content-start">
          <svg
            className="sidebar-logo-main"
            width="120"
            height="28"
            viewBox="0 0 120 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5547 7.85382H20.233C20.1412 3.25581 16.2755 0 10.562 0C4.9272 0 0.694525 3.21595 0.70763 8.02658C0.70763 11.9336 3.44642 14.1794 7.86255 15.3355L10.9158 16.1329C13.8119 16.8771 15.7251 17.794 15.7382 19.907C15.7251 22.2326 13.5498 23.7874 10.3786 23.7874C7.33838 23.7874 4.97962 22.4053 4.78305 19.5482H0C0.196564 24.9568 4.16715 28 10.4179 28C16.8521 28 20.5868 24.7442 20.5999 19.9468C20.5868 15.2292 16.7472 13.0764 12.7111 12.1063L10.1951 11.4684C7.99359 10.9369 5.60862 9.99335 5.63483 7.72093C5.64793 5.67442 7.45632 4.17276 10.4965 4.17276C13.3925 4.17276 15.3058 5.54153 15.5547 7.85382Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.9481 27.588L30.1627 20.8771H40.253L42.4807 27.588H47.67L38.2087 0.372093H32.207L22.7588 27.588H27.9481ZM31.4731 16.9169L35.103 5.95349H35.3127L38.9426 16.9169H31.4731Z"
              fill="white"
            />
            <path
              d="M72.8946 0.372093H68.4239V18.9236H68.188L55.5555 0.372093H51.2049V27.588H56.0665V9.04983H56.2893L68.9349 27.588L75.7207 27.588L85.1689 0.372081H87.8858V0.371373H72.8946V0.372093Z"
              fill="white"
            />
            <path
              d="M115.151 0.372093V18.2458C115.151 21.608 112.491 23.5615 109.11 23.5615C105.743 23.5615 103.082 21.608 103.082 18.2458V0.372093H98.2207V18.3654C98.2207 24.5316 102.886 28 109.11 28C115.309 28 120 24.5316 120 18.3654V0.372093H115.151Z"
              fill="white"
            />
            <path d="M88.3391 6.14838H88.0004L84.4351 16.9169H91.9045L88.3391 6.14838Z" fill="white" />
            <path d="M95.4426 27.588L93.2149 20.8771H83.1246L80.91 27.588H95.4426Z" fill="white" />
          </svg>

          <svg
            className="sidebar-logo-mini"
            width="21"
            height="28"
            viewBox="0 0 21 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5547 7.85382H20.233C20.1412 3.25582 16.2755 0 10.562 0C4.9272 0 0.694525 3.21595 0.70763 8.02658C0.70763 11.9336 3.44642 14.1794 7.86255 15.3355L10.9158 16.1329C13.8119 16.8771 15.7251 17.794 15.7382 19.907C15.7251 22.2326 13.5498 23.7874 10.3786 23.7874C7.33838 23.7874 4.97962 22.4053 4.78305 19.5482H0C0.196564 24.9568 4.16715 28 10.4179 28C16.8521 28 20.5868 24.7442 20.5999 19.9468C20.5868 15.2292 16.7472 13.0764 12.7111 12.1063L10.1951 11.4684C7.99359 10.9369 5.60862 9.99335 5.63483 7.72093C5.64793 5.67442 7.45632 4.17276 10.4965 4.17276C13.3925 4.17276 15.3058 5.54153 15.5547 7.85382Z"
              fill="white"
            />
          </svg>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        {role === "ROLE_GLOBAL"
          ? navigation?.map((item: NavigationItemType, index) => {
              const { _tag, ...itemProps } = item;

              if (_tag === "SidebarNavItem") {
                return <SidebarNavItem key={itemProps.name + index} navItem={itemProps as ISidebarNavItem} />;
              } else {
                return (
                  <SidebarNavDropdown key={itemProps.name + index} dropdownParams={itemProps as ISidebarNavDropdown} />
                );
              }
            })
          : navigation
              ?.filter(
                (item: NavigationItemType) => item.id === "" || priv.filter((p: any) => p.name === item.id).length > 0
              )
              .map((item: NavigationItemType, index) => {
                const { _tag, ...itemProps } = item;

                if (_tag === "SidebarNavItem") {
                  return <SidebarNavItem key={itemProps.name + index} navItem={itemProps as ISidebarNavItem} />;
                } else {
                  return (
                    <SidebarNavDropdown
                      key={itemProps.name + index}
                      dropdownParams={itemProps as ISidebarNavDropdown}
                    />
                  );
                }
              })}
        <div style={{ marginTop: "auto" }}>
          <SidebarNavItem
            navItem={{
              name: "Sanau Mobile",
              to: "http://89.218.1.74:3002",
              customIcon: LinkIcon,
              link: true,
            }}
          />
        </div>
      </CSidebarNav>

      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
});
