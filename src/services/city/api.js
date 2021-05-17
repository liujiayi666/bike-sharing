import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams, transformObject } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
//获取城市信息 开通
export async function getOpenCityByProvince(params = {}) {
  console.log(params);
  return request(`${api.getOpenCityByProvince}?${transformParams(params)}`);
}
//获取省份
export async function getProvinceList(params = {}) {
  return request(`${api.getProvinceList}?${transformParams(params)}`);
}
//获取对应所有城市
export async function getCityList(params = {}) {
  return request(`${api.getCityList}?${transformParams(params)}`);
}
//获取所有已开通城市
export async function getOpenCityList(params = {}) {
  return request(`${api.getOpenCityList}?${transformParams(params)}`);
}

//查询开通城市的信息
// export async function findOpenCity(params = {}) {
//   console.log(params);
//   return request(`${api.findOpenCity}?${transformParams(params)}`);
// }

export async function findOpenCity({
  pid,
  cid,
  bike_modelcode,
  business_modelcode,
  league_accreditcode,
  pageSize,
  pageNumber
}) {
  return request(api.findOpenCity, {
    method: METHODE.POST,
    body: {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode,
      pageSize,
      pageNumber
    }
  })
}
//通城市后 更新city_table的status =1
export async function updateCityStatus(params = {}) {
  return request(`${api.updateCityStatus}?${transformParams(params)}`);
}

//根据cid查询的staffid  
export async function findStaffsIdByCid(params = {}) {
  return request(`${api.findStaffsIdByCid}?${transformParams(params)}`);
}

//开通城市
export async function addOpenCity({ params }) {
  return request(api.addOpenCity, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}

//编辑城市
export async function updateOpenCityInfo({ params }) {
  return request(api.updateOpenCityInfo, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}
//关闭城市
export async function closeCity(params = {}) {
  return request(`${api.closeCity}?${transformParams(params)}`);
}
//根据cid查找城市名称
export async function findCityName(params = {}) {
  return request(`${api.findCityName}?${transformParams(params)}`);
}

