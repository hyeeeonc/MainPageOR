import styled from "styled-components";
import MainResponsive from "../common/MainResponsive";
import Responsive from "../common/Responsive";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PostListBlock = styled(Responsive)`
  // margin-top: 3rem;
  // padding-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: initial;
  background-color: #181818;
`;

const ErrorBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15rem;
  padding-bottom: 7rem;

  .logo {
    font-size: 3.2rem;
    letter-spacing: -3px;

    .logof {
      font-weight: 900;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
        1px 1px 0 #fff;
    }

    .logob {
      font-weight: 600;
      font-style: italic;
    }
  }
`;

const PostThumbItemBlock = styled.div``;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 235px;
  margin-right: 47.5px;
  margin-left: 47.5px;
  display: hidden;

  @media (max-width: 350px) {
    max-width: 100%;
  }
  .thumbnail {
    max-width: 235px;
    text-align: center;
    img {
      max-width: 100%;
    }
  }

  h6 {
    font-size: 1rem;
    color: #1fc0e0;
    margin: 1.4rem 0 1.4rem 0;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0;
    margin-top: 0;
    color: white;
    &: hoaver {
      color: ${palette.gray[6]};
    }
  }
`;

const PostItem = ({ post }) => {
  const {
    postId,
    boardId,
    title,
    thumbnail,
    content,
    addedDate,
    status,
    selected,
    views,
  } = post;

  let events;

  const eventSetting = () => {
    if (boardId === 1) {
      events = "Festival";
    }
    if (boardId === 2) {
      events = "Concerts";
    }
    if (boardId === 3) {
      events = "Party";
    }
    return events;
  };
  eventSetting();

  // console.log(thumbnail);
  return (
    <PostItemBlock>
      <Link to={`/${postId}`}>
        <div
          className="thumbnail"
          dangerouslySetInnerHTML={{ __html: thumbnail }}
        ></div>
      </Link>
      <h6>{events}</h6>

      <Link to={`/${postId}`}>
        <h2>{title}</h2>
      </Link>

      {/* <div className="cont">{new Date(addedDate)}</div> */}
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error }) => {
  const errChenck = () => {
    if (error) {
      if (error.response.status === 404) {
        return <ErrorBlock> 존재하지 않는 포스트입니다. </ErrorBlock>;
      } else if (error.response.status === 401) {
        return <ErrorBlock> 권한이 없습니다. </ErrorBlock>;
      } else {
        return <ErrorBlock> Error! </ErrorBlock>;
      }
    }
  };
  useEffect(() => {
    errChenck();
  }, []);

  if (loading || !posts) {
    return (
      <MainResponsive>
        <ErrorBlock>
          <div to="/" className="logo">
            <span className="logof">OKRA</span>
            <span className="logob">SEOUL</span>
          </div>
        </ErrorBlock>
      </MainResponsive>
    );
  }

  return (
    <PostListBlock>
      {!loading && posts && (
        <>
          {posts.data.posts.map((post) => (
            <PostItem post={post} key={post.postId} />
          ))}
        </>
      )}
    </PostListBlock>
  );
};

export default PostList;
