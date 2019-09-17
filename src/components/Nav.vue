<template>
  <div class="box">
    <aside class="sideBar">
      <el-row class="tac">
        <el-col :span="24">
          <div class="top-title">
            <h5>成绩管理</h5>
            <h5>xxxx</h5>
          </div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#162850"
            text-color="#E4E7ED"
            router
          >
            <el-menu-item index="ClassManage">
              <i class="el-icon-menu"></i>
              <span slot="title">班级管理</span>
            </el-menu-item>
            <el-menu-item index="StuList">
              <i class="el-icon-info"></i>
              <span slot="title">学生列表</span>
            </el-menu-item>
            <el-menu-item index="ExamList">
              <i class="el-icon-document"></i>
              <span slot="title">考试列表</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </aside>
    <div class="container">
      <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: this}"> 班级管理</el-breadcrumb-item>
          <el-breadcrumb-item>班级管理</el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="item of menu" :key="item.path" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  display: flex;
  height: 100%;
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    background: #f2f6fc;
  }
}
.el-menu {
  border: none;
}
.sideBar {
  width: 200px;
  background-color: rgb(22, 40, 80);
  .top-title {
    color: #fff;
  }
}
.header {
  height: 50px;
  background: white;
  width: 100%;
  display: flex;
  align-items: center;
  color: #333;
}
.el-breadcrumb {
  margin-left: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      menu: []
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      console.log(matched);
      const first = matched[0];
      if(!this.isHome(first)){
        // matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
        this.menu = matched;
      }
    },
    isHome(route) {
      return route.name === "Login";
    }
  },

};
</script>