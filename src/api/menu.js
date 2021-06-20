import request from '@/utils/request'

const api = {
  menuList: '/menu/index',
  menuCreate: '/menu/create',
  menuUpdate: '/menu/update',
  menuDelete: '/menu/delete',
  roleMenuCreate: '/menu/createByRole',
  roleMenuUpdate: '/menu/updateByRole'
}

export default api

export function getMenuList (parameter) {
  return request({
    url: api.menuList,
    method: 'get',
    params: parameter
  })
}

export function createMenuList (parameter) {
  return request({
    url: api.menuCreate,
    method: 'post',
    data: parameter
  })
}

export function updateMenuList (parameter) {
  return request({
    url: api.menuUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteMenuList (parameter) {
  return request({
    url: api.menuDelete + '/' + parameter.id,
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
