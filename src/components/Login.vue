<template>
  <div class="login">
    <span class="title">成绩管理</span>
    <div class="content">
      <div class="content-1">
        <span class="account">账号：</span>
        <input type="text" class="flex-1" v-model="account" placeholder="请输入账号" />
      </div>
      <div class="content-2">
        <span class="pwd">密码：</span>
        <input type="password" class="flex-1" v-model="password" placeholder="请输入密码" />
      </div>
      <div class="flex">
        <div class="flex-1"></div>
        <el-button type="primary" size="medium" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.account == "zcf" && this.password == "123") {
        this.$router.push('Nav');
      }
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  position: absolute;
  display: flex;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  flex-wrap: wrap;
  justify-content: center;
  background: #f5f5f5;
  box-shadow: 0px 0px 5px #888888;
  .title {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    font-size: 1.5em;
    width: 100%;
  }
  .content {
    position: relative;
    left: 0;
    input {
      left: 50%;
      border-radius: 5px;
      margin-top: 0.5em;
      height: 1.5em;
      &:focus::-webkit-input-placeholder {
        color: transparent;
      }
    }
    .pwd,
    .account {
      position: relative;
      font-size: 1em;
      padding: 0.5em;
      left: 0;
    }
    .flex {
      display: flex;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      .flex-1 {
        flex: 1;
      }
    }
  }
}
</style>
