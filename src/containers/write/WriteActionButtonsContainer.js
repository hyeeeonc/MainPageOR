import React, { useEffect } from "react";
import WriteActionButtons from "../../components/editor/WriteActionButtons";
import { useSelector, useDispatch } from "../../../node_modules/react-redux/es/exports";
import { useNavigate } from "../../../node_modules/react-router-dom/index";
import { changefield, writePost } from "../../modules/write";
import Reissue from "../../lib/api/auth";
import client from "../../lib/api/client";

const WriteActionButtonsContainer = () => {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { boardId, title, thumbnail, content, status, addresses, post, postError } = useSelector(({ write }) => ({
    boardId: Number(write.boardId),
    title: write.title,
    thumbnail: write.thumbnail,
    content: write.content,
    status: write.status,
    addresses: write.address,
    post: write.post,
    postError: write.postError,
  }));
  const imageClear = async () => {
    const notIncludedAddresses = addresses.filter((addr) => !content.includes(addr));
    console.log(notIncludedAddresses);
    const accessToken = localStorage.getItem("AccessToken");

    const response = await client.post("/api/v1/image/delete", notIncludedAddresses, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    if (response.status === 200) {
      // navigate(-1);

      return;
    } else {
      if (response.status === 400) {
        // setError("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        navigate(-1);

        return;
      }

      const accessToken = localStorage.getItem("AccessToken");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!accessToken || !refreshToken) {
        // setError("권한이 없습니다.");
        navigate(-1);

        return;
      }

      async function setReissue() {
        const response = await Reissue({ accessToken, refreshToken });
        console.log(response);
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

            const deleteApi = await client.post("/api/v1/image/delete", notIncludedAddresses, {
              headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
              },
            });
            navigate(-1);
          } catch (e) {
            console.log("localStorage is not working");
            navigate(-1);
          }
        }
      }
      setReissue();

      return;
    }
  };

  const onPublish = async () => {
    dispatch(changefield({ key: "status", value: true }));
    status = true;
    dispatch(
      writePost({
        boardId,
        title,
        thumbnail,
        content,
        status,
      })
    );
    imageClear();
    // addresses.map(async (a) => {

    // })
  };

  const onTemporary = () => {
    dispatch(changefield({ key: "status", value: false }));
    status = false;
    dispatch(
      writePost({
        boardId,
        title,
        thumbnail,
        content,
        status,
      })
    );
    imageClear();

    // addresses.map(async (a) => {

    // })
  };

  const onCancel = async () => {
    const accessToken = localStorage.getItem("AccessToken");

    const response = await client.post("/api/v1/image/delete", addresses, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    if (response.status === 200) {
      // navigate(-1);

      return;
    } else {
      if (response.status === 400) {
        // setError("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        navigate(-1);

        return;
      }

      const accessToken = localStorage.getItem("AccessToken");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!accessToken || !refreshToken) {
        // setError("권한이 없습니다.");
        navigate(-1);

        return;
      }

      async function setReissue() {
        const response = await Reissue({ accessToken, refreshToken });
        console.log(response);
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

            const response = await client.post("/api/v1/image/delete", addresses, {
              headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
              },
            });
            navigate(-1);
          } catch (e) {
            console.log("localStorage is not working");
            navigate(-1);
          }
        }
      }
      setReissue();

      return;
    }
  };

  useEffect(() => {
    if (post) {
      console.log("post성공");
    }
    if (postError) {
      if (postError.response.status === 400) {
        // setError("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }

      const accessToken = localStorage.getItem("AccessToken");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!accessToken || !refreshToken) {
        // setError("권한이 없습니다.");
        return;
      }

      async function setReissue() {
        const response = await Reissue({ accessToken, refreshToken });
        console.log(response);
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

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} onTemporary={onTemporary} />;
};

export default WriteActionButtonsContainer;
