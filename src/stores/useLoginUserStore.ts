import { ref } from "vue";
import { defineStore } from "pinia";
import { getCurrentUser } from "@/api/user.ts";

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser=ref<any>({
    username:"未登录"
  });

  //远程获取用户信息
  async function fetchLoginUser(){
    const res=await getCurrentUser();
    //TODO 这里的status与后端定义的要对应,状态码也是！
    if (res.data.status===200&&res.data.data){
      loginUser.value=res.data.data;
    }
  }

  //单独设置登录用户信息
  function setLoginUser(newLoginUser:any){
    loginUser.value=newLoginUser;
  }

  return {loginUser,fetchLoginUser,setLoginUser}
})
