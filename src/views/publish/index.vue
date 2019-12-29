<template>
    <div>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-page>发布文章</my-page>
      </div>
        </el-card>
    </div>
</template>
<script>
import MyPage from '@/components/index'
export default {
  components: { 'my-page': MyPage }
}
</script>
