/*
 * @Author: caizeyong
 * @Date: 2021-01-19 16:26:17
 * @Description: store
 */

 export default {
  state: () => ({

  }),
  getters: {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    pages: state => state.permission.pages,
    permissions: state => state.permission.permissions,
    errorLogs: state => state.errorLog.logs
   },
   actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        console.log('nuxt server init called')
        let permissions = await req.eggContext.service.permission.getLoginedPermissions()
        commit('permission/SET_ROUTES', permissions)
        let subject = await req.eggContext.getSubject()
        let token = await subject.getToken()
        if (!token) {
          return
        }
        let user = await req.eggContext.auth.user.findUserByUserId(token.getUUID())
        commit('user/SET_ROLES', user.roles || [])
        commit('user/SET_NAME', user.name)
        commit('user/SET_AVATAR', user.avatar)
      }
    }
 }
