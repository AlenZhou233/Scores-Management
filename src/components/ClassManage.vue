<template>
  <div class="content">
    <div class="crud">
      <el-button type="primary">
        <i class="el-icon-plus"></i>增加
      </el-button>
      <el-button type="danger" plain disabled>
        <i class="el-icon-delete"></i>删除
      </el-button>
      <div class="flex-1"></div>
    </div>
    <div class="dividing-line"></div>
    <div class="infolist">
      <el-table
        :data="classes"
        tooltip-effect="dark"
        border
        style="width: 100%"
        ref="multipleTable"
        max-height="866px"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <el-table-column prop="className" label="班级名称" width="370"></el-table-column>
        <el-table-column prop="session" label="届数" width="370"></el-table-column>
        <el-table-column prop="grade" label="年级" width="370"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="370"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ClassManage",
  data() {
    return {
      classes: []
    };
  },
  created() {this.getData()},
  methods: {
    getData() {
      let instance = axios.create({
        baseURL: "http://129.204.78.164:8999"
      });
      instance
        .post("/class/getList", {
          token: "da140620-1ae5-43cc-a341-607c70a0145c"
        })
        .then((response)=> {
          this.classes = response.data.data;
          console.log(this.classes);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  background: #f2f6fc;
  .content {
    margin-top: 10px;
    flex: 1;
    flex-direction: column;
    display: flex;
    background: white;
    overflow: auto;
    margin-left: 1%;
    border-radius: 5px;
    .crud {
      display: flex;
      width: 100%;
      height: 50px;
      .el-button {
        margin-left: 5px;
        margin-top: 10px;
      }
      .flex-1 {
        flex: 1;
      }
    }
    .dividing-line {
      height: 1px;
      width: 100%;
      box-shadow: 0 2px 1px #ccc;
      margin-top: 5px;
    }
    .infolist {
      margin-top: 15px;
      margin-left: 5px;
      border-radius: 5px;
      flex: 1;
      height: auto;
    }
  }
}
.el-breadcrumb {
  margin-left: 20px;
}
</style>