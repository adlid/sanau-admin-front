import { IClientList, IDetailClientProps } from "../../../../ts/interfaces/users.interface";

type ClientsStateType = {
  clientsListArr: IClientList | null;
  detailClient: IDetailClientProps | null;
};

export const clientsState: ClientsStateType = {
  clientsListArr: null,
  detailClient: null,
};
