import request from '@/utils/request'

const api = {
  attachmentList: '/attachment/attachment_query',
  attachmentCreate: '/attachment/attachment_create',
  attachmentUpdate: '/attachment/attachment_update',
  attachmentDelete: '/attachment/attachment_delete'
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
    url: api.attachmentUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteAttachmentList (parameter) {
  return request({
    url: api.attachmentDelete,
    method: 'delete',
    data: parameter
  })
}
