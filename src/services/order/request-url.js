
export const getOrderData = '/admin/order';
export const getOrderDetail = '/admin/order/detail';

const prefix = "/api";
//获取所有订单列表
export const getOrderList = `${prefix}/api/getOrderList`;
//获取订单详情 地图页面
export const getDetail = `${prefix}/api/getDetail`;
//结束订单
export const finishOrder = `${prefix}/api/finishOrder`;
//按条件查询
export const findOrder = `${prefix}/api/findOrder`;
//获取城市经纬度
export const centerPointByOrderId = `${prefix}/api/centerPointByOrderId`;

