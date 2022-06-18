import HeaderContainer from "../containers/common/HeaderContainer";
import MainResponsive from "../components/common/MainResponsive";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer";
import styled from "styled-components";

const MainContainer = styled(MainResponsive)`
  background: #181818;
`;

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <MainContainer>
        <PostListContainer />
        <PaginationContainer />
      </MainContainer>
    </>
  );
};

export default PostListPage;
