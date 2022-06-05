import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import { useEffect } from "react";
import "../../../node_modules/quill/dist/quill.snow.css";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 5px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContainer = styled.div`
  font-size: 1rem;
  color: ${palette.gray[8]};
  img {
    max-width: 100%;
  }
`;
const PostViewer = ({ post, error, postId, loading }) => {
  // const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      if (error.response.status === 404) {
        return <PostViewerBlock> 존재하지 않는 포스트입니다. </PostViewerBlock>;
      } else if (error.response.status === 401) {
        return <PostViewerBlock> 권한이 없습니다. </PostViewerBlock>;
      } else {
        return <PostViewerBlock> Error! </PostViewerBlock>;
      }
    }
  }, []);

  if (loading || !post) {
    return null;
  }

  const { title, thumbnail, content } = post.data;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
      </PostHead>
      <PostContainer className="view ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
