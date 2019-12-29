<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-page>内容管理</my-page>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <template>
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>

        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <span>根据筛选条件共查询到{{ArticleNum}}条数据：</span>
        </el-breadcrumb>
      </div>
      <template>
        <el-table style="width: 100%" :data="tableData">
          <el-table-column prop label="封面" width="180">
            <template slot-scope="scope">
              <!-- 图片组件 -->
              <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
                <div slot="error">
                  <img src="../../assets/error.gif" style="width:150px;height:100px" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
              <el-tag v-if="scope.row.status===1">待审核</el-tag>
              <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
              <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/publish?id='+scope.row.id)" ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delArticle(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        :page-size="reqParams.per_page"
        layout="prev, pager, next"
        :total="ArticleNum"
        background
        @current-change="changePager"
        :current-page="reqParams.page"
        style="float:right;margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyPage from '@/components/index'
export default {
  components: { 'my-page': MyPage },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 20,
        page: 1
      },
      channelOptions: [],
      dateArr: [],
      tableData: [],
      ArticleNum: 0,
      target: 0
    }
  },
  created () {
    this.getChannelData()
    this.getArticleList()
  },
  methods: {
    delArticle (id) {
      this.$confirm('老铁，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        // 地址  articles/id  请求 delete
        // get 获取数据 post 添加数据 delete 删除属性 put 完整修改数据 patch 局部修改数据
        await this.$http.delete(`articles/${id}`)
        // 代码走这 成功
        this.$message.success('删除成功')
        this.getArticleList()
      }).catch(() => {
        // 点击取消
      })
    },
    async getChannelData () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticleList () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
      // console.log(this.tableData[0].id.toString())
      this.ArticleNum = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticleList()
    },
    search () {
      this.reqParams.page = 1
      this.getArticleList()
    },
    changeDate (value) {
      if (!value) value = [null, null]
      this.reqParams.begin_pubdate = value[0]
      this.reqParams.end_pubdate = value[1]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
