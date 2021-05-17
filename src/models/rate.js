import * as request from "@/services/rate/api";

const SUCCESS = '1';

export default {
  namespace: "rate",
  state: {
    data: {}
  },

  effects: {
    *findRate({ payload }, { call, put }) {
      const response = yield call(request.findRate, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            data: response.data
          }
        });
      }
      return response;
    }
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