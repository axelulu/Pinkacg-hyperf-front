<template>
  <a-modal
    title="附件分类编辑"
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
            <a-tooltip title="这里输入分类名称！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'name',
          {
            rules: [{ required: true, message: '请输入你的分类名称!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="标识">
          <span slot="value">
            value
            <a-tooltip title="这里输入分类标识！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'slug',
          {
            rules: [{ required: true, message: '请输入分类标识!', whitespace: true }],
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
import { getAttachmentCatList } from '@/api/attachmentCat'

// 表单字段
const fields = ['id', 'name', 'slug', 'status', 'updated_at']
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
      topAttachmentCat: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model.son = this.getSonTree(this.topAttachmentCat, this.model.id)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    getSonTree (dataSource, id) {
      let arrRes = []
      const rev = (data, nodeId) => {
        let i = 0; const length = data.length
        for (; i < length; i++) {
          const node = data[i]
          if (node.id === nodeId && node.son !== 0) {
            arrRes.unshift(node.son)
            rev(dataSource, node.son)
            break
          } else if (node.children !== undefined) {
            rev(node.children, nodeId)
          }
        }
        return arrRes
      }
      arrRes = rev(dataSource, id)
      return arrRes
    }
  }
}
</script>
