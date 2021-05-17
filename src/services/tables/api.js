import request from "@/utils/request";
import * as api from "./request-url";

//获取表格数据
export async function getTableData() {
  return request(api.getTbalesData);
}