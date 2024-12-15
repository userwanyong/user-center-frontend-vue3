<template>
  <div id="userManagePage">
    <a-input-search
      style="max-width: 320px;margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="请输入用户名"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar_url'">
          <a-image :src="record.avatar_url" :width="90" :height="90" />
        </template>
        <template v-else-if="column.dataIndex === 'role'">
          <div v-if="record.role===0">
            <a-tag color="blue">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="green">用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <div v-if="record.status===0">
            <a-tag color="green">正常</a-tag>
          </div>
          <div v-else>
            <a-tag color="red">禁用</a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import { searchUsers, userDelete } from "@/api/user.ts";
import { message } from "ant-design-vue";

const searchValue=ref("");

const onSearch=()=>{
  getData(searchValue.value)
}

const doDelete=async (id:string)=>{
  if (!id){
    return
  }
  const res=await userDelete(id);
  if (res.data.status===200) {
    message.success("删除成功");
    await getData(searchValue.value)
  }else {
    message.error("删除失败");
  }
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '头像',
    dataIndex: 'avatar_url',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const data = ref([]);
//获取数据
const getData = async (username='') => {
  const res = await searchUsers(username);
  if (res.data.status===200&&res.data.data) {
    data.value = res.data.data;
  }else {
    message.error("获取数据失败");
  }
}
getData();
</script>

