import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";
const PaginationButton = styled(Button)`
  font-size: 2rem;
  border: none;
  background-color: inherit;
  cursor: pointer;
  display: inline-block;
  color: #999999;
  :hover {
    background-color: inherit;
    color: #666666;
  }
  :disabled {
    background-color: inherit;
    color: #999999;
  }
`;
const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div`
  font-size: 2rem;
  color: white;
  text-align: center;
  min-width: 40rem;
  letter-spacing: 1rem;
`;

// const PageInput = styled.input`
//   widdth = 0.5rem;
// `;
// input 박스로 페이지네이션 하기

const buildLink = ({ page }) => {
  const query = qs.stringify({ page });
  return `/?${query}`;
};

const Pagination = ({ page, lastPage }) => {
  return (
    <PaginationBlock>
      <PaginationButton
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ page: page - 1 })}
      >
        &lt;Down
      </PaginationButton>
      <PageNumber>{page + " | " + lastPage}</PageNumber>
      <PaginationButton
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildLink({ page: page + 1 })}
      >
        Up&gt;
      </PaginationButton>
    </PaginationBlock>
  );
};

export default Pagination;
