import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/es/exports";
import { useParams } from "react-router";
import { readPost, unloadPost } from "../../modules/post";
import PostViewer from "../../components/post/PostViewer";
import Reissue from "../../lib/api/auth";

const PostViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
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
      console.log(error.response.status);
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
    }
  }, [error, dispatch, postId]);
  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      postId={postId}
      // actionButtons={<PostAciton></PostAciton>}
    />
  );
};

export default PostViewerContainer;
