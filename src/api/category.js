import request from '@/utils/request'

const api = {
  categoryList: '/category/category_query',
  categoryListTree: '/category/category_query_tree',
  categoryCreate: '/category/category_create',
  categoryUpdate: '/category/category_update',
  categoryDelete: '/category/category_delete'
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
    url: api.categoryUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteCategoryList (parameter) {
  return request({
    url: api.categoryDelete,
    method: 'delete',
    data: parameter
  })
}
