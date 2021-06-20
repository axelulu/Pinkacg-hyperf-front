<template>
  <a-modal
    title="新建规则"
    :width="1000"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form-model v-if="model" :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          v-show="model && model.id > 0"
          label="主键ID">
          <a-input v-model="model.id" disabled />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章作者">
          <a-select v-model="model.author" style="width: 200px">
            <a-select-option v-for="k in postAuthor" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章标题">
          <span slot="label">
            title
            <a-tooltip title="这里输入文章标题！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model="model.title"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章摘要">
          <a-textarea
            rows="4"
            placeholder="请输入文章摘要！"
            v-model="model.excerpt"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章内容">
          <QuillEditor
            :postId="model.id"
            @change="changeContent"
            v-model="model.content"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章菜单">
          <a-select v-model="model.menu" style="width: 200px">
            <a-select-option v-for="k in postCategory" :key="k.id" :value="k.value">
              <span v-if="k.son === 0">{{ k.label }}</span>
              <span v-else>----{{ k.label }}</span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章标签">
          <a-tree-select
            v-model="model.tag"
            style="width: 100%"
            :tree-data="postTag"
            tree-checkable
            :replaceFields="{children:'children', title:'title', key:'id', value: 'value' }"
            search-placeholder="Please select"
          />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章状态">
          <a-select v-model="model.status" style="width: 200px">
            <a-select-option value="publish">
              发布
            </a-select-option>
            <a-select-option value="draft">
              草稿
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章类型">
          <a-select v-model="model.type" style="width: 200px">
            <a-select-option value="post">
              文章
            </a-select-option>
            <a-select-option value="music">
              音乐
            </a-select-option>
            <a-select-option value="video">
              视频
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="评论状态">
          <a-switch v-model="model.comment_status" />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="开启下载">
          <a-switch @change="downloadStatus" v-model="model.download_status" />
        </a-form-model-item>
        <a-form-model-item
          v-if="model && model.download_status"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="下载链接">
          <a-form v-for="(k, v) in model.download" :key="v">
            <a-form-model-item style="margin-bottom: 6px">
              <a-input v-model="k.name" addon-before="链接名称" placeholder="请输入链接名称！" />
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 6px">
              <a-input v-model="k.link" addon-before="下载链接" placeholder="请输入下载链接！"/>
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 6px">
              <a-input v-model="k.pwd" addon-before="提取密码" style="width: 30%;margin-right: 3%" placeholder="提取密码"/>
              <a-input v-model="k.pwd2" addon-before="解压密码" style="width: 30%;margin-right: 3%" placeholder="提取密码"/>
              所需积分： <a-input-number v-model="k.credit" placeholder="下载积分" style="30%;margin-right: 3%"/>
            </a-form-model-item>
          </a-form>
          <div style="margin-bottom: 6px">
            <a-button @click="addDownload" style="width: 48%;margin-right: 2%" type="primary" block>
              添加
            </a-button>
            <a-button @click="deleteDownload" style="width: 48%;margin-left: 2%" type="danger" block>
              删除
            </a-button>
          </div>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章评论数">
          <a-input-number v-model="model.comment_count"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章浏览量">
          <a-input-number v-model="model.views"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import QuillEditor from '@/components/Editor/QuillEditor'
import { getUserList } from '@/api/user'
import { getTagList } from '@/api/tag'
import { getCategoryList } from '@/api/category'

// 表单字段
const fields = ['id', 'author', 'title', 'content', 'excerpt', 'type', 'status', 'comment_status', 'download_status', 'menu', 'tag', 'guid', 'comment_count', 'download', 'music', 'video', 'header_img', 'views', 'updated_at']

export default {
  components: {
    QuillEditor
  },
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
      default: () => {
        return {
          'download': null
        }
      }
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
      postAuthor: {},
      postTag: {},
      postCategory: {},
      roleList: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.PostAuthor()
    this.PostTag()
    this.PostCategory()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.PostAuthor()
      this.PostTag()
      this.PostCategory()
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    downloadStatus (e, item) {
      if (e === true) {
        this.model.download = [{
          'name': '',
          'link': '',
          'pwd': '',
          'pwd2': '',
          'credit': ''
        }]
      }
    },
    changeContent (val) {
      this.model.content = val
    },
    addDownload () {
      this.model.download.push({
        'name': '',
        'link': '',
        'pwd': '',
        'pwd2': '',
        'credit': ''
      })
    },
    deleteDownload () {
      this.model.download.pop()
    },
    async PostAuthor () {
      const that = this
      await getUserList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postAuthor = res.result.data
        })
    },
    async PostTag () {
      const that = this
      await getTagList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postTag = res.result.data
        })
    },
    async PostCategory () {
      const that = this
      await getCategoryList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postCategory = res.result.data
        })
    }
  }
}
</script>
