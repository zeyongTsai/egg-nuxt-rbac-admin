/*
 * @Author: caizeyong
 * @Date: 2021-01-21 15:28:42
 * @Description:
 */
const Service = require('egg').Service
const crypto = require('crypto')

class UserService extends Service {
  async getUserList () {
    let { Op } = this.app.Sequelize
    const users = await this.ctx.model.User.findAll({
      attributes: ['id','account','name','avatar', 'createdAt', 'updatedAt'],
      // include: this.ctx.model.Role
    })
    let userIds = users.map(user => user.id)
    let roles = await this.ctx.model.UserRole.findAll({
      where: {
        user_id: {
          [Op.in]: userIds
        }
      },
      include: this.ctx.model.Role
    })
    let rolesMap = {}
    roles.forEach(ur => {
      if (!rolesMap[ur.user_id]) {
        rolesMap[ur.user_id] = []
      }
      rolesMap[ur.user_id].push(ur.role)
    })
    users.forEach(user => {
      if (!user.dataValues.roles) {
        user.dataValues.roles = []
      }
      if (rolesMap[user.id]) {
        user.dataValues.roles = user.dataValues.roles.concat(rolesMap[user.id])
      }
    })
    return users.map(user => user.dataValues)
  }
  async addUser (user) {
    if (!user.password) {
      user.password = '123456'
    }
    user.password = await this.genPassword(user.password)
    const userModel = await this.ctx.model.User.create(user)
    if (user.roleId) {
      await this.ctx.model.UserRole.create({
        role_id: user.roleId,
        user_id: userModel.id
      })
    }
    return userModel
  }
  async editUser (user) {
    const num = await this.ctx.model.User.update(user, {
      where: {
        id: user.id
      },
      fields: ['name','avatar']
    })
    if (user.roleId) {
      let affectedRows = await this.ctx.model.UserRole.update({ role_id: user.roleId }, {
        where: {
          user_id: user.id
        },
        fields: ['role_id']
      })
      if (!affectedRows[0]) {
        await this.ctx.model.UserRole.create({
          user_id: user.id,
          role_id: user.roleId
        })
      }
    }
    return !!num[0]
  }
  async deleUser (id) {
    const num = await this.ctx.model.User.destroy({
      where: {
        id
      }
    })
    return !!num
  }
  async genPassword (password) {
    const hmac = crypto.createHmac('sha256', this.app.config.passwordSalt)
    hmac.update(password.toString())
    return hmac.digest('hex')
  }
}

module.exports = UserService
