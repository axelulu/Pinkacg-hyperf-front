<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form
        ref='ruleForm'
        :rules="rules"
        v-if="model"
        :model="model"
        v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-model-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-model='model.id' disabled />
        </a-form-model-item>
        <a-form-model-item
          prop='question'
          label="问题内容">
          <a-textarea v-model='model.question'/>
        </a-form-model-item>
        <a-form-model-item
          prop='A'
          label="A选项">
          <a-input v-model='model.A'/>
        </a-form-model-item>
        <a-form-model-item
          prop='B'
          label="B选项">
          <a-input v-model='model.B'/>
        </a-form-model-item>
        <a-form-model-item
          prop='C'
          label="C选项">
          <a-input v-model='model.C'/>
        </a-form-model-item>
        <a-form-model-item
          prop='D'
          label="D选项">
          <a-input v-model='model.D'/>
        </a-form-model-item>
        <a-form-model-item
          prop='answer'
          label="答案">
          <a-input v-model='model.answer'/>
        </a-form-model-item>
        <a-form-model-item
          prop='cat'
          label="文件分类">
          <a-select v-model="model.category" style="width: 200px">
            <a-select-option v-for='(v, k) in topQuestionCat' :key='k' :value="v.slug">
              {{ v.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getQuestionCatList } from '@/api/questionCat'
// 表单字段
const fields = ['id', 'category', 'question', 'A', 'B', 'C', 'D', 'answer']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      rules: {
        question: [{ required: true, message: '请输入问题！' }],
        A: [{ required: true, message: '请输入a选项！' }],
        B: [{ required: true, message: '请输入b选项！' }],
        C: [{ required: true, message: '请输入c选项！' }],
        D: [{ required: true, message: '请输入d选项！' }],
        answer: [{ required: true, message: '请输入题目答案！' }],
        cat: [{ required: true, message: '请输入题目分类！' }]
      },
      roleList: {},
      topQuestionCat: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.loadTopQuestionCat()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.loadTopQuestionCat()
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    async loadTopQuestionCat () {
      const that = this
      await getQuestionCatList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          that.topQuestionCat = res.result.data
        })
    }
  }
}
</script>
