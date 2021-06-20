import request from '@/utils/request'

const api = {
  tagList: '/tag/index',
  tagCreate: '/tag/create',
  tagUpdate: '/tag/update',
  tagDelete: '/tag/delete'
}

export default api

export function getTagList (parameter) {
  return request({
    url: api.tagList,
    method: 'get',
    params: parameter
  })
}

export function createTagList (parameter) {
  return request({
    url: api.tagCreate,
    method: 'post',
    data: parameter
  })
}

export function updateTagList (parameter) {
  return request({
    url: api.tagUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteTagList (parameter) {
  return request({
    url: api.tagDelete + '/' + parameter.id,
    method: 'delete'
  })
}
