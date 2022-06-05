import HeaderContainer from "../containers/common/HeaderContainer";
import MainResponsive from "../components/common/MainResponsive";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer";

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <MainResponsive>
        <PostListContainer />
        <PaginationContainer />
      </MainResponsive>
    </>
  );
};

export default PostListPage;
