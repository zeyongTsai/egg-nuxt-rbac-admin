/*
 * @Author: caizeyong
 * @Date: 2021-01-25 14:02:12
 * @Description: 默认数据
 */
'use strict';
const crypto = require('crypto')
const config = require('../../config/config.default')

function genPassword (password) {
  let passwordSalt = config({}).passwordSalt
  const hmac = crypto.createHmac('sha256', passwordSalt)
  hmac.update(password.toString())
  return hmac.digest('hex')
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 新增一个超管账户
    let userId = await queryInterface.bulkInsert('users', [{
      account: 'admin@admin',
      password: genPassword('123456'),
      name: '应用管理员',
      avatar: '',
      created_at: new Date(),
      updated_at: new Date()
    }])
    // 新增一个超管角色
    let roleId = await queryInterface.bulkInsert('roles', [{
      name: 'admin',
      alias: '超级管理员',
      created_at: new Date(),
      updated_at: new Date()
    }])
    console.log(userId, typeof userId)
    // 账户和角色关联
    await queryInterface.bulkInsert('user_role', [{
      user_id: userId,
      role_id: roleId,
      created_at: new Date(),
      updated_at: new Date()
    }])

    // 新增权限集合
    let p_start = await queryInterface.bulkInsert('permissions', [{
      name: 'dashboard',
      alias: '概览',
      type: 1, // 菜单
      sort: 0,
      url: '/dashboard', // 菜单url地址
      icon: 'el-icon-odometer',
      created_at: new Date(),
      updated_at: new Date()
    }])
    let system = await queryInterface.bulkInsert('permissions', [{
      name: 'system',
      alias: '系统管理',
      type: 1, // 菜单
      sort: 1,
      url: '/system', // 菜单url地址
      icon: 'el-icon-setting',
      created_at: new Date(),
      updated_at: new Date()
    }])
    let userManager = await queryInterface.bulkInsert('permissions', [{
      name: 'system:user',
      alias: '用户管理',
      type: 1,
      parent: system,
      sort: 0,
      url: '/system/user', // 菜单url地址
      created_at: new Date(),
      updated_at: new Date()
    }])
    await queryInterface.bulkInsert('permissions', [{
      name: 'system:user:add',
      alias: '添加用户',
      type: 0, // 非菜单
      parent: userManager,
      sort: 0,
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: 'system:user:edit',
      alias: '编辑用户',
      type: 0,
      parent: userManager,
      sort: 1,
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: 'system:user:delete',
      alias: '删除用户',
      type: 0,
      parent: userManager,
      sort: 2,
      created_at: new Date(),
      updated_at: new Date()
    }])
    let roleManager = await queryInterface.bulkInsert('permissions', [{
      name: 'system:role',
      alias: '角色管理',
      type: 1,
      parent: system,
      sort: 1,
      url: '/system/role', // 菜单url地址
      created_at: new Date(),
      updated_at: new Date()
    }])
    await queryInterface.bulkInsert('permissions', [{
      name: 'system:role:add',
      alias: '添加角色',
      type: 0, // 非菜单
      parent: roleManager,
      sort: 0,
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: 'system:role:edit',
      alias: '编辑角色',
      type: 0,
      parent: roleManager,
      sort: 1,
      created_at: new Date(),
      updated_at: new Date()
    }])
    let p_end = await queryInterface.bulkInsert('permissions', [{
      name: 'system:role:delete',
      alias: '删除角色',
      type: 0,
      parent: roleManager,
      sort: 2,
      created_at: new Date(),
      updated_at: new Date()
    }])
    // 绑定超管到所有权限
    let arr = []
    for (let i = p_start; i<= p_end; i++) {
      arr.push({
        role_id: roleId,
        permission_id: i,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('role_permission', arr)
    return true
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
