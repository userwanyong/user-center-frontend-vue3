<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="~@/assets/logo.png" alt="logo" />
          <div class="title">用户中心</div>
        </div> 
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="100px">
        <div>
          <div v-if="userLoginStore.loginUser.id">
            <a-dropdown>
              <div>
                <a-avatar :src="userLoginStore.loginUser.avatar_url" style="margin-right: 10px;width: 40px;height: 40px"></a-avatar>
                <a>
                  {{ userLoginStore.loginUser.nickname ?? "未设置昵称" }}
                  <DownOutlined />
                </a>
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="logout()" ><LogoutOutlined /> 退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" @click="login()">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import { AppstoreOutlined, HomeOutlined,DownOutlined,LogoutOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";
import { type MenuProps, message } from "ant-design-vue";
import { userLogout } from "@/api/user.ts";

const userLoginStore = useLoginUserStore();
const router = useRouter();

const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key
  });
};

//退出登录
const logout = async () => {
  const res = await userLogout();
  if (res.data.status === 200){
    message.success("退出成功");
  }else {
    message.error(res.data.message);
  }
  //退出登录，将登录状态从全局状态中移除
  userLoginStore.setLoginUser("");
  //跳转到登录页
  await router.push({
    path: "/user/login"
  });
};

//点击按钮跳转到登录页面
const login = () => {
  router.push({
    path: "/user/login"
  });
};

const current = ref<string[]>(["mail"]);
//监听路由变化，更新当前菜单选中状态
router.afterEach((to, from, failure) => {
  current.value = [to.path];
});
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页"
  },
  {
    key: "/admin/userManage",
    icon: () => h(AppstoreOutlined),
    label: "用户管理",
    title: "用户管理"
  },
]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
