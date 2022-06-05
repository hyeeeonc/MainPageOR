import styled from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 310px;
  margin-right: 20px;

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

  p {
    margin-left: 10px;
    margin-top: 2rem;
  }
`;

const PostItem = () => {
  return (
    <PostItemBlock>
      <div className="thumbnail">
        <img src="http://49.50.174.103:3000/images/6c6b33ac-7be4-4f4b-a328-0f758b8d14ef.png" alt="thumb" />
      </div>
      <h6>Festival</h6>
      <h2>제목</h2>
      <p>내용~~~~</p>
    </PostItemBlock>
  );
};

const PostList = () => {
  return (
    <>
      <PostListBlock>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </PostListBlock>
    </>
  );
};

export default PostList;
