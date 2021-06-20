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
            rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="标题">
          <span slot="label">
            title
            <a-tooltip title="这里输入的权限标题！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'title',
          {
            rules: [{ required: true, message: '请输入你的权限标题!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="权限图标">
          <span slot="label">
            icon&nbsp;
            <a-tooltip title="这里输入的权限图标！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'icon',
          {
            rules: [{ required: true, message: '请输入你的权限图标!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="权限路径">
          <span slot="label">
            path&nbsp;
            <a-tooltip title="这里输入权限路径！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'path',
          {
            rules: [{ required: true, message: '请输入你的权限路径!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="权限链接">
          <span slot="label">
            url&nbsp;
            <a-tooltip title="这里输入权限链接！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
          'url',
          {
            rules: [{ required: true, message: '请输入权限链接!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item label="方法">
          <a-select
            mode="multiple"
            placeholder="请输入权限方法！"
            style="width: 100%"
            v-decorator="[
          'method',
          {
            rules: [{ required: true, message: '请输入权限方法！' }],
          },
        ]"
          >
            <a-select-option value="GET">
              GET
            </a-select-option>
            <a-select-option value="POST">
              POST
            </a-select-option>
            <a-select-option value="PUT">
              PUT
            </a-select-option>
            <a-select-option value="DELETE">
              DELETE
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="父级节点">
          <a-select
            v-decorator="[
              'p_id',
              {
                rules: [{ required: true, message: '请输入父亲节点！' }],
              },
            ]">
            <a-select-option :value="0">
              顶级节点
            </a-select-option>
            <a-select-option v-for="slugs in topMenu" :key="slugs.id" :value="slugs.id">
              {{ slugs.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="设为菜单">
          <a-switch v-decorator="['is_menu', { valuePropName: 'checked' }]" />
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
const fields = ['id', 'method', 'p_id', 'name', 'icon', 'path', 'url', 'password', 'is_menu', 'title', 'status', 'updated_at']

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
      topMenu: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    getPermissionList({
      'p_id': 0,
      'menu': 1,
      'p_id_slug': 1
    }).then(res => {
      this.topMenu = res.result.data
    })
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
