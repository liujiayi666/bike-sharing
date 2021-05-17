import * as request from "@/services/staff/api";

const SUCCESS = '1';

export default {
  namespace: "staff",
  state: {
    staffList: [],
    total: ''
  },

  effects: {
    *findAllStaffs({ payload }, { call, put }) {
      const response = yield call(request.findAllStaffs, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            total: response.data.total,
          }
        });
      }
      return response;
    },
    *findAllStaffsOfPaging({ payload }, { call, put }) {
      const response = yield call(request.findAllStaffsOfPaging, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            staffList: response.data.staffData,
          }
        });
      }
      return response;
    },
    *updateStaffOfCity({ payload }, { call, put }) {
      const response = yield call(request.updateStaffOfCity, payload);
      return response;
    },
    *addStaff({ payload }, { call, put }) {
      const response = yield call(request.addStaff, payload);
      return response;
    },
    *findStaffsByCid({ payload }, { call, put }) {
      const response = yield call(request.findStaffsByCid, payload);
      return response;
    },
    *addStaff({ payload }, { call, put }) {
      const response = yield call(request.addStaff, payload);

      return response;
    },
    *editStaff({ payload }, { call, put }) {
      const response = yield call(request.editStaff, payload);
      return response;
    },
    *isStaffnameRepeat({ payload }, { call, put }) {
      const response = yield call(request.isStaffnameRepeat, payload);
      return response;
    },
    *isStaffPhonenumberRepeat({ payload }, { call, put }) {
      const response = yield call(request.isStaffPhonenumberRepeat, payload);
      return response;
    },
    *isStaffIDcardRepeat({ payload }, { call, put }) {
      const response = yield call(request.isStaffIDcardRepeat, payload);
      return response;
    },
    *findStaff({ payload }, { call, put }) {
      const response = yield call(request.findStaff, payload);
      return response;
    },
    *deleteStaff({ payload }, { call, put }) {
      const response = yield call(request.deleteStaff, payload);
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