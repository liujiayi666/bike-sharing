import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams, transformObject } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
//get 获取公钥
export async function getPublicKey(params = {}) {
  return request(`${api.getPublicKey}?${transformParams(params)}`);
}
//登录
export async function userLogin({
  username,
  password
}) {
  return request(api.userLogin, {
    method: METHODE.POST,
    body: {
      username,
      password
    }
  })
}
//退出登录
export async function loginout(params = {}) {
  return request(`${api.loginout}?${transformParams(params)}`);
}