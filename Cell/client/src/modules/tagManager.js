import { getToken } from "./authManager";

const apiUrl = "/api/tag";

export const getAllTags = () => {
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
        throw new Error("An unknown error occurred while trying to get tags.");
      }
    });
  });
};

export const getTagsByGameId = (gameId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/gameId${gameId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get tags by game ID."
        );
      }
    });
  });
};

export const updateTag = (tag) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to update a tag."
        );
      }
    });
  });
};

export const deleteTag = (tagId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${tagId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "An unknown error occurred while trying to delete a tag."
        );
      }
    });
  });
};

export const addGameTag = (gameId, tagId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/game/${gameId}/tag/${tagId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp;
      } else {
        throw new Error(
          "An unknown error occurred while trying to add a game tag."
        );
      }
    });
  });
};