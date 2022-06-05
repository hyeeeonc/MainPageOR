import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/es/exports";
import PostList from "../../components/post/PostList";
import { useSearchParams } from "react-router-dom";
import { listPosts } from "../../modules/posts";
import Reissue from "../../lib/api/auth";

const PostListContainer = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading["posts/LIST_POSTS"],
  }));

  useEffect(() => {
    const size = 5;
    const page = parseInt(searchParams.get("page"), 10) || 1;
    // const boardId = null;

    dispatch(listPosts({ size, page }));
  }, [dispatch, searchParams]);

  // console.log(posts);

  useEffect(() => {
    if (error) {
      if (error.response.status === 401) {
        const accessToken = localStorage.getItem("AccessToken");
        const refreshToken = localStorage.getItem("RefreshToken");

        if (!accessToken || !refreshToken) {
          // alert("권한이 없습니다.");
          return;
        }

        async function setReissue() {
          const response = await Reissue({ accessToken, refreshToken });
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
            const refreshToken = tokens[1];

            try {
              localStorage.setItem("AccessToken", accessToken);
              localStorage.setItem("RefreshToken", refreshToken);
              const size = 5;

              const page = parseInt(searchParams.get("page"), 10) || 1;

              dispatch(listPosts({ size, page }));
            } catch (e) {
              console.log("localStorage is not working");
            }
          }
        }
        setReissue();
      } else {
        alert("오류가 발생했습니다. 다시 한번 시도해 주세요.");
      }
    }
  }, [error, dispatch]);
  return <PostList loading={loading} error={error} posts={posts} />;
};

export default PostListContainer;
