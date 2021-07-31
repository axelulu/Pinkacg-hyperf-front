<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-spin :spinning='loading'>
        <a-form-model
          :model="queryPostList"
          :rules="rules"
          ref='cmsForm'>
          <a-form-model-item
            prop='pageUrl'
            label="采集页面url"
            :labelCol="{lg: {span: 5}, sm: {span: 0}}"
            :wrapperCol="{lg: {span: 17}, sm: {span: 0} }">
            <a-textarea
              style='height: 400px'
              v-model='queryPostList.pageUrl'
              placeholder="请输入采集页面url！"/>
          </a-form-model-item>
          <a-form-model-item
            prop='menu'
            label="文章分类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-cascader
              :options="postCategory"
              v-model="queryPostList.menu"
              :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
              change-on-select
              placeholder="请输入："
            />
          </a-form-model-item>
          <a-form-model-item
            prop='postSrcUrlClass'
            label="文章内容图片标签"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容图片标签！"
              v-model='queryPostList.postSrcUrlClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='siteUrl'
            label="采集网站链接"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入采集网站链接！"
              v-model='queryPostList.siteUrl'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postClass'
            label="文章内容类（最大范围）"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容类！"
              v-model='queryPostList.postClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='tag_status'
            label="标签开启选择器"
            style='width: 25%;display: inline-block'
            :labelCol="{lg: {span: 21}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 3}, sm: {span: 10} }">
            <a-switch default-checked v-model='queryPostList.tag_status' />
          </a-form-model-item>
          <a-form-model-item
            v-if='queryPostList.tag_status === true'
            prop='tagClass'
            label="标签内容类（最大范围）"
            style='width: 25%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容类！"
              v-model='queryPostList.tagClass'/>
          </a-form-model-item>
          <a-form-model-item
            v-if='queryPostList.tag_status === true'
            prop='postTagClass'
            label="文章标签类"
            style='width: 25%;display: inline-block'
            :labelCol="{lg: {span: 10}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 10} }">
            <a-input
              placeholder="请输入页面文章链接类！"
              v-model='queryPostList.postTagClass'/>
          </a-form-model-item>
          <a-form-model-item
            v-if='queryPostList.tag_status === true'
            prop='postTagElement'
            label="文章标签元素"
            style='width: 25%;display: inline-block'
            :labelCol="{lg: {span: 5}, sm: {span: 5}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 5} }">
            <a-input
              placeholder="请输入页面文章链接元素！"
              v-model='queryPostList.postTagElement'/>
          </a-form-model-item>
          <a-form-model-item
            v-if='queryPostList.tag_status === false'
            prop='tag'
            label="文章标签"
            style='width: 75%;display: inline-block'
            :labelCol="{lg: {span: 5}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 10} }">
            <a-select v-model="queryPostList.tag" mode="tags" style="width: 100%" placeholder="请输入标签">
              <a-select-option v-for="(v, k) in postTag" :key="k" :value="v.value">
                {{ v.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            prop='pageClass'
            label="页面文章列表类（最大范围）"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入页面文章列表类！"
              v-model='queryPostList.pageClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='download_status'
            label="开启下载"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-switch default-checked v-model='queryPostList.download_status' />
          </a-form-model-item>
          <a-form-model-item
            prop='pageListClass'
            label="页面文章链接类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入页面文章链接类！"
              v-model='queryPostList.pageListClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='pageListElement'
            label="页面文章链接元素"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入页面文章链接元素！"
              v-model='queryPostList.pageListElement'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postTitleClass'
            label="文章标题类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章标题类！"
              v-model='queryPostList.postTitleClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postTitleElement'
            label="文章标题元素"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="文章标题元素！"
              v-model='queryPostList.postTitleElement'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postLikeClass'
            label="文章喜欢数类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章喜欢数类！"
              v-model='queryPostList.postLikeClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postLikeElement'
            label="文章喜欢数元素"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章喜欢数元素！"
              v-model='queryPostList.postLikeElement'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postViewClass'
            label="文章查看数类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章查看数类！"
              v-model='queryPostList.postViewClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postViewElement'
            label="文章查看数元素"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="文章查看数元素！"
              v-model='queryPostList.postViewElement'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postContentClass'
            label="文章内容类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容类！"
              v-model='queryPostList.postContentClass'/>
          </a-form-model-item>
          <a-form-model-item
            prop='postContentElement'
            label="文章内容元素"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容元素！"
              v-model='queryPostList.postContentElement'/>
          </a-form-model-item>
          <a-form-model-item
            prop='exceptContentClass'
            label="文章内容排除类"
            style='width: 45%;display: inline-block'
            :labelCol="{lg: {span: 11}, sm: {span: 11}}"
            :wrapperCol="{lg: {span: 13}, sm: {span: 10} }">
            <a-input
              placeholder="请输入文章内容排除类！"
              v-model='queryPostList.exceptContentClass'/>
          </a-form-model-item>
          <a-form-model-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center"
          >
            <a-button @click='handleSaveSubmit' htmlType="submit" type="primary">保存</a-button>
            <a-button @click='handleSubmit' htmlType="submit" type="primary">采集</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getImg } from '@/utils/util'
import { queryPostsList } from '@/api/query_list'
import { getCategoryList } from '@/api/category'
import { getTagList } from '@/api/tag'
import { getSettingList, updateSettingList } from '@/api/setting'

export default {
  name: 'BaseForm',
  data () {
    return {
      rules: {
        cms: [{ required: true, message: '请输入文章作者！' }],
        logo: [{ required: true, message: '请输入文章作者！' }],
        seo_title: [{ required: true, message: '请输入文章作者！' }],
        seo_description: [{ required: true, message: '请输入文章作者！' }],
        seo_keywords: [{ required: true, message: '请输入文章作者！' }]
      },
      'queryPostList': [],
      getImg,
      postCategory: {},
      postTag: {},
      loading: false
    }
  },
  created () {
    this.getSetting()
    this.PostCategory()
    this.PostTag()
  },
  methods: {
    async getSetting () {
      const that = this
      await getSettingList({
        'name': 'site_query_list'
      }).then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        this.queryPostList = res.result.data[0].value
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
        'son': 0
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postCategory = res.result.data
        })
    },
    handleSubmit () {
      this.loading = true
      const that = this
      this.$refs.cmsForm.validate(valid => {
        if (valid) {
          queryPostsList(this.queryPostList).then(res => {
            res.code === 200 ? that.$message.success(res.message) : that.$message.error(res.message)
            this.loading = false
          })
        }
      })
    },
    handleSaveSubmit () {
      this.loading = true
      const that = this
      this.$refs.cmsForm.validate(valid => {
        if (valid) {
          const data = {
            'name': 'site_query_list',
            'value': this.queryPostList
          }
          updateSettingList(data).then(res => {
            res.code === 200 ? that.$message.success(res.message) : that.$message.error(res.message)
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
