// import { useRef, useEffect, useState } from "react";
// import Quill from "quill";
// // import { Quill } from "../../../node_modules/quill/dist/quill";
// import "quill/dist/quill.snow.css";
// import styled from "styled-components";
// import palette from "../../lib/styles/palette";
// import Responsive from "../common/Responsive";
// import axios from "../../../node_modules/axios/index";

// const EditorBlock = styled(Responsive)`
//   padding: 5rem 0;
// `;

// const TitleInput = styled.input`
//   font-size: 3rem;
//   outline: none;
//   padding: 0.5rem 0;
//   border: none;
//   border-bottom: 1px solid ${palette.gray[4]};
//   margin-bottom: 2rem;
//   width: 100%;
// `;

// const QuillWrapper = styled.div`
//   .ql-editor {
//     padding: 0;
//     min-height: 320px;
//     font-size: 1.125rem;
//     line-height: 1.5;
//   }
//   .ql-editor .ql-blank::before {
//     left: 0px;
//   }
// `;

// const Editor = ({ title, content, onChangeField }) => {
//   const quillElement = useRef(null);
//   const quillInstance = useRef(null);

//   useEffect(() => {
//     // const [value, setValue] = useState("");
//     const quillRef = useRef();
//     const imageHandler = () => {
//       const input = document.createElement("input");

//       input.setAttribute("type", "file");
//       input.setAttribute("accept", "image/*");
//       input.click();

//       input.addEventListener("change", async () => {
//         const file = input.files[0];
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//           const result = await axios.post("http://49.50.174.103:3000/api/v1/image/upload", formData);
//           console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);
//           const IMG_URL = result.data.url;

//           const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기

//           const range = editor.getSelection();
//           editor.insertEmbed(range.index, "image", IMG_URL);
//         } catch (error) {
//           console.log("실패했어요ㅠ");
//         }
//       });
//     };

//     quillInstance.current = new Quill(quillElement.current, {
//       theme: "snow",
//       placeholder: "내용을 작성하세요...",
//       modules: {
//         toolbar: [
//           // [{ header: "1" }, { header: "2" }],
//           // ["bold", "italic", "underline", "strike"],
//           // [{ list: "ordered" }, { list: "bullet" }],
//           // ["blockquote", "code-block", "link", "image"],
//           [{ align: [] }],
//           [{ header: [1, 2, 3, 4, 5, 6, false] }],
//           [{ size: ["small", false, "large", "huge"] }], // custom dropdown

//           ["bold", "italic", "underline", "strike"], // toggled buttons

//           ["blockquote", "code-block"],

//           [{ list: "ordered" }, { list: "bullet" }],
//           [{ script: "sub" }, { script: "super" }], // superscript/subscript
//           [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//           [{ direction: "rtl" }], // text direction

//           [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//           ["image"],
//         ],
//       },
//     });

//     const quill = quillInstance.current;
//     quill.on("text-change", (delta, oldDelta, source) => {
//       if (source === "user") {
//         onChangeField({ key: "content", value: quill.root.innerHTML });
//       }
//     });
//   }, [onChangeField]);

//   const onChangeTitle = (e) => {
//     onChangeField({ key: "title", value: e.target.value });
//   };

//   return (
//     <EditorBlock>
//       <TitleInput placeholder="Title" onChange={onChangeTitle} value={title} />
//       <QuillWrapper>
//         <div ref={quillElement} />
//       </QuillWrapper>
//     </EditorBlock>
//   );
// };

// export default Editor;
