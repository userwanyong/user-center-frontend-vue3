import myAxios from "@/request.ts";
/**
 * 用户模块接口
 */

/**
 * 用户注册
 */
export const userRegister=async (params:any)=>{
  return myAxios.request({
    url:'/api/user/register',
    method:'POST',
    data:params
  })
}

/**
 * 用户登录
 */
export const userLogin=async (params:any)=>{
  return myAxios.request({
    url:'/api/user/login',
    method:'POST',
    data:params
  })
}

/**
 * 用户注销
 */
export const userLogout=async ()=>{
  return myAxios.request({
    url:'/api/user/logout',
    method:'POST',
  })
}

/**
 * 删除用户
 */
export const userDelete=async (id:string)=>{
  return myAxios.request({
    url:'/api/user/delete'+'/'+id,
    method:'POST',
  })
}

/**
 * 获取当前用户
 */
export const getCurrentUser=async ()=>{
  return myAxios.request({
    url:'/api/user/current',
    method:'GET',
  })
}

/**
 * 获取用户列表
 */
export const searchUsers=async (username:any)=>{
  return myAxios.request({
    url:'/api/user/list',
    method:'GET',
    params:{
      username
    }
  })
}
