<template>
  <div class="container">
    <div class="content">
      <div class="crud">
        <el-input v-model="input" placeholder="考试名称" maxlength="100px" type="text"></el-input>
        <el-button type="primary">
          <i class="el-icon-plus"></i>增加
        </el-button>
        <el-button type="danger" plain disabled>
          <i class="el-icon-delete"></i>删除
        </el-button>
      </div>
      <div class="dividing-line"></div>
      <div class="infolist">
        <el-table
          :data="exams"
          tooltip-effect="dark"
          border
          style="width: 100%"
          ref="multipleTable"
          max-height="866px"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="#" width="40"></el-table-column>
          <el-table-column prop="examName" label="考试" width="200"></el-table-column>
          <el-table-column prop="remark" label="详情" width="1100"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ExamList",
  data() {
    return {
      input: "",
      exams: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let instance = axios.create({
        baseURL: "http://129.204.78.164:8999"
      });
      instance
        .post("/exam/getList", {
          classId: "b6affbc6-534d-4130-9509-c81754e9d609",
          examName: "",
          token: "da140620-1ae5-43cc-a341-607c70a0145c"
        })
        .then(response => {
          this.exams = response.data.data;
          console.log(this.exams);
        })
        .catch(function(error) {
          console.log(error);
        });
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
        margin-left: 10px;
        margin-top: 10px;
      }
      .flex-1 {
        flex: 1;
      }
      .el-input {
        margin-top: 10px;
        width: 200px;
        left: 5px;
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
.el-dialog__wrapper {
  width: 50%;
  left: 20%;
  .el-form-item__label {
    width: 45px;
    margin-bottom: 10px;
    margin-top: 0px;
  }
  .el-textarea {
    width: 200px;
  }
  .el-input {
    width: 55%;
  }
}
</style>