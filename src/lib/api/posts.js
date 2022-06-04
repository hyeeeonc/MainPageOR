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

// export const imagePost = ({FormData})

// "api/vi/image/upload"
