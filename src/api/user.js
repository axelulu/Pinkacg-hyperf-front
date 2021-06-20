import request from '@/utils/request'

const api = {
  userList: '/user/index',
  userCreate: '/user/create',
  userUpdate: '/user/update',
  userDelete: '/user/delete'
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
    url: api.userUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteUserList (parameter) {
  return request({
    url: api.userDelete + '/' + parameter.id,
    method: 'delete'
  })
}
