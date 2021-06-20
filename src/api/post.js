import request from '@/utils/request'

const api = {
  postList: '/post/index',
  postCreate: '/post/create',
  postUpdate: '/post/update',
  postDelete: '/post/delete'
}

export default api

export function getPostList (parameter) {
  return request({
    url: api.postList,
    method: 'get',
    params: parameter
  })
}

export function createPostList (parameter) {
  return request({
    url: api.postCreate,
    method: 'post',
    data: parameter
  })
}

export function updatePostList (parameter) {
  return request({
    url: api.postUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deletePostList (parameter) {
  return request({
    url: api.postDelete + '/' + parameter.id,
    method: 'delete'
  })
}
