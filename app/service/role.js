/*
 * @Author: caizeyong
 * @Date: 2021-01-22 10:43:28
 * @Description:
 */
const Service = require('egg').Service

class RoleService extends Service {
  async getRoleList () {
    const roles = await this.ctx.model.Role.findAll({
      attributes: ['id','name','alias','createdAt', 'updatedAt']
    })
    return roles
  }
  async findRoleByRoleId (id) {
    const role = await this.ctx.model.Role.findOne({
      where: {
        id
      }
    })
    return role
  }
  async addRole (role) {
    const roleModel = await this.ctx.model.Role.create(role)
    if (role.permissions && role.permissions.length) {
      await this.setRolePermissions(roleModel.id, role.permissions)
    }
    return roleModel
  }
  async editRole (role) {
    const num = await this.ctx.model.Role.update(role, {
      where: {
        id: role.id
      },
      fields: ['alias']
    })
    if (role.permissions && role.permissions.length) {
      await this.setRolePermissions(role.id, role.permissions)
    }
    return !!num
  }
  async deleRole (id) {
    const num = await this.ctx.model.Role.destroy({
      where: {
        id
      }
    })
    await this.ctx.model.RolePermission.destroy({
      where: {
        role_id: id
      }
    })
    return !!num
  }
  async getRolePermissions (roleId) {
    let permissions = await this.ctx.model.RolePermission.findAll({
      where: {
        role_id: roleId
      },
      include: this.ctx.model.Permission
    })
    return permissions.map(p => p.permission)
  }
  async setRolePermissions (roleId, permissions) {
    // delete all
    await this.ctx.model.RolePermission.destroy({
      where: {
        role_id: roleId
      }
    })
    // insert all
    permissions = permissions.map(p => {
      return {
        role_id: roleId,
        permission_id: p
      }
    })
    const rolePermissions = await this.ctx.model.RolePermission.bulkCreate(permissions)
    return rolePermissions
  }
}

module.exports = RoleService
