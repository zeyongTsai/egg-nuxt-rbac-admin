/*
 * @Author: caizeyong
 * @Date: 2021-01-19 16:30:38
 * @Description:
 */
import { getPermissions } from '@/api/user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = () => ({
  routes: [],
  addRoutes: [],
  pages: [],
  permissions: [],
})

const mutations = {
  SET_ROUTES: (state, permissions) => {
    let routes = permissions.filter(p => p.type === 1)
    let pages = [...routes]
    let ps = permissions.map(p => p.name)
    let rObj = {}

    routes = routes.map(r => {
      let route = {
        id: r.id,
        parent: r.parent,
        path: r.url,
        name: r.alias || r.name,
        sort: r.sort,
        meta: {
          title: r.alias || r.name,
          icon: r.icon
        }
      }
      rObj[r.id] = route
      return route
    })
    routes.forEach(r => {
      if (r.parent != null && rObj[r.parent]) {
        if (!rObj[r.parent].children) {
          rObj[r.parent].children = []
        }
        rObj[r.parent].children.push(r)
        rObj[r.parent].children.sort((a, b) => a.sort - b.sort)
      }
    })
    Object.keys(rObj).forEach(k => {
      if (rObj[k].parent != null && rObj[rObj[k].parent]) {
        delete rObj[k]
      }
    })
    let arr = Object.keys(rObj).map(k => {
      return rObj[k]
    })
    console.log('arr', arr)
    arr.sort((a, b) => a.sort - b.sort)
    state.addRoutes = arr
    state.routes = [].concat(arr)
    state.pages = pages
    state.permissions = ps
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 实现对应角色拥有的路由
      if (roles.includes('admin')) {
        accessedRoutes = []
      } else {
        accessedRoutes = filterAsyncRoutes([], roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // get user permission
  getPermission ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPermissions(this.$axios).then(response => {
        const { data } = response
        commit('SET_ROUTES', data || [])
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
