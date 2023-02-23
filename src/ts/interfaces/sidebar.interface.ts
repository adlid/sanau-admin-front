export interface ISidebarNavDropdownChildren {
  id?: string;
  name: string;
  to: string;
}

export interface ISidebarNavDropdown {
  name: string;
  customIcon: string;
  children: Array<ISidebarNavDropdownChildren>;
}

export type ISidebarNavItem = {
  name: string;
  to: string;
  customIcon: string;
  link?: boolean;
};

export interface ISidebarNavDropdownWithTag extends ISidebarNavDropdown {
  _tag: string;
  id: string;
}

export interface SidebarNavItemTypeWithTag extends ISidebarNavItem {
  _tag: string;
  id: string;
}
