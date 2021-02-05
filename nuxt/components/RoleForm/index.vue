<!--
 * @Author: caizeyong
 * @Date: 2021-01-22 10:28:52
 * @Description:
-->
<template>
  <div>
    <el-form label-position="left" label-width="80px" :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" :disabled="mode === 'edit'"></el-input>
        <div class="tip" v-if="mode === 'edit'">角色名称用于程序内部做权限判断，不可编辑</div>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="form.alias"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          ref="tree"
          :data="permissions"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          check-strictly
          @check-change="handleCheckChange"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRoleInfo, addRole, editRole, getPermissionList, getPermissionListByRole } from '@/api/system'
export default {
  name: 'RoleForm',
  props: {
    mode: {
      type: String
    },
    roleId: {
      type: [Number, String]
    },
  },
  data () {
    return {
      form: {
        name: '',
        alias: ''
      },
      permissions: [],
      defaultProps: {
        children: 'children',
        label: 'alias'
      }
    }
  },
  watch: {
    roleId (v) {
      if (v != null) {
        this.getRoleInfo()
      } else {
        this.resetForm()
      }
    }
  },
  mounted () {
    if (this.roleId != null) {
      this.getRoleInfo()
    } else {
      this.getPermissions()
    }
  },
  methods: {
    handleCheckChange () {

    },
    submitForm () {
      if (this.mode === 'edit') {
        let form = Object.assign({}, this.form, {
          id: this.roleId,
          permissions: this.$refs.tree.getCheckedKeys()
        })
        editRole(this.$axios, form).then(res => {
          this.$message.success('编辑角色成功')
          this.$emit('done')
        })
      } else if (this.mode === 'add') {
        let form = Object.assign({}, this.form, {
          permissions: this.$refs.tree.getCheckedKeys()
        })
        addRole(this.$axios, form).then(res => {
          this.$message.success('添加角色成功')
          this.$emit('done')
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    getRoleInfo () {
      this.getPermissions(this.roleId)
      getRoleInfo(this.$axios, {
        id: this.roleId
      }).then(res => {
        if (res.data) {
          this.form = res.data
        }
      })
    },
    getPermissions (roleId) {
      let parr = [
        getPermissionList(this.$axios)
      ]
      if (roleId != null) {
        parr.push(getPermissionListByRole(this.$axios, {
          roleId
        }))
      }
      Promise.all(parr).then(res => {
        console.log(res)
        let all = res[0].data
        this.setAllPermissions(all)
        if (res[1]) {
          this.setCheckedPermssions(res[1].data)
        }
      })
    },
    setAllPermissions (list) {
      this.$refs.tree.setCheckedKeys([]);
      let listMap = {}
      list.forEach(item => {
        item.children = []
        listMap[item.id] = item
      })
      list.forEach(item => {
        if (item.parent != null && listMap[item.parent]) {
          listMap[item.parent].children.push(item)
        }
      })
      Object.keys(listMap).forEach(k => {
        if (listMap[k].parent != null) {
          delete listMap[k]
        }
      })
      let arr = Object.keys(listMap).map(k => {
        return listMap[k]
      })
      this.permissions = arr
    },
    setCheckedPermssions (list) {
      this.$refs.tree.setCheckedKeys(list.map(p => p.id))
    },
    resetForm () {
      this.$refs.tree.setCheckedKeys([]);
      this.form = {
        name: '',
        alias: ''
      }
    }
  }
}
</script>

<style scoped>
.tip {
  font-size: 12px;
  line-height: 20px;
  color: #909399;
}
</style>
