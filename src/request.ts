import axios from "axios";

const myAxios = axios.create({
  //TODO 后端端口
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true
});
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  console.log(response);
  const { data } = response;
  console.log(data);
  //未登录
  //TODO 这里的status与后端定义的要对应,状态码也是！
  if (data.status === 401) {
    //不是获取用户信息接口，或不是登陆界面，则跳转到登录界面
    if (!response.request.responseURL.includes("/user/current") && !window.location.pathname.includes("/user/login")) {
      window.location.href = `/user/login?redirect=${window.location.href}`;
    }
  }
  return response;
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default myAxios;
