<!--
 * @Author: caizeyong
 * @Date: 2021-01-20 13:28:21
 * @Description: 角色管理
-->
<template>
  <div>
    <div style="padding-bottom: 20px;">
      <el-button type="primary" @click="handleAdd">添加</el-button>
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
        prop="name"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="别名"
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
    <el-dialog :title="`${mode === 'edit' ? '编辑':'添加'}角色`" :visible.sync="dialogVisible" width="550px">
      <RoleForm :mode="mode" @done="roleChange" :role-id="currentId" @cancel="dialogVisible=false"></RoleForm>
    </el-dialog>
  </div>
</template>

<script>
import RoleForm from '@/components/RoleForm/index'
import { formatTime } from '@/utils/index'
import { getRoleList, deleRole } from '@/api/system'
export default {
  name: 'role',
  components: {
    RoleForm
  },
  data () {
    return {
      tableData: [],
      mode: 'add',
      currentId: null,
      dialogVisible: false,
    }
  },
  mounted () {
    this.getRoleList()
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
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleRole(this.$axios, {
          id: row.id
        })
      }).then(res => {
        this.$message.success('已删除')
        this.getRoleList()
      }).catch(() => {
        console.log('cancel')
      })
    },
    roleChange () {
      this.dialogVisible = false
      this.getRoleList()
    },
    getRoleList () {
      getRoleList(this.$axios).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
<router>
{
  meta: {
    title: 'Role Permission'
  }
}
</router>
<style scoped>
</style>
