import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams, transformObject } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
//获取指定城市的车辆地图
export async function getLonLatOfCity({ cid }) {
  return request(api.getLonLatOfCity, {
    method: METHODE.POST,
    body: {
      cid
    }
  });
}
//获取所有车辆的地图
export async function getAllMarker(params = {}) {
  return request(`${api.getAllMarker}?${transformParams(params)}`);
}