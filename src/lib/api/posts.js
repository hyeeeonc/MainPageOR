import client from "./client";

export const writePost = ({ boardId, title, thumbnail, content, status }) => {
  const accessToken = localStorage.getItem("AccessToken");
  return client.post(
    "api/v1/posts",
    { boardId, title, thumbnail, content, status },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
};

export const readPost = (id) => {
  const accessToken = localStorage.getItem("AccessToken");

  return client.get(`api/v1/posts/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const listPosts = ({ size, page, boardId }) => {
  const accessToken = localStorage.getItem("AccessToken");
  return client.get("api/v1/posts", {
    params: { size, page, boardId },
    headers: {
      Authorization: accessToken,
    },
  });
};
