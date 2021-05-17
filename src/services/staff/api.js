import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams, transformObject } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};

//获取全部城市管理员信息 不分页
export async function findAllStaffs(params = {}) {
  return request(`${api.findAllStaffs}?${transformParams(params)}`);
}

//查询所有城市管理员  分页
export async function findAllStaffsOfPaging(params = {}) {
  return request(`${api.findAllStaffsOfPaging}?${transformParams(params)}`);
}

//添加城市管理员管理城市信息 一个城市 可以有多个管理员 管理员id是数组
export async function updateStaffOfCity(params = {}) {
  return request(`${api.updateStaffOfCity}?${transformParams(params)}`);
}
//关闭城市后  城市管理员的管理城市id清空
export async function updateManegeCity(params = {}) {
  return request(`${api.updateManegeCity}?${transformParams(params)}`);
}

//通过城市id 查找城市管理员
export async function findStaffsByCid(params = {}) {
  return request(`${api.findStaffsByCid}?${transformParams(params)}`);
}

//添加员工
export async function addStaff({ params }) {
  return request(api.addStaff, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}
//编辑员工
export async function editStaff({ params }) {
  return request(api.editStaff, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}
//员工名字查重
export async function isStaffnameRepeat(params = {}) {
  return request(`${api.isStaffnameRepeat}?${transformParams(params)}`);
}
//员工电话号码查重
export async function isStaffPhonenumberRepeat(params = {}) {
  return request(`${api.isStaffPhonenumberRepeat}?${transformParams(params)}`);
}
//员工身份证查重
export async function isStaffIDcardRepeat(params = {}) {
  return request(`${api.isStaffIDcardRepeat}?${transformParams(params)}`);
}
//按条件查询满足条件员工
export async function findStaff({ params }) {
  return request(api.findStaff, {
    method: METHODE.POST,
    body: {
      ...params
    }
  });
}
//删除员工
export async function deleteStaff(params = {}) {
  return request(`${api.deleteStaff}?${transformParams(params)}`);
}