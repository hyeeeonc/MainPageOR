import HeaderContainer from "../containers/common/HeaderContainer";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import styled from "styled-components";
import MainResponsive from "../components/common/MainResponsive";

const Spacer = styled.div`
  height: 1rem;
`;
const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <MainResponsive>
        <Spacer />
        <PostViewerContainer />
      </MainResponsive>
    </>
  );
};

export default PostPage;
