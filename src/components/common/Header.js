import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link } from "../../../node_modules/react-router-dom/index";
import { logout } from "../../modules/auth";

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  background: black;
  color: white;
  border-bottom: 1px solid white;
`;

const Wrapper = styled(Responsive)`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: -0.5px;
  }
  .right {
    display: flex;
    align-items: right;
  }
`;

const UserInfo = styled.div`
  display: flex;
  font-weight: 600;
  margin-right: 1rem;
  align-items: center;
`;

const LocalNavBlock = styled.div`
  position: fixed;
  z-index: 5;
  top: 86px;
  width: 100%;
  background: black;
  color: white;
`;

const LocalNavWrapper = styled(Responsive)`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LocalNavLink = styled(Link)`
  font-size: 0.8rem;
  font-weight: 600;
`;

const Spacer130 = styled.div`
  height: 130px;
`;

const Spacer85 = styled.div`
  height: 130px;
`;

const Header = ({ user }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            OKRASEOUL
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user}</UserInfo>
              <Button onClick={logout}>Sign Out</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">Sign In</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      {user ? (
        <>
          <LocalNavBlock>
            <LocalNavWrapper>
              <LocalNavLink to="/editor">New Post</LocalNavLink>
              <LocalNavLink to="#">Google analytics</LocalNavLink>
              <LocalNavLink to="/register">Add Administrator</LocalNavLink>
            </LocalNavWrapper>
          </LocalNavBlock>
          <Spacer130 />
        </>
      ) : (
        <>
          <Spacer85 />
        </>
      )}
    </>
  );
};

export default Header;
