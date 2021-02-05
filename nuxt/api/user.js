/*
 * @Author: caizeyong
 * @Date: 2021-01-19 16:32:44
 * @Description: 用户相关api
 */

export function login(request, data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(request) {
  return request({
    url: '/user/mine',
    method: 'get'
  })
}

export function getPermissions(request) {
  return request({
    url: '/user/permission',
    method: 'get'
  })
}

export function logout(request) {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
