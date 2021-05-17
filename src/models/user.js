import * as request from "@/services/user/api";

const SUCCESS = '1';

export default {
  namespace: "user",
  state: {
    userData: []
  },

  effects: {
    //获取所有员工信息
    *findUsernameById({ payload }, { call, put }) {
      const response = yield call(request.findUsernameById, payload);
      // if (response.code.toString() === SUCCESS) {
      //   yield put({
      //     type: "stateWillUpdate",
      //     payload: { userData: response.data }
      //   });
      // }
      return response
    },
    //用户名是否重复
    *usernameIsRepeat({ payload }, { call, put }) {
      const response = yield call(request.usernameIsRepeat, payload);
      return response
    },
    //修改用户名
    *alterUsername({ payload }, { call, put }) {
      const response = yield call(request.alterUsername, payload);
      return response
    },
    //修改密码
    *alterPassword({ payload }, { call, put }) {
      const response = yield call(request.alterPassword, payload);
      return response
    },
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }

  }

}