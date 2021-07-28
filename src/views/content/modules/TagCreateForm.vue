<template>
  <a-modal
    title="标签编辑"
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
        <a-form-item label="名称">
          <span slot="label">
            label
            <a-tooltip title="这里输入标签名称！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'label',
          {
            rules: [{ required: true, message: '请输入标签名称!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="标识">
          <span slot="label">
            value
            <a-tooltip title="这里输入标签标识！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'value',
          {
            rules: [{ required: true, message: '请输入标签标识!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="启用">
          <a-switch v-decorator="['status', { valuePropName: 'checked' }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
// 表单字段
const fields = ['id', 'label', 'value', 'status', 'updated_at']

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
