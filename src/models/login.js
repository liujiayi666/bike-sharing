import * as request from "@/services/login/api";

const SUCCESS = '1';

export default {
  namespace: "login",
  state: {
    publicKey: localStorage.getItem("publicKey") || "",
    username: localStorage.getItem("username") || "",
    userid: localStorage.getItem("userid") || ""
  },
  effects: {
    *getPublicKey({ payload }, { call, put }) {
      const response = yield call(request.getPublicKey, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "savePublicKey",
          payload: { publicKey: response.data.publicKey }
        });
      }
      return response;
    },
    *userLogin({ payload }, { call, put }) {
      const response = yield call(request.userLogin, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "saveUser",
          payload: {
            username: response.data.username,
            userid: response.data.userid
          }
        });
      }
      return response
    },
    *loginout({ payload }, { call, put }) {
      const response = yield call(request.loginout, payload);
      return response
    }
  },
  reducers: {
    savePublicKey(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    saveUser(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }

  }
}