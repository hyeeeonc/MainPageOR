import HeaderContainer from "../containers/common/HeaderContainer";
import PostList from "../components/post/PostList";
import MainResponsive from "../components/common/MainResponsive";

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <MainResponsive>
        <PostList />
      </MainResponsive>
    </>
  );
};

export default PostListPage;
