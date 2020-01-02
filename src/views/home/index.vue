<template>
  <el-container class="my-container">
    <el-aside :width="flag?'64px':'200px'">
      <div class="logo" v-html="flag?img2:img1">
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse='flag'
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/wel">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="el-header">
        <i class="el-icon-s-operation icon" @click="toggle"></i>
        <span class="text">江苏传智播客科技教育有限公司</span>

        <el-dropdown class="el-dropdown">
          <span class="el-dropdown-link">
          <img :src='photo' alt="">
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="out">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import img01 from '../../assets/logo_admin.png'
import img02 from '../../assets/logo_admin_01.png'
import store from '@/store'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      img1: '<img src="' + img01 + '">',
      img2: '<img src="' + img02 + '">',
      flag: false,
      name: '',
      photo: ''
    }
  },
  created () {
    this.name = store.getUser().name
    this.photo = store.getUser().photo
    eventBus.$on('updateUserName', (name) => {
      this.name = name
    })
    eventBus.$on('updateUserPhoto', (photo) => {
      this.photo = photo
    })
  },
  methods: {
    toggle () {
      this.flag = !this.flag
    },
    setting () {
      this.$router.push('/setting')
    },
    out () {
      if (confirm('确定要退出登录吗？')) {
        store.delUser()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .text {
      margin-left: 8  px;
    }
    .el-dropdown{
      float: right;
      img{
        width: 25px;
        vertical-align: middle;
      }
      .name{
        vertical-align: middle;
        margin-left: 8px;
      }
    }
  }
}

.el-aside {
  background: #002033;
  .logo {
    width: 100%;
    height: 60px;

    text-align: center;
    padding-top: 10px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
