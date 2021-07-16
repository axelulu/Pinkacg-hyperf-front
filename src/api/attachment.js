import request from '@/utils/request'

const api = {
  attachmentList: '/attachment/index',
  attachmentCreate: '/attachment/create',
  attachmentUpdate: '/attachment/update',
  attachmentDelete: '/attachment/delete'
}

export default api

export function getAttachmentList (parameter) {
  return request({
    url: api.attachmentList,
    method: 'get',
    params: parameter
  })
}

export function createAttachmentList (parameter) {
  return request({
    url: api.attachmentCreate,
    method: 'post',
    data: parameter
  })
}

export function updateAttachmentList (parameter) {
  return request({
    url: api.attachmentUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteAttachmentList (parameter) {
  return request({
    url: api.attachmentDelete + '/' + parameter.id,
    method: 'delete',
    data: parameter
  })
}
