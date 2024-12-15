import router from "@/router";
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";
import { message } from "ant-design-vue";

/**
 * 全局权限校验
 */
router.beforeEach(async (to, from, next) => {
  const  loginUserStore=useLoginUserStore()
  const loginUser=loginUserStore.loginUser
  const toUrl=to.fullPath
  if (toUrl.startsWith('/admin')){
    //TODO 这里0是管理员
    if (!loginUser||loginUser.role!==0){
      message.error("没有权限")
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  next()
})
