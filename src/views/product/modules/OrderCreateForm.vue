<template>
  <a-modal
    title="订单编辑"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="用户id">
          <a-input-number
            v-decorator="[
              'user_id',
              {
                rules: [{ required: true, message: '请输入用户id!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="文章id">
          <a-input-number
            v-decorator="[
              'post_id',
              {
                rules: [{ required: true, message: '请输入文章id!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请输入类型!' }],
              },
            ]">
            <a-select-option value="post">
              文章
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所需积分">
          <a-input-number
            v-decorator="[
              'credit',
              {
                rules: [{ required: true, message: '请输入所需积分!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="文章下载链接下标">
          <a-input-number
            v-decorator="[
              'download_key',
              {
                rules: [{ required: true, message: '请输入文章下载链接下标!' }],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
// 表单字段
const fields = ['id', 'user_id', 'post_id', 'type', 'download_key', 'credit', 'updated_at']

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
      roleList: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
  }
}
</script>
