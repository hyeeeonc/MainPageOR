import styled from "styled-components";

const ResponsiveBlock = styled.div`
  width: 1320px;
  margin: 0 auto;

  @media (max-width: 1320px) {
    width: 1024px;
  }

  @media (max-width: 1024px) {
    width: 786px;
  }

  @media (max-width: 786px) {
    padding-left: 1rem;
    padding-right: 1rem;

    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
