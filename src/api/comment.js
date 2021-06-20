import request from '@/utils/request'

const api = {
  commentList: '/comment/index',
  commentCreate: '/comment/create',
  commentUpdate: '/comment/update',
  commentDelete: '/comment/delete'
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
    url: api.commentUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteCommentList (parameter) {
  return request({
    url: api.commentDelete + '/' + parameter.id,
    method: 'delete'
  })
}
