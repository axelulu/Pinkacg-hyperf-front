<template>
  <div :class="prefixCls">
    <div style="margin: 10px 0px">
      <a-upload
        list-type="picture"
        :multiple="true"
        :customRequest="getUploadPostImg"
        :fileList="content_file"
        @preview="preview"
        class="upload-list-inline"
      >
        <a-button> <a-icon class="upload" type="upload" /> upload </a-button>
      </a-upload>
    </div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)">
    </quill-editor>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { uploadFile } from '@/api/upload'
import { getImg } from '@/utils/util'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [
    {
      'header': 1
    },
    {
      'header': 2
    }
  ],
  [
    {
      'list': 'ordered'
    },
    {
      'list': 'bullet'
    }
  ],
  [
    {
      'script': 'sub'
    },
    {
      'script': 'super'
    }
  ],
  [
    {
      'indent': '-1'
    },
    {
      'indent': '+1'
    }
  ],
  [
    {
      'direction': 'rtl'
    }
  ],

  [
    {
      'size': ['small', false, 'large', 'huge']
    }
  ],
  [
    {
      'header': [1, 2, 3, 4, 5, 6, false]
    }
  ],

  [
    {
      'color': []
    },
    {
      'background': []
    }
  ],
  [
    {
      'font': []
    }
  ],
  [
    {
      'align': []
    }
  ],
  ['link'],
  ['clean']
]

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    value: {
      type: String
    },
    userId: {
      type: Number
    },
    postId: {
      type: Number
    },
    contentFile: {}
  },
  created () {
    this.content = this.value
    if (this.content_file.length > 0) {
      this.content_file.forEach(item => {
        if (item.url.indexOf('http') === -1 && item.thumbUrl.indexOf('http') === -1) {
          item.url = getImg(item.url)
          item.thumbUrl = getImg(item.thumbUrl)
        }
      })
    }
  },
  data () {
    return {
      content: null,
      editorOption: {
        placeholder: '请在这里输入', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true, // 语法检测
        modules: {
          toolbar: {
            container: toolbarOptions
            // handlers: {
            //   'image': function (value) {
            //     if (value) {
            //       document.querySelector('.upload').click()
            //     } else {
            //       this.quill.format('image', false)
            //     }
            //   }
            // }
          }
        }
      }
    }
  },
  methods: {
    preview (file) {
      console.log(file.url)
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      if (quill.getSelection() === null) {
        quill.focus()
      }
      const length = quill.getSelection().index
      // 插入图片，res为服务器返回的图片链接地址
      quill.insertEmbed(length, 'image', file.url)
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    getUploadPostImg (info) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      // 开始上传
      this.upload_loading = true
      uploadFile(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          that.upload_loading = false
          return []
        }
        // 获取富文本组件实例
        const quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        if (quill.getSelection() === null) {
          quill.focus()
        }
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', getImg(res.result.link))
        // 调整光标到最后
        quill.setSelection(length + 1)
        info.file.thumbUrl = res.result.link
        this.content_file.push(res.result.data)
        this.content_file.push({
          'uid': res.result.data.title,
          'name': res.result.data.title + '.' + res.result.data.type,
          'url': getImg(res.result.link),
          'status': 'done',
          'thumbUrl': getImg(res.result.link)
        })
        console.log(res.result.data)
        that.$message.success(res.message)
        that.upload_loading = false
      })
    },
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    onEditorChange ({ quill, html, text }) {
      this.$emit('change', html)
    }
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');
/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  line-height: initial;
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
}
/deep/ .ant-upload-list-picture .ant-upload-list-item-thumbnail img, .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
  object-fit: cover;
}
</style>
