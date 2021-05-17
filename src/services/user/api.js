import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams } from '../../utils/utils';

const METHODE = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT'
};

//根据操作者id 查找名字
export async function findUsernameById(params = {}) {
  return request(`${api.findUsernameById}?${transformParams(params)}`);
}
//用户名是否重复
export async function usernameIsRepeat(params = {}) {
  return request(`${api.usernameIsRepeat}?${transformParams(params)}`);
}
//修改用户名
export async function alterUsername({ params }) {
  return request(api.alterUsername, {
    method: METHODE.POST,
    body: { ...params }
  });
}

//修改密码
export async function alterPassword({ params }) {
  return request(api.alterPassword, {
    method: METHODE.POST,
    body: { ...params }
  });
}