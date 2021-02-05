/*
 * @Author: caizeyong
 * @Date: 2021-01-19 16:32:44
 * @Description: 角色相关api
 */
export function getRoutes(request) {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles(request) {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(request, data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(request, id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(request, id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
