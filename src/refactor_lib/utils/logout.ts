import { APP_ROUTES } from "../constants";

export const logout = () => {
  localStorage.clear();
  window.location.href = APP_ROUTES.login;
};
