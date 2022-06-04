import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../../node_modules/react-redux/es/exports";
import Quill from "quill";
// import { Quill } from "../../../node_modules/quill/dist/quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import client from "../../lib/api/client";
import { changefield } from "../../modules/write";

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

const Editor = ({ title, content, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();

  // const adressId = useState(0);
  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await client.post("/api/v1/image/upload", formData);
        const IMG_URL = result.data.url;
        console.log(IMG_URL);
        addresses.push(IMG_URL);

        const quill = quillInstance.current; // 에디터 객체 가져오기
        // quill.root.innerHTML = quill.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
        const range = quill.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        quill.insertEmbed(range.index, "image", IMG_URL);
        // let copyAddresses = [...addresses];
        // console.log(copyAddresses);
        // setAddresses(copyAddresses);

        console.log(addresses);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: {
          container: [
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
          handlers: {
            image: imageHandler,
          },
        },
      },
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "content", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput placeholder="Title" onChange={onChangeTitle} value={title} />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
