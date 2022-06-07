import styled from "styled-components";
import palette from "../../lib/styles/palette";

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.3rem;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
`;

const PostAcitonButtons = () => {
  return (
    <PostActionButtonsBlock>
      <ActionButton>수정</ActionButton>
      <ActionButton>삭제</ActionButton>
    </PostActionButtonsBlock>
  );
};

export default PostAcitonButtons;
