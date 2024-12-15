<template>
  <div id="userRegisterPage">
    <h1 class="title">用户注册</h1>
    <a-form
      style="max-width: 400px;margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
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

      <a-form-item
        name="check_password"
        :rules="[{ required: true, message: '密码不能为空' },{min:6,max:15,message: '账号长度在6-15位'}]"
      >
        <a-input-password v-model:value="formState.check_password" placeholder="请确认密码">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a href="/user/login">登录</a>

      <a-form-item style="text-align: center">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { userRegister } from "@/api/user.ts";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";


interface FormState {
  username: string;
  password: string;
  check_password: string;
}

const formState = reactive<FormState>({
  //默认值
  username: "",
  password: "",
  check_password: ""
});

const router = useRouter();
//提交表单
const handleSubmit = async (values: any) => {
  //判断两次密码是否一致
  if (values.password !== values.check_password) {
    message.error("两次输入密码不一致");
    return;
  }
  const res = await userRegister(values);
  //注册成功，跳转到登录界面
  //TODO 这里的status与后端定义的要对应,状态码也是！
  if (res.data.status === 200) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true
    });
  } else {
    message.error("注册失败: " + res.data.message);
  }
};


</script>

<style scoped>
#userRegisterPage .title {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 15px;
}
</style>
