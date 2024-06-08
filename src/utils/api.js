const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function pushItems(name, weather, imageUrl) {
  const data = {
    name: name,
    weather: weather,
    imageUrl: imageUrl,
  };

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, pushItems, deleteItems };
