import React, { useEffect, useState } from "react";
import WriteActionButtons from "../../components/editor/WriteActionButtons";
import { useSelector, useDispatch } from "../../../node_modules/react-redux/es/exports";
import { useNavigate } from "../../../node_modules/react-router-dom/index";
import { writePost } from "../../modules/write";
import Reissue from "../../lib/api/auth";

const WriteActionButtonsContainer = () => {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId, title, thumbnail, content, status, addresses, post, postError } = useSelector(({ write }) => ({
    boardId: write.boardId,
    title: write.title,
    thumbnail: write.thumbnail,
    content: write.content,
    status: write.status,
    addresses: write.addresses,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    dispatch(
      writePost({
        boardId,
        title,
        thumbnail,
        content,
        status,
      })
    );
  };

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (post) {
      console.log("post성공");
    }
    if (postError) {
      const accessToken = localStorage.getItem("AccessToken");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!accessToken || !refreshToken) {
        // setError("권한이 없습니다.");
        return;
      }

      async function setReissue() {
        const response = await Reissue({ accessToken, refreshToken });
        if (response.status === 400) {
          // setError("잠시 후 다시 시도해 주세요.");
          return;
        } else if (response.status === 401) {
          // setError("권한이 만료되었습니다. 다시 로그인해 주세요.");
          return;
        } else if (response.status === 200) {
          const tokenPair = response.headers.authorization;
          const tokens = tokenPair.split(" ");
          const accessToken = tokens[0];

          try {
            localStorage.setItem("AccessToken", accessToken);

            dispatch(
              writePost({
                boardId,
                title,
                thumbnail,
                content,
                status,
              })
            );
          } catch (e) {
            console.log("localStorage is not working");
          }
        }
      }
      setReissue();

      return;
    }
  }, [navigate, post, postError, boardId, title, thumbnail, content, status, dispatch]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
