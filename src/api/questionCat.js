import request from '@/utils/request'

const api = {
  questionCatList: '/question_cat/index',
  questionCatCreate: '/question_cat/create',
  questionCatUpdate: '/question_cat/update',
  questionCatDelete: '/question_cat/delete'
}

export default api

export function getQuestionCatList (parameter) {
  return request({
    url: api.questionCatList,
    method: 'get',
    params: parameter
  })
}

export function createQuestionCatList (parameter) {
  return request({
    url: api.questionCatCreate,
    method: 'post',
    data: parameter
  })
}

export function updateQuestionCatList (parameter) {
  return request({
    url: api.questionCatUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteQuestionCatList (parameter) {
  return request({
    url: api.questionCatDelete + '/' + parameter.id,
    method: 'delete'
  })
}
