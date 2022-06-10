import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "write/INITIALIZE";
const INITIALERROR = "write/INITIALERROR";

const CHANGE_FIELD = "write/CHANGE_FIELD";
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes("write/WRITE_POST");
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes(`write/UPDATE_POST`);

const SET_ORIGINAL_POST = `write_SET_ORIGINAL_POST`;

export const initialize = createAction(INITIALIZE);
export const initialError = createAction(INITIALERROR);

export const changefield = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const writePost = createAction(WRITE_POST, ({ boardId, title, thumbnail, content, selected, status }) => ({
  boardId,
  title,
  thumbnail,
  content,
  selected,
  status,
}));

export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

export const updatePost = createAction(UPDATE_POST, ({ id, boardId, title, thumbnail, content, selected, status }) => ({
  id,
  boardId,
  title,
  thumbnail,
  content,
  selected,
  status,
}));

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  boardId: 1,
  title: "",
  thumbnail: "",
  content: "",
  selected: false,
  status: "",
  address: [],
  post: null,
  postError: null,
  originalPostId: null,
};

export const initialErrorr = {
  postError: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,

    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      boardId: post.data.boardId,
      title: post.data.title,
      thumbnail: post.data.thumbnail,
      content: post.data.content,
      selected: false,
      status: post.data.status,
      originalPostId: post.data.postId,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
  {
    [INITIALERROR]: (state) => ({
      initialError,
    }),
  }
);

export default write;
