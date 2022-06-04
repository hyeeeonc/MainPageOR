import { useEffect, useCallback } from "react";
import Editor from "../../components/editor/Editor";
import { useSelector, useDispatch } from "../../../node_modules/react-redux/es/exports";
import { changefield, initialize } from "../../modules/write";

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { boardId, title, thumbnail, content, status } = useSelector(({ write }) => ({
    boardId: write.boardId,
    title: write.title,
    thumbnail: write.thumbnail,
    content: write.content,
    status: write.status,
    addresses: write.addresses,
  }));

  const onChangeField = useCallback((payload) => dispatch(changefield(payload)), [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} content={content} />;
};

export default EditorContainer;
