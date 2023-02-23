type AuthType = {
  isAuthenticated: boolean;
  role: null | string;
  privileges: any;
  fullName: null | string;
};

export const authState: AuthType = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  role: localStorage.getItem("role"),
  fullName: localStorage.getItem("fullName"),
  privileges: localStorage.getItem("privileges"),
};
