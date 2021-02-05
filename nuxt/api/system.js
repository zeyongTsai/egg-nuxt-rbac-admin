/*
 * @Author: caizeyong
 * @Date: 2021-01-21 16:02:05
 * @Description: 系统管理
 */
/**
 * 获取用户列表
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @returns {Promise}
 */
export function getUserList(request) {
  return request({
    url: '/system/user',
    method: 'get'
  })
}

/**
 * 获取用户信息
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} params 请求参数
 * @returns {Promise}
 */
export function getUserInfo(request, params) {
  return request({
    url: '/system/user/info',
    method: 'get',
    params: params
  })
}

/**
 * 添加用户
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} data 请求参数
 * @returns {Promise}
 */
export function addUser(request, data) {
  return request({
    url: '/system/user/add',
    method: 'post',
    data
  })
}

/**
 * 编辑用户
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} data 请求参数
 * @returns {Promise}
 */
export function editUser(request, data) {
  return request({
    url: '/system/user/edit',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} data 请求参数
 * @returns {Promise}
 */
export function deleUser(request, data) {
  return request({
    url: '/system/user/delete',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @returns {Promise}
 */
export function getRoleList(request) {
  return request({
    url: '/system/role',
    method: 'get'
  })
}

/**
 * 获取角色信息
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} params 请求参数
 * @returns {Promise}
 */
export function getRoleInfo (request, params) {
  return request({
    url: '/system/role/info',
    method: 'get',
    params
  })
}

/**
 * 添加角色
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} data 请求参数
 * @returns {Promise}
 */
export function addRole(request, data) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data
  })
}

/**
 * 编辑角色
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object} data 请求参数
 * @returns {Promise}
 */
export function editRole(request, data) {
  return request({
    url: '/system/role/edit',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {Object}  data 请求参数
 * @returns {Promise}
 */
export function deleRole(request, data) {
  return request({
    url: '/system/role/delete',
    method: 'post',
    data
  })
}

/**
 * 获取全部权限
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @returns {Promise}
 */
export function getPermissionList(request) {
  return request({
    url: '/system/permission',
    method: 'get'
  })
}

/**
 * 获取指定角色的权限列表
 * @param {import("@nuxtjs/axios").NuxtAxiosInstance} request axios 实例
 * @param {*} params 请求参数
 * @returns {Promise}
 */
export function getPermissionListByRole(request, params) {
  return request({
    url: '/system/permission/role',
    method: 'get',
    params
  })
}
