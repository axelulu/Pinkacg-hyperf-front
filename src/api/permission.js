import request from '@/utils/request'

const api = {
  MenuPermissionList: '/permission/permission_query',
  MenuPermissionCreate: '/permission/permission_create',
  MenuPermissionUpdate: '/permission/permission_update',
  MenuPermissionDelete: '/permission/permission_delete'
}

export default api

export function getMenuList (parameter) {
  return request({
    url: api.MenuPermissionList,
    method: 'get',
    params: parameter
  })
}

export function createMenuList (parameter) {
  return request({
    url: api.MenuPermissionCreate,
    method: 'post',
    data: parameter
  })
}

export function updateMenuList (parameter) {
  return request({
    url: api.MenuPermissionUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteMenuList (parameter) {
  return request({
    url: api.MenuPermissionDelete,
    method: 'delete',
    data: parameter
  })
}
