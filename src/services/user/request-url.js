const prefix = "/api";

//根据操作者id 查找名字
export const findUsernameById = `${prefix}/api/findUsernameById`;
//用户名是否重复
export const usernameIsRepeat = `${prefix}/api/usernameIsRepeat`;
//修改用户名
export const alterUsername = `${prefix}/api/alterUsername`;
//修改密码
export const alterPassword = `${prefix}/api/alterPassword`;
