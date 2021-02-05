<!--
 * @Author: caizeyong
 * @Date: 2021-01-20 13:28:13
 * @Description: 用户管理
-->
<template>
  <div>
    <div style="padding-bottom: 20px;">
      <CheckPermission :permissions="['system:user:add']">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </CheckPermission>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="avatar"
        width="100"
        label="头像">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" class="avatar" :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="所属角色"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :formatter="timeFormat"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        :formatter="timeFormat"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-link @click="handleEdit(scope.row)" type="primary">编辑</el-link>
          <el-link @click="handleDele(scope.row)" type="danger">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="`${mode === 'edit' ? '编辑':'添加'}用户`" :visible.sync="dialogVisible" width="550px">
      <UserForm :mode="mode" @done="userChange" :user-id="currentId" @cancel="dialogVisible=false"></UserForm>
    </el-dialog>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm/index'
import CheckPermission from '@/components/CheckPermission/index'
import { formatTime } from '@/utils/index'
import { getUserList, addUser, editUser, deleUser } from '@/api/system'
export default {
  name: 'user',
  components: {
    UserForm,
    CheckPermission
  },
  data () {
    return {
      tableData: [],
      mode: 'add',
      currentId: null,
      dialogVisible: false,
    }
  },
  // async asyncData ({ $axios }) {
  //   const result = await getUserList($axios)
  //   return result.data
  // },
  mounted () {
    this.getUserList()
  },
  methods: {
    timeFormat (row, column, cellValue) {
      return formatTime((new Date(cellValue)).getTime())
    },
    handleAdd () {
      this.mode = 'add'
      this.currentId = null
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.mode = 'edit'
      this.currentId = row.id
      this.dialogVisible = true
    },
    handleDele (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleUser(this.$axios, {
          id: row.id
        })
      }).then(res => {
        this.$message.success('已删除')
        this.getUserList()
      }).catch(() => {
        console.log('cancel')
      })
    },
    userChange () {
      this.dialogVisible = false
      this.getUserList()
    },
    getUserList () {
      getUserList(this.$axios).then(res => {
        res.data.forEach(item => {
          item.roleName = item.roles.length ? (item.roles[0].alias || item.roles[0].name) : ''
        })
        this.tableData = res.data
      })
    }
  }
}
</script>
<router>
{
  meta: {
    title: 'User Manage'
  }
}
</router>
<style scoped>
.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
</style>
