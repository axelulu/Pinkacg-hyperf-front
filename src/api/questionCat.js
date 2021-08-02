import request from '@/utils/request'

const api = {
  questionCatList: '/question_cat/question_cat_query',
  questionCatCreate: '/question_cat/question_cat_create',
  questionCatUpdate: '/question_cat/question_cat_update',
  questionCatDelete: '/question_cat/question_cat_delete'
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
    url: api.questionCatUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteQuestionCatList (parameter) {
  return request({
    url: api.questionCatDelete,
    method: 'delete',
    data: parameter
  })
}
