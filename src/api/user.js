import request from '@/utils/request'

const api = {
  userList: '/user/user_query',
  userCreate: '/user/user_create',
  userUpdate: '/user/user_update',
  userDelete: '/user/user_delete',
  // get my info
  UserInfo: '/user/user_info',
  UserMenu: '/user/user_nav'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.userList,
    method: 'get',
    params: parameter
  })
}

export function createUserList (parameter) {
  return request({
    url: api.userCreate,
    method: 'post',
    data: parameter
  })
}

export function updateUserList (parameter) {
  return request({
    url: api.userUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteUserList (parameter) {
  return request({
    url: api.userDelete,
    method: 'delete',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: api.UserInfo,
    method: 'get'
  })
}

export function getCurrentUserNav () {
  return request({
    url: api.UserMenu,
    method: 'get'
  })
}
