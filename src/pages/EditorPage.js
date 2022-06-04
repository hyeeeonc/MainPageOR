import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";
import styled from "styled-components";

const Spacer = styled.div`
  height: 100px;
`;

const EditorPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <EditorContainer />
        <WriteActionButtonsContainer />
      </Responsive>
      <Spacer />
    </>
  );
};

export default EditorPage;
