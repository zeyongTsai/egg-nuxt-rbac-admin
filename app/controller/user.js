/*
 * @Author: caizeyong
 * @Date: 2021-01-20 16:04:34
 * @Description: 用户相关
 */
const AuthenticationToken = require('egg-auths/lib/AuthenticationToken')
const Controller = require('egg').Controller

class UserController extends Controller {
  async login () {
    const { ctx } = this
    let subject = await ctx.getSubject()
    let account = ctx.request.body.username
    let password = ctx.request.body.password
    password = Buffer.from(password, 'base64')
    password = await this.ctx.service.user.genPassword(password)
    let token = new AuthenticationToken({
      principals: account,
      credentials: password
    })
    try{
      await subject.login(token)
      ctx.body = {
        code: 0,
        message: 'login success'
      }
    }catch (e) {
      ctx.body = {
        code: 1,
        message: e.message
      }
    }
  }

  async logout () {
    const { ctx } = this
    let subject = await ctx.getSubject()
    try {
      await subject.logout()
      ctx.body = {
        code: 0,
        message: 'logouted'
      }
    } catch (e) {
      ctx.body = {
        code: 1,
        message: e.message
      }
    }
  }

  async getMyInfo () {
    const { ctx } = this
    let subject = await ctx.getSubject()
    let token = await subject.getToken()
    if (!token) {
      ctx.body = {
        code: 50008,
        message: e.message
      }
    } else {
      let user = await ctx.auth.user.findUserByUserId(token.getUUID())
      ctx.body = {
        code: user ? 0 : 1,
        message: user ? 'success' : 'not found',
        data: user
      }
    }
  }
  async getMyPermissions () {
    let permissions = await this.ctx.service.permission.getLoginedPermissions()
    this.ctx.body = {
      code: 0,
      message: 'success',
      data: permissions
    }
  }
}

module.exports = UserController
