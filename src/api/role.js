import request from '@/utils/request'

const api = {
  roleList: '/role/role_query',
  roleCreate: '/role/role_create',
  roleUpdate: '/role/role_update',
  roleDelete: '/role/role_delete'
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
    url: api.roleUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteRoleList (parameter) {
  return request({
    url: api.roleDelete,
    method: 'delete',
    data: parameter
  })
}
