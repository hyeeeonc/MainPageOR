import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";

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
  justify-contents: space-between;
  .logo {
    font-size: 1.2rem;
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
          <div className="logo">OKRA SEOUL</div>
          <div className="right">
            <Button>Sign In</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
