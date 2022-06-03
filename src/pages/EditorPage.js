import Editor from "../components/editor/Editor";
import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteActionButtons from "../components/editor/WriteActionButtons";

const EditorPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <Editor />
        <WriteActionButtons />
      </Responsive>
    </>
  );
};

export default EditorPage;
