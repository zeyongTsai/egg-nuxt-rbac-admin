/*
 * @Author: caizeyong
 * @Date: 2021-01-15 13:24:56
 * @Description: egg 路由
 */
const RBACAuth = require('egg-auths/lib/index')

module.exports = app => {
  console.log('router init')
  const { router, controller } = app
  const rbac = new RBACAuth({
    authenticationBody: {
      code: 50008,
      message: 'not logined'
    },
    authenticationFailedUrl: '/login',
    authorizationFailedBody: {
      code: 2,
      message: 'You do not have permission for this resource'
    },
    authorizationFailedCode: 200
  })
  router.get('/api/hello', controller.hello.index)

  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/logout', controller.user.logout)
  router.get('/api/user/mine',rbac.checkLogin(), controller.user.getMyInfo)
  router.get('/api/user/permission',rbac.checkLogin(), controller.user.getMyPermissions)

  router.get('/api/system/user', controller.system.user.getUserList)
  router.get('/api/system/user/info', controller.system.user.getUserInfo)
  router.post('/api/system/user/add', controller.system.user.addUser)
  router.post('/api/system/user/edit', controller.system.user.editUser)
  router.post('/api/system/user/delete',rbac.checkPermissions(['system:user:delete']), controller.system.user.deleUser)

  router.get('/api/system/role',rbac.checkRoles(['admin']), controller.system.role.getRoleList)
  router.get('/api/system/role/info', controller.system.role.getRoleInfo)
  router.post('/api/system/role/add', controller.system.role.addRole)
  router.post('/api/system/role/edit', controller.system.role.editRole)
  router.post('/api/system/role/delete', controller.system.role.deleRole)

  router.get('/api/system/permission', controller.system.permission.getPermissionList)
  router.get('/api/system/permission/role', controller.system.permission.getPermissionListByRoleId)
}
