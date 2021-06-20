import request from '@/utils/request'

const api = {
  roleList: '/role/index',
  roleCreate: '/role/create',
  roleUpdate: '/role/update',
  roleDelete: '/role/delete'
}

export default api

export function getRoleList (parameter) {
  return request({
    url: api.roleList,
    method: 'get',
    params: parameter
  })
}

export function createRoleList (parameter) {
  return request({
    url: api.roleCreate,
    method: 'post',
    data: parameter
  })
}

export function updateRoleList (parameter) {
  return request({
    url: api.roleUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteRoleList (parameter) {
  return request({
    url: api.roleDelete + '/' + parameter.id,
    method: 'delete'
  })
}
