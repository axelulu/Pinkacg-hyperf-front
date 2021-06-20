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
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="权限">
          <a-tree-select
            v-decorator="['rolePermission']"
            style="width: 100%"
            :tree-data="treeData"
            tree-checkable
            :replaceFields="{children:'children', title:'title', key:'id', value: 'id' }"
            search-placeholder="Please select"
          />
        </a-form-item>
        <a-form-item label="名称">
          <span slot="label">
            name&nbsp;
            <a-tooltip title="这里输入的昵称将展示给所有人！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'name',
          {
            rules: [{ required: true, message: '请输入你的角色名称!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="描述">
          <span slot="label">
            description&nbsp;
            <a-tooltip title="这里输入的用户名是你的唯一uid！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'description',
          {
            rules: [{ required: true, message: '请输入角色描述!', whitespace: true }],
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
import { getPermissionList } from '@/api/permission'

// 表单字段
const fields = ['id', 'description', 'name', 'rolePermission', 'status', 'updated_at']
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
      treeData: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.rolePermission()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log(this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    async rolePermission () {
      await getPermissionList({
        'p_id': 0,
        'pageNo': 1,
        'pageSize': 1000
      })
        .then(res => {
          this.treeData = res.result.data
        })
    }
  }
}
</script>
