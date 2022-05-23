import client from "./client";

export const login = ({ id, pw }) =>
  client.post("/api/v1/admin/login", { id, pw }, {
    headers: {
      "Content-Type": "application/json",
    }
  });

export const register = ({ id, pw, name, email, phone }) => {
  client.post("/api/v1/admin", { id, pw, name, email, phone }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "JWT"
    }
  });
};
export const check = () => client.get("/api");
