<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handOk"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref='ruleForm'
        :rules="rules"
        :model="model"
        v-if="model"
        v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-model='model.id' disabled />
        </a-form-item>
        <a-form-model-item
          prop='name'
          label="名称">
          <span slot="label">
            name
            <a-tooltip title="这里输入的昵称将展示给所有人！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model='model.name'/>
        </a-form-model-item>
        <a-form-model-item
          prop='title'
          label="标题">
          <span slot="label">
            title
            <a-tooltip title="这里输入的权限标题！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model='model.title'/>
        </a-form-model-item>
        <a-form-model-item
          prop='icon'
          label="权限图标">
          <span slot="label">
            icon&nbsp;
            <a-tooltip title="这里输入的权限图标！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-select
            v-model='model.icon'
            placeholder="请选择图标"
            style="width: 200px">
            <a-select-option
              v-for="i in seleiconlist"
              :key="i.key"
            ><a-icon :type="i.value"/>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='url'
          label="前台mod地址">
          <span slot="label">
            url&nbsp;
            <a-tooltip title="这里输入权限链接！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model='model.url'/>
        </a-form-model-item>
        <a-form-model-item
          prop='method'
          label="方法">
          <a-select
            mode="multiple"
            placeholder="请输入权限方法！"
            style="width: 100%"
            v-model='model.method'>
            <a-select-option value="GET">
              GET[查]
            </a-select-option>
            <a-select-option value="POST">
              POST[增]
            </a-select-option>
            <a-select-option value="PUT">
              PUT[改]
            </a-select-option>
            <a-select-option value="DELETE">
              DELETE[删]
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='path'
          label="后台api地址">
          <span slot="label">
            path&nbsp;
            <a-tooltip title="这里输入权限路径！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-model='model.path'
          />
        </a-form-model-item>
        <a-form-model-item
          label="不可操作字段">
          <a-select
            mode="tags"
            placeholder="请先输入后台api地址！"
            style="width: 100%"
            v-model='model.key'
          >
            <a-select-option v-for='(v, k) in columns' :key='k' :value="v">
              {{ v }}
            </a-select-option>
          </a-select>
          <a-button @click='getColumnList'>获取字段</a-button>
        </a-form-model-item>
        <a-form-model-item
          prop='p_id'
          label="父级节点">
          <a-select v-model='model.p_id'>
            <a-select-option :value="0">
              顶级节点
            </a-select-option>
            <a-select-option v-if='(model && model.p_id !== 0) || !model' v-for="slugs in topMenu" :key="slugs.id" :value="slugs.id">
              {{ slugs.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='sort'
          label="菜单排序">
          <a-input-number v-model='model.sort'/>
        </a-form-model-item>
        <a-form-model-item
          prop='is_menu'
          label="设为菜单">
          <a-switch v-model='model.is_menu' />
        </a-form-model-item>
        <a-form-model-item
          prop='status'
          label="启用">
          <a-switch v-model='model.status' />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getMenuList } from '@/api/menu_permission'
import { getColumnList } from '@/api/setting'

// 表单字段
const fields = ['id', 'method', 'key', 'p_id', 'name', 'icon', 'path', 'url', 'password', 'is_menu', 'title', 'status', 'sort', 'updated_at']

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
        name: [{ required: true, message: '请输入名称！' }],
        title: [{ required: true, message: '请输入标题！' }],
        method: [{ required: true, message: '请输入方法！' }],
        url: [{ required: true, message: '请输入链接！' }],
        path: [{ required: true, message: '请输入路径！' }],
        p_id: [{ required: true, message: '请速入父菜单！' }],
        icon: [{ required: true, message: '请输入图标！' }],
        is_menu: [{ required: true, message: '请输入是否是菜单！' }],
        sort: [{ required: true, message: '请输入排序！' }],
        status: [{ required: true, message: '请输入状态！' }]
      },
      columns: [],
      seleiconlist: [
        {
          key: 'account-book',
          value: 'account-book'
        },
        {
          key: 'appstore',
          value: 'appstore'
        },
        {
          key: 'bank',
          value: 'bank'
        },
        {
          key: 'book',
          value: 'book'
        },
        {
          key: 'clock-circle',
          value: 'clock-circle'
        },
        {
          key: 'snippets',
          value: 'snippets'
        },
        {
          key: 'edit',
          value: 'edit'
        },
        {
          key: 'form',
          value: 'form'
        },
        {
          key: 'copy',
          value: 'copy'
        },
        {
          key: 'delete',
          value: 'delete'
        },
        {
          key: 'scissor',
          value: 'scissor'
        },
        {
          key: 'camera',
          value: 'camera'
        },
        {
          key: 'dashboard',
          value: 'dashboard'
        },
        {
          key: 'credit-card',
          value: 'credit-card'
        },
        {
          key: 'database',
          value: 'database'
        },
        {
          key: 'eye',
          value: 'eye'
        },
        {
          key: 'fire',
          value: 'fire'
        },
        {
          key: 'compass',
          value: 'compass'
        },
        {
          key: 'gift',
          value: 'gift'
        },
        {
          key: 'message',
          value: 'message'
        }
      ],
      topMenu: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.getMenuPermissionList()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.getMenuPermissionList()
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    getMenuPermissionList () {
      getMenuList({
        'p_id': 0
      }).then(res => {
        this.topMenu = res.result.data
      })
    },
    handOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('ok')
        } else {
          this.$message.error('请输入完整数据！')
          return false
        }
      })
    },
    getColumnList () {
      console.log(this.model.path)
      getColumnList({
        'key': this.model.path
      }).then((res) => {
        console.log(res)
        this.columns = res.result
      })
    }
  }
}
</script>
