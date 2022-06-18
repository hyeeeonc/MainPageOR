import React, { useEffect } from "react";
import WriteActionButtons from "../../components/editor/WriteActionButtons";
import {
  useSelector,
  useDispatch,
} from "../../../node_modules/react-redux/es/exports";
import { useNavigate } from "../../../node_modules/react-router-dom/index";
import {
  changefield,
  writePost,
  initialError,
  updatePost,
} from "../../modules/write";
import Reissue from "../../lib/api/auth";
import client from "../../lib/api/client";

const WriteActionButtonsContainer = () => {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let {
    boardId,
    title,
    thumbnail,
    content,
    status,
    selected,
    addresses,
    post,
    postError,
    originalPostId,
  } = useSelector(({ write }) => ({
    boardId: Number(write.boardId),
    title: write.title,
    thumbnail: write.thumbnail,
    content: write.content,
    selected: write.selected,
    status: write.status,
    addresses: write.address,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
  }));

  const imageClear = async () => {
    const notIncludedAddresses = addresses.filter(
      (addr) => !content.includes(addr)
    );
    const accessToken = localStorage.getItem("AccessToken");

    const response = await client.post(
      "/api/v1/image/delete",
      notIncludedAddresses,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );

    // if (response.status === 200) {
    //   navigate(-1);

    return;
    // } else {
    //   if (response.status === 400) {
    //     // setError("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    //     navigate(-1);

    //     return;
    //   }

    //   const accessToken = localStorage.getItem("AccessToken");
    //   const refreshToken = localStorage.getItem("RefreshToken");

    //   if (!accessToken || !refreshToken) {
    //     // setError("권한이 없습니다.");
    //     navigate(-1);

    //     return;
    //   }

    //   async function setReissue() {
    //     const response = await Reissue({ accessToken, refreshToken });
    //     console.log(response);
    //     if (response.status === 400) {
    //       // alert("잠시 후 다시 시도해 주세요.");
    //       return;
    //     } else if (response.status === 401) {
    //       alert("권한이 만료되었습니다. 다시 로그인해 주세요.");
    //       return;
    //     } else if (response.status === 200) {
    //       const tokenPair = response.headers.authorization;
    //       const tokens = tokenPair.split(" ");
    //       const accessToken = tokens[0];

    //       try {
    //         localStorage.setItem("AccessToken", accessToken);

    //         const deleteApi = await client.post("/api/v1/image/delete", notIncludedAddresses, {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: accessToken,
    //           },
    //         });
    //         navigate(-1);
    //       } catch (e) {
    //         console.log("localStorage is not working");
    //         navigate(-1);
    //       }
    //     }
    //   }
    //   setReissue();

    //   return;
    // }
  };

  const onPublish = () => {
    dispatch(changefield({ key: "status", value: true }));
    status = true;

    if (originalPostId) {
      dispatch(
        updatePost({
          id: originalPostId,
          boardId,
          title,
          thumbnail,
          content,
          selected,
          status,
        })
      );
      return;
    }

    dispatch(
      writePost({
        boardId,
        title,
        thumbnail,
        content,
        selected,
        status,
      })
    );
  };

  const onTemporary = () => {
    dispatch(changefield({ key: "status", value: false }));
    status = false;

    if (originalPostId) {
      dispatch(
        updatePost({
          id: originalPostId,
          boardId,
          title,
          thumbnail,
          content,
          selected,
          status,
        })
      );
      return;
    }

    dispatch(
      writePost({
        boardId,
        title,
        thumbnail,
        content,
        selected,
        status,
      })
    );

    // })
  };

  const onCancel = async () => {
    const accessToken = localStorage.getItem("AccessToken");

    try {
      const response = await client.post("/api/v1/image/delete", addresses, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (response.status === 200) {
        navigate(-1);
      }
    } catch (e) {
      if (e.response.status === 400) {
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
        if (response.status === 400) {
          // setError("잠시 후 다시 시도해 주세요.");
          return;
        } else if (response.status === 401) {
          alert("권한이 만료되었습니다. 다시 로그인해 주세요.");
          return;
        } else if (response.status === 200) {
          const tokenPair = response.headers.authorization;
          const tokens = tokenPair.split(" ");
          const accessToken = tokens[0];

          try {
            localStorage.setItem("AccessToken", accessToken);

            const response = await client.post(
              "/api/v1/image/delete",
              addresses,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: accessToken,
                },
              }
            );
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
      if (originalPostId) {
        const id = originalPostId;
        navigate(`/${id}`);
        imageClear();
        return;
      }
      const id = post.data.postId;

      console.log(id);
      navigate(`/${id}`);
      imageClear();
    }

    if (postError) {
      if (postError.response.status === 400) {
        // setError("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        dispatch(changefield({ key: "postError", value: null }));
        return;
      }

      if (postError.response.status === 422) {
        if (postError.response.data.title) {
          alert("제목을 입력하세요.");
          dispatch(changefield({ key: "postError", value: null }));

          return;
        }
        if (postError.response.data.content) {
          alert("내용을 입력하세요.");
          dispatch(changefield({ key: "postError", value: null }));

          return;
        }
      }
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

            if (originalPostId) {
              dispatch(
                updatePost({
                  id: originalPostId,
                  boardId,
                  title,
                  thumbnail,
                  content,
                  selected,
                  status,
                })
              );
              return;
            }

            dispatch(
              writePost({
                boardId,
                title,
                thumbnail,
                content,
                selected,
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
  }, [
    navigate,
    post,
    postError,
    boardId,
    title,
    thumbnail,
    content,
    selected,
    status,
    dispatch,
  ]); /* eslint-disable-line */

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      onTemporary={onTemporary}
      isEdit={originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
