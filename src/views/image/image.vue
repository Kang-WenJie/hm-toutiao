<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-page>素材管理</my-page>
      </div>

      <!-- 按钮区 -->
      <div class="btn">
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="openDialog()">添加素材</el-button>
      </div>
      <!-- 图片素材区 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option"  v-if="!reqParams.collect">
            <span @click="toggleStatus(item)"
              class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
      ></el-pagination>

      <el-dialog title="上传素材" :visible.sync="dialogVisible" width="300px">
       <el-upload
         class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
import MyPage from '@/components/index'
export default {
  components: { 'my-page': MyPage },
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    uploadSuccess (res) {
      // console.log(res) === {data:{url:'图片地址'}}
      // 预览图片
      this.imageUrl = res.data.url
      // 成功的提示
      this.$message.success('上传成功')
      // 2s关闭对话框 更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.imageUrl = null
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.dialogVisible = true
    },
    async delImage (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除图片成功')
        this.getImages()
      } catch (e) {
        this.$message.error('删除图片失败')
      }
    },
    async toggleStatus (item) {
      try {
        // 请求
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        // 提示
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星样式
        // 修改当前图片的数据，is_collected 值改成后台返回的值即可
        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },

    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style lang="less" scoped>
.img_list {
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 30px 50px 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
