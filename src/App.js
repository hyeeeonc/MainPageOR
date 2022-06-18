import { Route, Routes } from "../node_modules/react-router-dom/index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditorPage from "./pages/EditorPage";
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostListPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path=":postId" element={<PostPage />} />
      <Route path="/@:username">
        <Route index element={<PostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
    </Routes>
  );
};

export default App;
