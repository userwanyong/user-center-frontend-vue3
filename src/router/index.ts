import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";
import UserManagePage from "@/pages/admin/UserManagePage.vue";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/user/register",
      name: "userRegister",
      component: UserRegisterPage
    },
    {
      path: "/user/login",
      name: "userLogin",
      component: UserLoginPage
    },
    {
      path: "/admin/userManage",
      name: "adminUserManage",
      component: UserManagePage
    }
  ]
});

export default router;
