/*
 * @Author: caizeyong
 * @Date: 2021-01-21 15:08:11
 * @Description:
 */
const Controller = require('egg').Controller

class UserController extends Controller {
  async getUserList () {
    const users = await this.ctx.service.user.getUserList()
    this.ctx.body = {
      code: 0,
      message: 'success',
      data: users
    }
  }
  async getUserInfo () {
    let id = this.ctx.query.id
    let user = await this.ctx.auth.user.findUserByUserId(id)
    this.ctx.body = {
      code: user ? 0 : 1,
      message: user ? 'success' : 'not found',
      data: user
    }
  }
  async addUser () {
    await this.ctx.service.user.addUser(this.ctx.request.body)
    this.ctx.body = {
      code: 0,
      message: 'success'
    }
  }
  async editUser () {
    await this.ctx.service.user.editUser(this.ctx.request.body)
    this.ctx.body = {
      code: 0,
      message: 'success'
    }
  }
  async deleUser () {
    const count = await this.ctx.service.user.deleUser(this.ctx.request.body.id)
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

module.exports = UserController
