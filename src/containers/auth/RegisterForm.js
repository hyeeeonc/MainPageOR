import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
// import { check } from "../../modules/user";
import { useNavigate } from "react-router-dom";
import Reissue from "../../lib/api/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [idError, setIdError] = useState(null);
  const [pwError, setPwError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { id, pw, pwConfirm, name, email, phone } = form;
    // 하나라도 비어있다면
    if ([id, pw, pwConfirm, name, email, phone].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (pw !== pwConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(changeField({ form: "register", key: "passwordConfirm", value: "" }));
      return;
    }
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }
    dispatch(register({ id, pw, name, email, phone, accessToken }));
  };
  // const yserid = set[0];

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 401) {
        const accessToken = localStorage.getItem("AccessToken");
        const refreshToken = localStorage.getItem("RefreshToken");

        if (!accessToken || !refreshToken) {
          setError("권한이 없습니다.");
          return;
        }

        async function setReissue() {
          const response = await Reissue({ accessToken, refreshToken });
          if (response.status === 400) {
            setError("잠시 후 다시 시도해 주세요.");
            return;
          } else if (response.status === 401) {
            setError("권한이 만료되었습니다. 다시 로그인해 주세요.");
            return;
          } else if (response.status === 200) {
            const tokenPair = response.headers.authorization;
            const tokens = tokenPair.split(" ");
            const accessToken = tokens[0];
            const refreshToken = tokens[1];

            try {
              localStorage.setItem("AccessToken", accessToken);
              localStorage.setItem("RefreshToken", refreshToken);

              const { id, pw, name, email, phone } = form;
              dispatch(register({ id, pw, name, email, phone, accessToken }));
            } catch (e) {
              console.log("localStorage is not working");
            }
          }
        }
        setReissue();

        return;
      }

      if (authError.response.status === 422) {
        setIdError(authError.response.data.id);
        setPwError(authError.response.data.pw);
        setNameError(authError.response.data.name);
        setEmailError(authError.response.data.email);
        setPhoneError(authError.response.data.phone);
        return;
      }

      setError("일시적인 오류가 발생했습니다 잠시 후 다시 시도해 주세요.");
      return;
    }

    if (auth) {
      console.log("회원가입 성공");
      // dispatch(check());
    }
  }, [form, auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      navigate("/"); // 홈 화면으로 이동
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      idError={idError}
      pwError={pwError}
      nameError={nameError}
      emailError={emailError}
      phoneError={phoneError}
    />
  );
};

export default RegisterForm;
