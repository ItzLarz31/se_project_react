import { getToken } from "./token";

const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (!res.ok) {
    return res.json().then((error) => {
      console.error("Server responded with an error:", error);
      return Promise.reject(error);
    });
  }
  return res.json();
}

async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function pushItems(name, weather, imageUrl) {
  const token = getToken();

  const payload = JSON.stringify({
    name: name,
    weather: weather,
    imageUrl: imageUrl,
  });

  console.log("Request Payload:", payload);

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  }).then((res) => checkResponse(res));
}

const addCardLike = (id) => {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

const removeCardLike = (id) => {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

function deleteItems(id) {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

const getUserInfo = async () => {
  const token = getToken();
  if (!token) {
    return Promise.reject("No token found");
  }

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

const editProfile = (data) => {
  const token = getToken();

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export {
  getItems,
  pushItems,
  deleteItems,
  getUserInfo,
  editProfile,
  addCardLike,
  removeCardLike,
};
