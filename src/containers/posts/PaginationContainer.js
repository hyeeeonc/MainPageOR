import Pagination from "../../components/post/Pagination";
import { useSelector } from "../../../node_modules/react-redux/es/exports";
import { useSearchParams } from "../../../node_modules/react-router-dom/index";

const PaginationContainer = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page"), 10) || 1;

  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading["posts/LIST_POSTS"],
  }));

  if (!posts || loading) return null;

  return <Pagination page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer;
