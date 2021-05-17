import request from "@/utils/request";
import * as api from "./request-url";
import { transformParams, transformObject } from '../../utils/utils';
const METHODE = {
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
//获取全部城市管理员信息 不分页
export async function findRate({ cid }) {
  return request(api.findRate, {
    method: METHODE.POST,
    body: {
      cid
    }
  });
}
