import styled from "styled-components";

// const EditorBlock = styled.div`
//   @media;
// `;

const MainResponsiveBlock = styled.div`
  margin: 3rem auto;
  padding-bottom: 8rem;
  background-color: white;
  border-radius: 10px 10px 0 0;

  width: 1380px;

  @media (max-width: 1380px) {
    width: 100%;
  }

  @media (max-width: 1320px) {
    width: 1080px;
  }

  @media (max-width: 1080px) {
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 820px;
  }

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 786px) {
    width: 100%;
  }
`;

const MainResponsive = ({ children, ...rest }) => {
  return <MainResponsiveBlock {...rest}>{children}</MainResponsiveBlock>;
};

export default MainResponsive;
