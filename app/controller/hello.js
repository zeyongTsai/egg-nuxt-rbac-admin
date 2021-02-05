/*
 * @Author: caizeyong
 * @Date: 2021-01-15 13:45:44
 * @Description: hello controller
 */
const Controller = require('egg').Controller

class HelloController extends Controller {
  async index () {
    const { ctx } = this
    ctx.body = 'hello egg and nuxt';
    ctx.status = 200;
  }
}

module.exports = HelloController
