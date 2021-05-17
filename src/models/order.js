import * as request from '@/services/order/api';

const SUCCESS = "1";

export default {
  namespace: 'order',
  state: {
    orderList: [],
    total: '',
    detailList: {},
    position_list: [],
    area_list: []
  },

  effects: {
    *getOrderList({ payload }, { call, put }) {
      const response = yield call(request.getOrderList, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            orderList: response.data.listData,
            total: response.data.total
          }
        });
      }
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(request.getDetail, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            detailList: response.data.detailList,
            position_list: response.data.position_list,
            area_list: response.data.area_list
          }
        });
      }
      return response;
    },
    *finishOrder({ payload }, { call, put }) {
      const response = yield call(request.finishOrder, payload);
      return response;
    },
    *findOrder({ payload }, { call, put }) {
      const response = yield call(request.findOrder, payload);
      if (response.code.toString() === SUCCESS) {
        yield put({
          type: "stateWillUpdate",
          payload: {
            orderList: response.data.orderList,
            total: response.data.total
          }
        });
      }
      return response;
    },
    *centerPointByOrderId({ payload }, { call, put }) {
      const response = yield call(request.centerPointByOrderId, payload);
      return response;
    },
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  }
}