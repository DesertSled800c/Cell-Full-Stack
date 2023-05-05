import { getToken } from "./authManager";

const apiUrl = "/api/game";

export const getAllGames = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get games.");
      }
    });
  });
};

export const getGameDetails = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get games.");
      }
    });
  });
};

export const getUserGames = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/usergames`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get games.");
      }
    });
  });
};

export const addGame = (game) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    }).then((resp) => {
      if (resp.ok) {
        console.log("Game made successfully!");
        return resp.json();
      } else {
        throw new Error("An error occurred while trying to add a game.");
      }
    });
  });
};
