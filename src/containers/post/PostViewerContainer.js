import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/es/exports";
import { useParams } from "react-router";
import { readPost, unloadPost } from "../../modules/post";
import PostViewer from "../../components/post/PostViewer";
import Reissue from "../../lib/api/auth";
import PostAcitonButtons from "../../components/post/PostActionButtons";
import { removePost } from "../../lib/api/posts";
import { useNavigate } from "react-router-dom";
import { setOriginalPost } from "../../modules/write";

const PostViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ_POST"],
  }));

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  useEffect(() => {
    if (error) {
      if (error.response.status === 401) {
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
            const refreshToken = tokens[1];

            try {
              localStorage.setItem("AccessToken", accessToken);
              localStorage.setItem("RefreshToken", refreshToken);

              dispatch(readPost(postId));
            } catch (e) {
              console.log("localStorage is not working");
            }
          }
        }
        setReissue();
      } else {
        alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }
  }, [error, dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate("/editor");
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");

        return;
      }

      if (error.response.statue === 404) {
        alert("게시글을 찾을 수 없습니다.");

        return;
      }

      const accessToken = localStorage.getItem("AccessToken");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!accessToken || !refreshToken) {
        alert("권한이 없습니다.");

        return;
      }

      async function setReissue() {
        const response = await Reissue({ accessToken, refreshToken });
        console.log(response);
        if (response.status === 400) {
          alert("잠시 후 다시 시도해 주세요.");
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
            await removePost(postId);
            navigate("/");
          } catch (e) {
            console.log("localStorage is not working");
          }
        }
      }
      setReissue();

      return;
    }
  };

  // const token = localStorage.getItem("AccessToken");
  // function setToken() {
  //   if (token) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const ownPost = () => {
    const accessToken = localStorage.getItem("AccessToken");

    if (accessToken) {
      return true;
    } else {
      return false;
    }
  };

  return <PostViewer post={post} loading={loading} error={error} postId={postId} actionButtons={ownPost() && <PostAcitonButtons onEdit={onEdit} onRemove={onRemove} />} />;
};

export default PostViewerContainer;
