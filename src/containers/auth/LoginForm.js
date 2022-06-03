import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeField, initializeForm, login } from "../../modules/auth";
// import { check } from "../../modules/user";
import AuthForm from "../../components/auth/AuthForm";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { id, pw } = form;
    dispatch(login({ id, pw }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      const tokenPair = auth.headers.authorization;
      const tokens = tokenPair.split(" ");
      const accessToken = tokens[0];
      const refreshToken = tokens[1];
      const tokenPayload = JSON.parse(decodeURIComponent(escape(atob(refreshToken.split(".")[1]))));
      const userName = tokenPayload.name;

      try {
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("RefreshToken", refreshToken);
        localStorage.setItem("Name", userName);
      } catch (e) {
        console.log("localStorage is not working");
      }

      // dispatch(check({ id }));
    }
  }, [auth, form, authError, dispatch, user]);

  useEffect(() => {
    if (localStorage.getItem("AccessToken")) {
      navigate("/");
    }
  }, [auth, navigate]);

  return <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />;
};

export default LoginForm;
