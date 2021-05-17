import { notification, Modal } from "antd";

// get请求参数拼接
export function transformParams(params = {}) {
  const parts = [];
  Object.keys(params).forEach(key => {
    const val = params[key];
    if (val !== null && typeof val !== "undefined") {
      const temp = `${key}=${val}`;
      parts.push(temp);
    }
  });
  return parts.join("&");
}

//格式化时间
export function formatDate(time) {
  if (!time) { return 'error'; }
  let date = new Date(time);
  //年
  let year = date.getFullYear();
  //月
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  //日
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  //时
  let hour = date.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  //分
  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  //秒
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + seconds + '  ';
}
// 消息提示
export function NewsTips(description, params) {
  if (params) {
    const { type = "info", placement = "bottomRight" } = params;
    notification[type]({
      message: "消息提示",
      description,
      placement
    });
  } else {
    notification.open({
      message: "消息提示",
      description,
      placement: "bottomRight"
    });
  }
}
//加密
export function loginEncryption(userInfo) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUBLIC_KEY);
  return encrypt.encrypt(userInfo);
}
//
export function loginCheck(res) {
  if (res.code.toString() === '-1') {
    Modal.warning({
      title: '提示',
      content: '请登录！'
    })
    return
  }
}