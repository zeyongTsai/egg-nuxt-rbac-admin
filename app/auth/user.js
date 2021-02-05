/*
 * @Author: caizeyong
 * @Date: 2021-01-21 10:57:13
 * @Description:
 */
const Service = require('egg-auths/app/auth/user')

class UserService extends Service {
  constructor (...args) {
    super(...args)
  }
  // async findUserByAccountAndPassword (...args) {
  //   return super.findUserByAccountAndPassword(...args)
  // }
  async findUserByUserId (uuid) {
    let user =  await this.ctx.model.User.findOne({
      where: {
        id: uuid
      },
      attributes: ['id','account','name','avatar', 'createdAt', 'updatedAt']
    })
    if (user) {
      let userRoles = await this.ctx.model.UserRole.findAll({
        where: {
          user_id: user.id
        },
        include: this.ctx.model.Role
      })
      user = user.dataValues
      user.roles = userRoles.map(ur => ur.role)
    } else {
      user.roles = []
    }
    return user
  }
}

module.exports = UserService
