import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link } from "../../../node_modules/react-router-dom/index";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: black;
  color: white;
`;

const Wrapper = styled(Responsive)`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 3rem;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: right;
  }
`;

const Spacer = styled.div`
  height: 85px;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            OKRA SEOUL
          </Link>
          <div className="right">
            if() {}
            <Button to="/login">Sign In</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
