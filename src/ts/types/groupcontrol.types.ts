import { Avatar } from "../../assets/imgs/groupItemIcons/Avatar";
import { Case } from "../../assets/imgs/groupItemIcons/Case";
import { Floor } from "../../assets/imgs/groupItemIcons/Floor";
import { Folder } from "../../assets/imgs/groupItemIcons/Folder";
import { House } from "../../assets/imgs/groupItemIcons/House";
import { MapIcon } from "../../assets/imgs/groupItemIcons/MapIcon";
import { PowerMeterIcon } from "../../assets/imgs/groupItemIcons/PowerMeterIcon";
import { WaterMeterIcon } from "../../assets/imgs/groupItemIcons/WaterMeterIcon";
import { GasMeterIcon } from "../../assets/imgs/groupItemIcons/GasMeterIcon";

export interface OrganizationTree {
  key: string | number;
  title: string;
  activeMeters: null | number;
  inactiveMeters: null | number;
  unitedMeter?: any;
  icon?: string;
  haveParent?: boolean;
  type?: string;
  children?: OrganizationTree[];
  meterName: string | null;
}
export interface IGroupControlItemData {
  key?: string;
  title: string;
  icon: string;
  type: string;
}

export interface IGetGroupTreeSearchParams {
  field: string;
  query: string;
  type: string;
}

interface IGroupItemImagesProps {
  name: string;
  icon: any;
}

export interface IGetGroupTreeItemMaterIndicatorsListProps {
  filterData: {
    field: string;
    query: string;
    key: string;
    specificType?: Array<string>
  };
  page: number;
}

export interface ISaveGroupItemMeterIndicatorsProps {
  parentKey: string;
  childrenKey: string[];
  removedChildrenKey: string[];
}

export interface IGroupItemMeterIndicatorsTableProps {
  page: number;
  size: number;
  hasNext: boolean;
  totalPage: number;
  totalElementsOnPage: number;
  elementsSize: number;
  data: IGroupItemMeterIndicatorsListProps[];
}

export interface IGroupItemMeterIndicatorsListProps {
  serialNumber: string;
  selected: boolean;
  groupMeter: {
    key: string;
    title: string;
    icon: null | string;
    activeMeters: number | null;
    inactiveMeters: number | null;
    type: string;
    haveParent: boolean;
    unitedMeter: {
      id: string;
      commonType: string;
      specificType: string;
      meterId: string;
      active: boolean;
      userInfo: {
        id: string;
        personalAccountNumber: string;
        roleName: string;
        firstname: string;
        lastname: string;
        fathersname: string;
        organizationName: string;
        position: string;
        phoneNumber: string;
        email: string;
      };
    };
    children: any[];
  };
}

export const groupItemsImages: IGroupItemImagesProps[] = [
  { name: "map", icon: MapIcon },
  { name: "folder", icon: Folder },
  { name: "floor", icon: Floor },
  { name: "house", icon: House },
  { name: "avatar ", icon: Avatar },
  { name: "case", icon: Case },
  { name: "electric", icon: PowerMeterIcon },
  { name: "water", icon: WaterMeterIcon },
  { name: "gas", icon: GasMeterIcon },
];

export interface IUploadUSPDExcel {
  file: File,
  type: string
}