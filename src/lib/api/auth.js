import client from "./client";

export const login = ({ id, pw }) =>
  client.post(
    "/api/v1/admin/login",
    { id, pw },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const logout = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const refreshToken = localStorage.getItem("RefreshToken");
  const setToken = accessToken + " " + refreshToken;
  return client.post(
    "/api/v1/admin/logout",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: setToken,
      },
    }
  );
};

export const register = ({ id, pw, name, email, phone, accessToken }) => {
  return client.post(
    "/api/v1/admin",
    { id, pw, name, email, phone },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
};

export const Reissue = ({ accessToken, refreshToken }) => {
  const setToken = accessToken + " " + refreshToken;
  return client.post(
    "/api/v1/admin/auth",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: setToken,
      },
    }
  );
};
export const check = () => client.get("/aa");
export default Reissue;
