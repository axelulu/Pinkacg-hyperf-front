import request from '@/utils/request'

const api = {
  postList: '/post/post_query',
  postCreate: '/post/post_create',
  postUpdate: '/post/post_update',
  postDelete: '/post/post_delete'
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
    url: api.postUpdate,
    method: 'put',
    data: parameter
  })
}

export function deletePostList (parameter) {
  return request({
    url: api.postDelete,
    method: 'delete',
    data: parameter
  })
}
