/**
 * api接口统一管理
 */
import { get,post, $delete, put } from "./http";
import da from "element-ui/src/locale/lang/da";

// 登录
export const apiLogin = data => post("api/user/admin/login",data)
// 上传轮播图
export const apiUploadCarouse = data => post("/api/carouse/admin/upload",data)
// 获得轮播图列表
export const apiGetCarouseList = data => get("/api/carouse/admin/getList",data)
// 删除轮播图
export const apiDeleteCarouse = data => get("/api/carouse/admin/delete",data)
// 获取分区板块列表
export const apiGetForums = data => get("api/forums/admin/getForums", data)
// 添加分区板块
export const apiAddForums = data => post("api/forums/admin/add",data)
// 修改分区板块
export const apiUpdateForums = data => post("api/forums/admin/update",data)
// 删除分区板块
export const apiDeleteForums = data => post("api/forums/admin/delete",data)
// 获取子版块上级分区板块列表
export const apiGetSubForums = data => get("api/forums/admin/list", data)
// 获取所有板块与分区
export const apiGetAllForums = data => get("api/forums/admin/getForumsList",data)
// 获取帖子
export const apiGetTopic = data => get("api/topic/admin/getForumsTopic",data)
// 删除帖子
export const apiDeleteTopic = data => post("api/topic/admin/delete",data)
// 获取所有用户
export const apiGetAllUser = data => get("api/user/admin/list",data)
// 修改用户信息
export const apiUpdateUser = data => post("api/user/admin/update",data)
// 删除用户
export const apiDeleteUser = data => post("api/user/admin/delete",data)
