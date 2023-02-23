export type ProfileType = {
  id: string;
  email: string;
  fathersname: string;
  firstname: string;
  lastname: string;
  personalAccountNumber: string;
  phoneNumber: string;
  agreement: boolean;
  passwordChangedAt: string;

  organization: string;
  position: string;
};

export type ProfileEditType = {
  email: string;
  fathersname: string;
  firstname: string;
  lastname: string;
};

export type AdminProfileEditType = {
  id: string;
  fathersname: string;
  firstname: string;
  lastname: string;
  position: string;
  phoneNumber: string;
  organization: string;
  personalAccountNumber: string;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};

export type ChangeAdminPasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type NotificationType = {
  id: number;
  message: string;
  type: string;
  date: string;
};
