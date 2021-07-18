import request from '@/utils/request'

const api = {
  MenuPermissionList: '/menu_permission/index',
  MenuPermissionCreate: '/menu_permission/create',
  MenuPermissionUpdate: '/menu_permission/update',
  MenuPermissionDelete: '/menu_permission/delete',
  roleMenuCreate: '/menu_permission/createByRole',
  roleMenuUpdate: '/menu_permission/updateByRole'
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
    url: api.MenuPermissionUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteMenuList (parameter) {
  return request({
    url: api.MenuPermissionDelete + '/' + parameter.id,
    method: 'delete'
  })
}

export function createRoleMenu (parameter) {
  return request({
    url: api.roleMenuCreate,
    method: 'post',
    data: parameter
  })
}

export function updateRoleMenu (parameter) {
  return request({
    url: api.roleMenuUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}
