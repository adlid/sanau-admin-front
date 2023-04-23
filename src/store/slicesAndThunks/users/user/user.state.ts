import { IUserrofile } from "../../../../ts/interfaces/users.interface";

type UserStateType = {
  userProfile: IUserrofile | null;
};

export const userState: UserStateType = {
  userProfile: null,
};
