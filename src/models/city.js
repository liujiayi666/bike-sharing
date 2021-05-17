import * as request from "@/services/city/api";

const SUCCESS = '1';

export default {
  namespace: "city",
  state: {
    opencity: [],
    provinceList: {}
  },

  effects: {
    *getOpenCityByProvince({ payload }, { call, put }) {
      const response = yield call(request.getOpenCityByProvince, payload);
      return response;
    },
    *getProvinceList({ payload }, { call, put }) {
      const response = yield call(request.getProvinceList, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: { provinceList: response.data }
        });
      }
      return response
    },
    *getCityList({ payload }, { call, put }) {
      const response = yield call(request.getCityList, payload);
      return response;
    },
    *getOpenCityList({ payload }, { call, put }) {
      const response = yield call(request.getOpenCityList, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: { opencity: response.data }
        });
      }
      return response;
    },
    *findOpenCity({ payload }, { call, put }) {
      const response = yield call(request.findOpenCity, payload);
      return response;
    },
    *addOpenCity({ payload }, { call, put }) {
      const response = yield call(request.addOpenCity, payload);
      return response;
    },
    *closeCity({ payload }, { call, put }) {
      const response = yield call(request.closeCity, payload);
      return response;
    },
    *updateCityStatus({ payload }, { call, put }) {
      const response = yield call(request.updateCityStatus, payload);
      return response;
    },
    *findCityName({ payload }, { call, put }) {
      const response = yield call(request.findCityName, payload);
      return response;
    },
    *updateOpenCityInfo({ payload }, { call, put }) {
      const response = yield call(request.updateOpenCityInfo, payload);
      return response;
    },
    *findStaffsIdByCid({ payload }, { call, put }) {
      const response = yield call(request.findStaffsIdByCid, payload);
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