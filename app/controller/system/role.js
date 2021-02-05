/*
 * @Author: caizeyong
 * @Date: 2021-01-21 15:10:47
 * @Description:
 */
const Controller = require('egg').Controller

class RoleController extends Controller {
  async getRoleList () {
    const roles = await this.ctx.service.role.getRoleList()
    this.ctx.body = {
      code: 0,
      message: 'success',
      data: roles
    }
  }
  async getRoleInfo () {
    let id = this.ctx.query.id
    let role = await this.ctx.service.role.findRoleByRoleId(id)
    this.ctx.body = {
      code: role ? 0 : 1,
      message: role ? 'success' : 'not found',
      data: role
    }
  }
  async addRole () {
    await this.ctx.service.role.addRole(this.ctx.request.body)
    this.ctx.body = {
      code: 0,
      message: 'success'
    }
  }
  async editRole () {
    await this.ctx.service.role.editRole(this.ctx.request.body)
    this.ctx.body = {
      code: 0,
      message: 'success'
    }
  }
  async deleRole () {
    const count = await this.ctx.service.role.deleRole(this.ctx.request.body.id)
    if (!count) {
      this.ctx.body = {
        code: 1,
        message: 'not found'
      }
    } else {
      this.ctx.body = {
        code: 0,
        message: 'success'
      }
    }
  }
}

module.exports = RoleController
