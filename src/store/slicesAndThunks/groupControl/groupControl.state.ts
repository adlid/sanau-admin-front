import {
  IGroupControlItemData,
  IGroupItemMeterIndicatorsTableProps,
  OrganizationTree,
} from "../../../ts/types/groupcontrol.types";

type GroupControlStateType = {
  tree: OrganizationTree[];
  detailTreeItem: null | IGroupControlItemData;
  createdItemKey: string;
  metersList: null | IGroupItemMeterIndicatorsTableProps;
  selectedMeters: string[];
  removedChildrenKey: string[];
};

export const groupControlState: GroupControlStateType = {
  tree: [],
  detailTreeItem: null,
  createdItemKey: "",
  metersList: null,
  selectedMeters: [],
  removedChildrenKey: [],
};
