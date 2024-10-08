export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrlarz.twilightparadox.com"
    : "http://localhost:3001";

import { checkResponse } from "./api";

export const register = async (email, password, name, avatar) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  });
  return checkResponse(res);
};

export const signIn = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};
