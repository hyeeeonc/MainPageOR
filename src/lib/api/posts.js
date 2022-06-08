import client from "./client";

export const writePost = ({ boardId, title, thumbnail, content, selected, status }) => {
  const accessToken = localStorage.getItem("AccessToken");
  return client.post(
    "api/v1/posts",
    { boardId, title, thumbnail, content, selected, status },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
};

export const readPost = (id) => {
  console.log(id);
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

export const updatePost = ({ id, title, thumbnail, content, selected, status }) => {
  const accessToken = localStorage.getItem("AccessToken");
  return client.put(
    `api/v1/posts/${id}`,
    {
      title,
      thumbnail,
      content,
      selected,
      status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
};

export const removePost = (id) => {
  const accessToken = localStorage.getItem("AccessToken");
  return client.delete(`api/v1/posts/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
