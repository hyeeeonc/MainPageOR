import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";
import MainResponsive from "../components/common/MainResponsive";

const EditorPage = () => {
  return (
    <>
      <HeaderContainer />
      <MainResponsive>
        <Responsive>
          <EditorContainer />
          <WriteActionButtonsContainer />
        </Responsive>
      </MainResponsive>
    </>
  );
};

export default EditorPage;
