import React from "react";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "../../../node_modules/react-redux/es/exports";
import Quill from "quill";
// import { Quill } from "../../../node_modules/quill/dist/quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import client from "../../lib/api/client";
import Reissue from "../../lib/api/auth";
import { changefield } from "../../modules/write";

const EditorBlock = styled(Responsive)`
  padding: 2rem 0 5rem 0;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding: 3rem 0;
  border: none;
  border-bottom: 5px solid ${palette.gray[2]};

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

const QuillThumbWrapper = styled.div`
  margin-top: 1rem;
  width: 300px;
  .ql-editor {
    padding: 0;
    min-height: 30px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  select {
    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }
`;

const Editor = ({ title, content, thumbnail, BoardId, selected, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const quillThumbElement = useRef(null);
  const quillThumbInstance = useRef(null);

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
        const accessToken = localStorage.getItem("AccessToken");
        const result = await client.post("/api/v1/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        });

        const IMG_URL = result.data.url;
        const IMG_FILE = result.data.file;
        addresses.push(IMG_FILE);
        console.log(addresses);
        dispatch(changefield({ key: "address", value: addresses }));

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
        const accessToken = localStorage.getItem("AccessToken");
        const refreshToken = localStorage.getItem("RefreshToken");

        async function setReissue() {
          const response = await Reissue({ accessToken, refreshToken });
          if (response.status === 400) {
            // setError("잠시 후 다시 시도해 주세요.");
            return;
          } else if (response.status === 401) {
            // setError("권한이 만료되었습니다. 다시 로그인해 주세요.");
            return;
          } else if (response.status === 200) {
            const tokenPair = response.headers.authorization;
            const tokens = tokenPair.split(" ");
            const accessToken = tokens[0];

            try {
              localStorage.setItem("AccessToken", accessToken);

              const result = await client.post("/api/v1/image/upload", formData, {
                headers: {
                  // "Content-Type": "multipart/form-data",
                  Authorization: accessToken,
                },
              });

              const IMG_URL = result.data.url;
              const IMG_FILE = result.data.file;
              addresses.push(IMG_FILE);
              dispatch(changefield({ key: "address", value: addresses }));

              const quill = quillInstance.current; // 에디터 객체 가져오기
              // quill.root.innerHTML = quill.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
              const range = quill.getSelection();
              // 가져온 위치에 이미지를 삽입한다
              quill.insertEmbed(range.index, "image", IMG_URL);
            } catch (e) {
              console.log("localStorage is not working");
            }
          }
        }
        setReissue();

        console.log(error);
      }
    });
  };

  const imageThumbHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const accessToken = localStorage.getItem("AccessToken");
        const result = await client.post("/api/v1/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        });

        const IMG_URL = result.data.url;

        const quill = quillThumbInstance.current; // 에디터 객체 가져오기
        // quill.root.innerHTML = quill.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
        const range = quill.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        quill.insertEmbed(range.index, "image", IMG_URL);

        // let copyAddresses = [...addresses];
        // console.log(copyAddresses);
        // setAddresses(copyAddresses);

        console.log(addresses);
      } catch (error) {
        const accessToken = localStorage.getItem("AccessToken");
        const refreshToken = localStorage.getItem("RefreshToken");

        async function setReissue() {
          const response = await Reissue({ accessToken, refreshToken });
          if (response.status === 400) {
            // setError("잠시 후 다시 시도해 주세요.");
            return;
          } else if (response.status === 401) {
            // setError("권한이 만료되었습니다. 다시 로그인해 주세요.");
            return;
          } else if (response.status === 200) {
            const tokenPair = response.headers.authorization;
            const tokens = tokenPair.split(" ");
            const accessToken = tokens[0];

            try {
              localStorage.setItem("AccessToken", accessToken);

              const result = await client.post("/api/v1/image/upload", formData, {
                headers: {
                  // "Content-Type": "multipart/form-data",
                  Authorization: accessToken,
                },
              });

              const IMG_URL = result.data.url;

              const quill = quillThumbInstance.current; // 에디터 객체 가져오기
              // quill.root.innerHTML = quill.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
              const range = quill.getSelection();
              // 가져온 위치에 이미지를 삽입한다
              quill.insertEmbed(range.index, "image", IMG_URL);
            } catch (e) {
              console.log("localStorage is not working");
            }
          }
        }
        setReissue();

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
    quill.on("text-change", (delta, oldDelta) => {
      onChangeField({ key: "content", value: quill.root.innerHTML });
    });
  }, [onChangeField]);

  useEffect(() => {
    quillThumbInstance.current = new Quill(quillThumbElement.current, {
      theme: "snow",
      placeholder: "썸네일 등록",
      modules: {
        toolbar: {
          container: [["image"]],
          handlers: {
            image: imageThumbHandler,
          },
        },
      },
    });

    const quill = quillThumbInstance.current;
    quill.on("text-change", (delta, oldDelta) => {
      onChangeField({ key: "thumbnail", value: quill.root.innerHTML });
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
    quillThumbInstance.current.root.innerHTML = thumbnail;
  }, [content, thumbnail]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  const onChangeBoardId = (e) => {
    onChangeField({ key: "boardId", value: e.target.value });
  };

  const onChangeThumb = (e) => {
    onChangeField({ key: "selected", value: e.target.checked });
  };

  return (
    <EditorBlock>
      <TitleInput placeholder="Title" onChange={onChangeTitle} value={title} />

      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>

      <BottomContainer>
        <QuillThumbWrapper>
          <div ref={quillThumbElement} />
        </QuillThumbWrapper>
        <select name="BoardId" onChange={onChangeBoardId} value={BoardId}>
          <option value="1">Festival</option>
          <option value="2">Concerts</option>
          <option value="3">Party</option>
        </select>
        <input type="checkbox" name="selected" onChange={onChangeThumb} value={selected} /> Main Page Thumbnail 게시
      </BottomContainer>

      {/* <input type="checkbox" vlaue="2">
        Concerts
      </input>
      <input type="checkbox" vlaue="3">
        Party
      </input> */}
    </EditorBlock>
  );
};

export default Editor;
