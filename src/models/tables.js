import * as request from "@/services/tables/api";

const SUCCESS = "1";

export default {
  namespace: "tables",

  state: {
    table: []
  },

  effects: {
    *getTableData({ payload }, { call, put }) {
      const response = yield call(request.getTableData, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "saveTableData",
          payload: response.data
        });
      }
    }
  },
  reducers: {
    saveTableData(state, action) {
      return {
        ...state,
        table: action.payload
      }
    }
  }

}