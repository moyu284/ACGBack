/**
 * api接口统一管理
 */
import { get,post, $delete, put } from "./http";
import da from "element-ui/src/locale/lang/da";

// 获取导航栏列表
export const apiGetForums = data => get("api/forums/getForums", data)
// 获得版块列表
export const apiGetFormsName = data => get("api/forums/getName",data)
// 获取帖子详情
export const apiGetThreads = data => get("api/threads/getThread",data)
// 获取帖子所在版块的最热话题
export const apiGetThreadsHotTopic = data => get("api/topic/getThreadsHotTopic",data)
// 获得帖子评论
export const apiComment = data => get("api/threads/getComment",data)
// 发表评论
export const apiSubmitComment = data => post("api/threads/submitComment",data)
// 获得版面帖子列表
export const apiGetForumsTopic = data => get("api/topic/getForumsTopic",data)
// 上传头像
export const apiUploadHeader = data => post("api/user/changeHeader",data)
// 发帖与回复上传图片
export const apiUploadImage = data => post("tinymce/imageUpload",data)
// 获取首页帖子列表
export const apiGetLatestList = data => get("api/topic/getLatestList",data)
// 获取首页热门话题
export const apiGetHotTopic = data => get("api/topic/getHotTopic",data)
// 登录
export const apiLogin = data => post("api/user/login",data)
// 更新个人信息
export const apiUpdateUserInfo = data => post("api/user/updateInfo",data)
// 注册
export const apiRegister = data => post("api/user/register",data)
// 发表帖子
export const apiSubmitThreads = data => post("api/threads/submitThreads",data)
