import { useRef, useEffect } from "react";
import Quill from "quill";
// import { Quill } from "../../../node_modules/quill/dist/quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";

const EditorBlock = styled(Responsive)`
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          // [{ header: "1" }, { header: "2" }],
          // ["bold", "italic", "underline", "strike"],
          // [{ list: "ordered" }, { list: "bullet" }],
          // ["blockquote", "code-block", "link", "image"],
          [{ align: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown

          ["bold", "italic", "underline", "strike"], // toggled buttons

          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["image"],
        ],
      },
    });
  }, []);

  return (
    <EditorBlock>
      <TitleInput placeholder="Title" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
