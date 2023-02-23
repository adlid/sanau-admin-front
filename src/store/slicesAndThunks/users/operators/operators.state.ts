import {
  IDetailOperatorProps,
  IDetailTemplateProps,
  IOperatorProfile,
  IOperatorsListWithSelect,
  ITemplatesProps,
} from "../../../../ts/interfaces/users.interface";

type OperatorsStateType = {
  operatorsListArr: IOperatorsListWithSelect | null;
  selectedAllOperators: boolean;
  metersId: Array<string>;
  templatesList: Array<ITemplatesProps>;
  detailTemplate: IDetailTemplateProps | null;
  detailOperator: IDetailOperatorProps | null;
  operatorProfile: IOperatorProfile | null;
};

export const operatorsState: OperatorsStateType = {
  operatorsListArr: null,
  selectedAllOperators: false,
  metersId: [],
  templatesList: [],
  detailTemplate: null,
  detailOperator: null,

  operatorProfile: null,
};
