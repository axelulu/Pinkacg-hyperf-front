import request from '@/utils/request'

const api = {
  tagList: '/tag/tag_query',
  tagCreate: '/tag/tag_create',
  tagUpdate: '/tag/tag_update',
  tagDelete: '/tag/tag_delete'
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
    url: api.tagUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteTagList (parameter) {
  return request({
    url: api.tagDelete,
    method: 'delete',
    data: parameter
  })
}
