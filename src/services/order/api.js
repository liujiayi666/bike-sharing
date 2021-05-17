import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
//获取订单的数据
export async function getOrderData(params = {}) {
  return request(`${api.getOrderData}?${transformParams(params)}`);
}

//获取订单详情
export async function getOrderDetail(params = {}) {
  return request(`${api.getOrderDetail}?${transformParams(params)}`);
}

//获取所有订单列表
export async function getOrderList(params = {}) {
  return request(`${api.getOrderList}?${transformParams(params)}`);
}
//获取订单详情 地图页面
export async function getDetail(params = {}) {
  return request(`${api.getDetail}?${transformParams(params)}`);
}
//结束订单
export async function finishOrder(params = {}) {
  return request(`${api.finishOrder}?${transformParams(params)}`);
}
//按条件查询
export async function findOrder({ params }) {
  return request(api.findOrder, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}
//获取城市经纬度
export async function centerPointByOrderId(params = {}) {
  return request(`${api.centerPointByOrderId}?${transformParams(params)}`);
}