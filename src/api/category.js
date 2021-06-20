import request from '@/utils/request'

const api = {
  categoryList: '/category/index',
  categoryCreate: '/category/create',
  categoryUpdate: '/category/update',
  categoryDelete: '/category/delete'
}

export default api

export function getCategoryList (parameter) {
  return request({
    url: api.categoryList,
    method: 'get',
    params: parameter
  })
}

export function createCategoryList (parameter) {
  return request({
    url: api.categoryCreate,
    method: 'post',
    data: parameter
  })
}

export function updateCategoryList (parameter) {
  return request({
    url: api.categoryUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteCategoryList (parameter) {
  return request({
    url: api.categoryDelete + '/' + parameter.id,
    method: 'delete'
  })
}
