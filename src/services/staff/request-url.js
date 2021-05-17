const prefix = "/api";

//获取全部城市管理员信息 不分页
export const findAllStaffs = `${prefix}/api/findAllStaffs`;
//获取全部城市管理员信息 分页
export const findAllStaffsOfPaging = `${prefix}/api/findAllStaffsOfPaging`;
//添加城市管理员管理城市信息 一个城市 可以有多个管理员 管理员id是数组
export const updateStaffOfCity = `${prefix}/api/updateStaffOfCity`;
//关闭城市后  城市管理员的管理城市id清空
export const updateManegeCity = `${prefix}/api/updateManegeCity`;
//通过城市id 查找城市管理员
export const findStaffsByCid = `${prefix}/api/findStaffsByCid`;
//添加员工
export const addStaff = `${prefix}/api/addStaff`;
//编辑员工
export const editStaff = `${prefix}/api/editStaff`;
//员工名字查重
export const isStaffnameRepeat = `${prefix}/api/isStaffnameRepeat`;
//员工电话号码查重
export const isStaffPhonenumberRepeat = `${prefix}/api/isStaffPhonenumberRepeat`;
//员工身份证查重
export const isStaffIDcardRepeat = `${prefix}/api/isStaffIDcardRepeat`;
//按条件查询满足条件员工
export const findStaff = `${prefix}/api/findStaff`;
//删除员工
export const deleteStaff = `${prefix}/api/deleteStaff`;