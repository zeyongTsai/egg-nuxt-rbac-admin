/*
 * @Author: caizeyong
 * @Date: 2021-01-20 10:34:00
 * @Description: 管理后台的菜单相关 service
 */
const Service = require('egg').Service

class MenuService extends Service {
  async getMenus () {
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
      include: [{
        association: this.ctx.model.Permission
      }]
    })
    return permissions.map(p => p.permission)
  }
}

module.exports = MenuService
