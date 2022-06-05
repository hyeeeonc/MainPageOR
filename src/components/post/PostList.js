import styled from "styled-components";
import Responsive from "../common/Responsive";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PostListBlock = styled(Responsive)`
  // margin-top: 3rem;
  // padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 30px;
  justify-content: center;
  padding: initial;
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
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    }

    .logob {
      font-weight: 600;
      font-style: italic;
    }
  }
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 300px;
  // margin-right: 20px;
  display: hidden;

  @media (max-width: 350px) {
    max-width: 100%;
  }
  .thumbnail {
    max-width: 300px;
    text-align: center;
    img {
      max-width: 100%;
    }
  }

  h6 {
    margin-left: 10px;
    font-size: 0.8rem;
    color: #1fc0e0;
  }
  h2 {
    margin-left: 10px;
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &: hoaver {
      color: ${palette.gray[6]};
    }
  }

  .cont {
    margin-left: 10px;
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { postId, boardId, title, thumbnail, content, addedDate, status, selected, views } = post;
  // let events;
  // if (boardId === 1) {
  //   const events = "Festival";
  //   return events;
  // }
  // if (boardId === 2) {
  //   const events = "Concerts";
  //   return events;
  // }
  // if (boardId === 3) {
  //   const events = "Party";
  //   return events;
  // }

  // console.log(thumbnail);
  return (
    <PostItemBlock>
      <Link to={`/${postId}`}>
        <div className="thumbnail" dangerouslySetInnerHTML={{ __html: thumbnail }}></div>
      </Link>
      <h6>{boardId}</h6>

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
      <ErrorBlock>
        <div to="/" className="logo">
          <span className="logof">OKRA</span>
          <span className="logob">SEOUL</span>
        </div>
      </ErrorBlock>
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
