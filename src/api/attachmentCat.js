import request from '@/utils/request'

const api = {
  attachmentCatList: '/attachment_cat/attachment_cat_query',
  attachmentCatCreate: '/attachment_cat/attachment_cat_create',
  attachmentCatUpdate: '/attachment_cat/attachment_cat_update',
  attachmentCatDelete: '/attachment_cat/attachment_cat_delete'
}

export default api

export function getAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatList,
    method: 'get',
    params: parameter
  })
}

export function createAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatCreate,
    method: 'post',
    data: parameter
  })
}

export function updateAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatDelete,
    method: 'delete',
    data: parameter
  })
}
