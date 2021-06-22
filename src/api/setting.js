import request from '@/utils/request'

const api = {
  settingList: '/setting/index',
  settingCreate: '/setting/create',
  settingUpdate: '/setting/update',
  settingDelete: '/setting/delete'
}

export default api

export function getSettingList (parameter) {
  return request({
    url: api.settingList,
    method: 'get',
    params: parameter
  })
}

export function createSettingList (parameter) {
  return request({
    url: api.settingCreate,
    method: 'post',
    data: parameter
  })
}

export function updateSettingList (parameter) {
  return request({
    url: api.settingUpdate + '/' + parameter.name,
    method: 'put',
    data: parameter
  })
}

export function deleteSettingList (parameter) {
  return request({
    url: api.settingDelete + '/' + parameter.id,
    method: 'delete'
  })
}
