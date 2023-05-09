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

export const getGameById = (id) => {
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
        throw new Error(
          "An unknown error occurred while trying to get a game by ID."
        );
      }
    });
  });
};

export const getUserGames = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/userGames`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get user games."
        );
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
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to add a game."
        );
      }
    });
  });
};

export const updateGame = (game) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${game.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    }).then((resp) => {
      if (resp.ok) {
        return resp;
      } else {
        throw new Error(
          "An unknown error occurred while trying to update a game."
        );
      }
    });
  });
};

export const deleteGame = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "An unknown error occurred while trying to delete a game."
        );
      }
    });
  });
};
