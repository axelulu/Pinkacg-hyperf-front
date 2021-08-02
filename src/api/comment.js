import request from '@/utils/request'

const api = {
  commentList: '/comment/comment_query',
  commentCreate: '/comment/comment_create',
  commentUpdate: '/comment/comment_update',
  commentDelete: '/comment/comment_delete'
}

export default api

export function getCommentList (parameter) {
  return request({
    url: api.commentList,
    method: 'get',
    params: parameter
  })
}

export function createCommentList (parameter) {
  return request({
    url: api.commentCreate,
    method: 'post',
    data: parameter
  })
}

export function updateCommentList (parameter) {
  return request({
    url: api.commentUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteCommentList (parameter) {
  return request({
    url: api.commentDelete,
    method: 'delete',
    data: parameter
  })
}
