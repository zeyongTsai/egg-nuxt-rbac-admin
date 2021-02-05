/*
 * @Author: caizeyong
 * @Date: 2021-01-21 15:13:16
 * @Description:
 */
const Controller = require('egg').Controller

class PermissionController extends Controller {
  async getPermissionList () {
    const permissions = await this.ctx.service.permission.getAllPermissions()
    // return permissions
    this.ctx.body = {
      code: 0,
      data: permissions,
      message: 'success'
    }
  }
  async getPermissionListByRoleId () {
    const permissions = await this.ctx.service.role.getRolePermissions(this.ctx.query.roleId)
    // return permissions
    this.ctx.body = {
      code: 0,
      data: permissions,
      message: 'success'
    }
  }
}

module.exports = PermissionController
