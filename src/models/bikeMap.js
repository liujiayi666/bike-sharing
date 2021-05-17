import * as request from "@/services/bikeMap/api";

const SUCCESS = '1';

export default {
  namespace: "bikeMap",
  state: {
    centerPoint: [],
    markPoint: [],
    allPoint: []
  },

  effects: {
    *getLonLatOfCity({ payload }, { call, put }) {
      const response = yield call(request.getLonLatOfCity, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            centerPoint: response.data.centerpoint,
            markPoint: response.data.point
          }
        })
      }
      return response;
    },
    *getAllMarker({ payload }, { call, put }) {
      const response = yield call(request.getAllMarker, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            allPoint: response.data.point
          }
        })
      }
      return response;
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