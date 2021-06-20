import request from '@/utils/request'

const api = {
  permissionList: '/permission/index',
  permissionCreate: '/permission/create',
  permissionUpdate: '/permission/update',
  permissionDelete: '/permission/delete',
  rolePermissionCreate: '/permission/createByRole',
  rolePermissionUpdate: '/permission/updateByRole'
}

export default api

export function getPermissionList (parameter) {
  return request({
    url: api.permissionList,
    method: 'get',
    params: parameter
  })
}

export function createPermissionList (parameter) {
  return request({
    url: api.permissionCreate,
    method: 'post',
    data: parameter
  })
}

export function updatePermissionList (parameter) {
  return request({
    url: api.permissionUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deletePermissionList (parameter) {
  return request({
    url: api.permissionDelete + '/' + parameter.id,
    method: 'delete'
  })
}

export function createRolePermission (parameter) {
  return request({
    url: api.rolePermissionCreate,
    method: 'post',
    data: parameter
  })
}

export function updateRolePermission (parameter) {
  return request({
    url: api.rolePermissionUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}
