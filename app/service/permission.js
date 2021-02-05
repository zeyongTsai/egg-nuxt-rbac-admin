/*
 * @Author: caizeyong
 * @Date: 2021-01-22 17:07:03
 * @Description:
 */
const Service = require('egg').Service

class PermissionService extends Service {
  async getAllPermissions () {
    const permissions = await this.ctx.model.Permission.findAll({
      attributes: ['id','name','alias','parent', 'createdAt', 'updatedAt']
    })
    return permissions
  }
  async getLoginedPermissions () {
    let subject = await this.ctx.getSubject()
    if (!subject.isLogined) {
      return []
    }
    let token = await subject.getToken()
    if (!token) {
      return []
    }
    // 查询角色
    let ur = await this.ctx.model.UserRole.findOne({
      where: {
        user_id: token.getUUID()
      }
    })
    if (!ur) {
      return []
    }
    // 查询对应的权限
    let permissions = await this.ctx.model.RolePermission.findAll({
      where: {
        role_id: ur.role_id
      },
      include: this.ctx.model.Permission
    })
    return permissions.map(p => p.permission)
  }
}

module.exports = PermissionService
