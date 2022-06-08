import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { logout } from "../lib/api/auth";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes("auth/REGISTER");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("auth/LOGIN");

// const [REISSUE, REISSUE_SUCCESS, REISSUE_FAILURE] = createRequestActionTypes("auth/reissue");

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, //register, login
  key, // id, pw ...
  value, // 바뀌는 값
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register, login

export const register = createAction(REGISTER, ({ id, pw, name, email, phone, accessToken }) => ({
  id,
  pw,
  name,
  email,
  phone,
  accessToken,
}));

export const login = createAction(LOGIN, ({ id, pw }) => ({
  id,
  pw,
}));

export const doLogout = async () => {
  try {
    await logout();
    localStorage.clear();

    window.location.replace("/");
  } catch (e) {
    localStorage.clear();
    alert("일시적인 오류가 발생했습니다.");
    window.location.replace("/");
  }
};

// export const reissue = createAction(REISSUE, ({ accessToken, refreshToken }) => ({
//   accessToken,
//   refreshToken,
// }));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
// const reissueSaga = createRequestSaga(REISSUE, authAPI.reissue);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  // yield takeLatest(REISSUE, reissueSaga);
}

const initialState = {
  register: {
    id: "",
    pw: "",
    pwConfirm: "",
    name: "",
    email: "",
    phone: "",
  },
  login: {
    id: "",
    pw: "",
  },
  auth: null,
  authError: null,
  // reissue: null,
  // reissueError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      auth: null,
      authError: null,
    }),

    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    // [REISSUE_SUCCESS]: (state, { payload: reissue }) => ({
    //   ...state,
    //   reissueError: null,
    //   reissue,
    // }),

    // [REISSUE_FAILURE]: (state, { payload: error }) => ({
    //   ...state,
    //   reissue: error,
    // }),
  },
  initialState
);

export default auth;
