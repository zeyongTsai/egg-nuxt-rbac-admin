<!--
 * @Author: caizeyong
 * @Date: 2021-01-22 08:55:23
 * @Description:
-->
<template>
    <div>
      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.account" :disabled="mode === 'edit'"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.alias || item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { getUserInfo, addUser, editUser, getRoleList } from '@/api/system'
export default {
    name: 'UserForm',
    props: {
      mode: {
        type: String
      },
      userId: {
        type: [Number, String]
      },
    },
    data () {
        return {
            form: {
              account: '',
              name: '',
              avatar: '',
              roleId: ''
            },
            roles: []
        }
    },
    watch: {
      userId (v) {
        if (v != null) {
          this.getUserInfo()
        } else {
          this.resetForm()
        }
      }
    },
    mounted () {
      this.getRoles()
      if (this.userId != null) {
        this.getUserInfo()
      }
    },
    methods: {
      submitForm () {
        if (this.mode === 'edit') {
          let form = Object.assign({}, this.form, {
            id: this.userId
          })
          editUser(this.$axios, this.form).then(res => {
            this.$message.success('编辑用户成功')
            this.$emit('done')
          })
        } else if (this.mode === 'add') {
          addUser(this.$axios, this.form).then(res => {
            this.$message.success('添加用户成功')
            this.$emit('done')
          })
        }
      },
      cancel () {
        this.$emit('cancel')
      },
      getUserInfo () {
        getUserInfo(this.$axios, {
          id: this.userId
        }).then(res => {
          if (res.data) {
            res.data.roleId = res.data.roles.length ?  res.data.roles[0].id : ''
            this.form = res.data
          }
        })
      },
      getRoles () {
        getRoleList(this.$axios).then(res => {
          this.roles = res.data
        })
      },
      resetForm () {
        this.form = {
          account: '',
          name: '',
          avatar: '',
          roleId: ''
        }
      }
    }
}
</script>

<style scoped>

</style>
