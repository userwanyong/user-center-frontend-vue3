<template>
  <div id="userLoginPage">
    <h1 class="title">用户登录</h1>
    <a-form
      style="max-width: 400px;margin: 0 auto"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: '账号不能为空' },{min:6,max:11,message: '账号长度在6-11位'}]"
      >
        <a-input v-model:value="formState.username" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: '密码不能为空' },{min:6,max:15,message: '账号长度在6-15位'}]"
      >
        <a-input-password v-model:value="formState.password" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a href="/user/register">注册</a>

      <a-form-item style="text-align: center">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { userLogin } from "@/api/user.ts";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";


interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  //默认值
  username: "",
  password: ""
});

const loginUserStore = useLoginUserStore();
const router = useRouter();
//提交表单
const handleSubmit = async (values: any) => {
  const res = await userLogin(values);
  //登录成功，将登录状态存到全局状态中
  //TODO 这里的status与后端定义的要对应,状态码也是！
  if (res.data.status === 200 && res.data.data) {
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    await router.push({
      path: "/",
      replace: true
    });
  }else {
    message.error(res.data.message);
  }
};


</script>

<style scoped>
#userLoginPage .title {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 15px;
}
</style>
