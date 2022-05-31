import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "../../../node_modules/react-router-dom/index";

const AuthTemplateBlock = styled.div`
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 100px rbga(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background-color: white;
  border-radius: 20px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">OKRA SEOUL ADMIN</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
