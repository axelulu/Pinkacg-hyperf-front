<template>
  <a-modal
    title="分类编辑"
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
        <a-form-item label="父分类">
          <a-cascader
            :options="topCategory"
            v-decorator="['son', {rules: [{required: true, message: '请输入父分类！'}]}]"
            :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
            change-on-select
            placeholder="请输入："
          />
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
              'label',
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
              'value',
              {
                rules: [{ required: true, message: '请输入分类标识!', whitespace: true }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="icon">
          <span slot="value">
            icon
            <a-tooltip title="这里输入分类icon！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'icon',
              {
                rules: [{ required: true, message: '请输入分类icon!', whitespace: true }],
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
import { getCategoryList } from '@/api/category'

// 表单字段
const fields = ['id', 'label', 'value', 'son', 'status', 'icon', 'updated_at']
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
      topCategory: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.loadTopCategory()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.loadTopCategory()
      this.model.son = this.getSonTree(this.topCategory, this.model.id)
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
    },
    async loadTopCategory () {
      const that = this
      await getCategoryList({
        son: 0
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          that.topCategory = res.result.data
          that.topCategory.unshift({
            id: 0,
            label: '顶级分类',
            value: 1,
            son: 1
          })
        })
    }
  }
}
</script>
