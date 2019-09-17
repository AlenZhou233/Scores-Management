<template>
  <div class="container">
    <div class="content">
      <div class="crud">
        <el-input v-model="input" placeholder="学生姓名" maxlength="100px" type="text"></el-input>
        <el-button @click="searchStudents" type="primary">搜索</el-button>
        <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>
        <el-dialog title="创建学生" :visible.sync="dialogFormVisible">
          <el-form :model="form" >
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.studentName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="班序" :label-width="formLabelWidth">
              <el-input v-model="form.classOrder" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" :label-width="formLabelWidth">
              <el-input v-model="form.address" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="form.gender" label="1">男</el-radio>
              <el-radio v-model="form.gender" label="2">女</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createStudent">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="success">导出模板</el-button>
        <el-button type="success">导入</el-button>
        <el-button type="danger" plain>删除</el-button>
        <div class="flex-1"></div>
      </div>
      <div class="line-top">
        <div class="dividing-line"></div>
      </div>
      <div class="infolist">
        <el-table
          :data="students"
          tooltip-effect="dark"
          border
          style="width: 100%"
          ref="multipleTable"
          max-height="866px"
          show-header
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="#" width="40"></el-table-column>
          <el-table-column sortable prop="classOrder" label="班序" width="80"></el-table-column>
          <el-table-column sortable prop="studentName" label="姓名" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="getScores(scope.row)">{{ scope.row.studentName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="100"></el-table-column>
          <el-table-column prop="phone" label="联系电话" width="100"></el-table-column>
          <el-table-column prop="address" label="家庭住址" width="981"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="updateStudent(scope.row)" size="small">修改</el-button>
              <el-button type="text" @click="deleteConfirm(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="修改学生信息" :visible.sync="updateFormVisible">
          <el-form :model="updateForm">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="updateForm.studentName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="班序" :label-width="formLabelWidth">
              <el-input v-model="updateForm.classOrder" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="updateForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" :label-width="formLabelWidth">
              <el-input v-model="updateForm.address" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="updateForm.gender" label="1">男</el-radio>
              <el-radio v-model="updateForm.gender" label="2">女</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateConfirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "StuList",
  data() {
    return {
      input: "",
      students: [],
      updateFormVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        studentName: "",
        classOrder: "",
        phone: "",
        address: "",
        gender: "1"
      },
      updateForm: {
        studentName: "",
        classOrder: "",
        phone: "",
        address: "",
        gender: ""
      }
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
        .post("/Student/getList", {
          classId: "b6affbc6-534d-4130-9509-c81754e9d609",
          studentName: "",
          token: "da140620-1ae5-43cc-a341-607c70a0145c"
        })
        .then(response => {
          this.students = response.data.data;
          console.log(this.classes);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchStudents() {
      let searchValue = this.input;
      let values = this.students.values();
      let found = [];
      if (searchValue != "") {
        for (let value of values) {
          if (value.studentName.match(searchValue)) {
            found.push(value);
          }
        }
        this.input = "";
        this.students = found;
      } else if (searchValue == "") {
        this.getData();
      }
    },
    createStudent() {
      let instance = axios.create({
        baseURL: "http://129.204.78.164:8999"
      });
      instance
        .post("/Student/create", {
          classId: "b6affbc6-534d-4130-9509-c81754e9d609",
          studentName: this.form.studentName,
          studentId: "",
          phone: this.form.phone,
          gender: this.form.gender,
          classOrder: this.form.classOrder,
          address: this.form.address,
          token: "da140620-1ae5-43cc-a341-607c70a0145c"
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
    },
    updateStudent(index) {
      this.updateFormVisible = true;
      this.updateForm.studentName = index.studentName;
      this.updateForm.classOrder = index.classOrder;
      this.updateForm.phone = index.phone;
      this.updateForm.address = index.address;
      this.updateForm.gender = index.gender;
    },
    updateConfirm() {
      this.$confirm("是否修改学生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let instance = axios.create({
            baseURL: "http://129.204.78.164:8999"
          });
          instance
            .post("/Student/update", {
              address: this.updateForm.address,
              classId: "b6affbc6-534d-4130-9509-c81754e9d609",
              classOrder: this.updateForm.classOrder,
              gender: this.updateForm.gender,
              phone: this.updateForm.phone,
              studentId: this.updateForm.studentId,
              studentName: this.updateForm.studentName,
              token: "da140620-1ae5-43cc-a341-607c70a0145c"
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              console.log(response);
              this.updateFormVisible = false;
            })
            .catch(function(error) {
              this.$message({
                type: "warning",
                message: "修改失败"
              });
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    getScores(index) {
      let studentId = index.studentId;
      this.$router.push({ name: 'StudentAchievement', params: { studentId }})
    },
    deleteConfirm(index) {
      this.$confirm("是否删除学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let singleId = index.studentId;
          let idArr = [];
          idArr.push(singleId);
          let instance = axios.create({
            baseURL: "http://129.204.78.164:8999"
          });
          instance
            .post("/Student/delete", {
              studentIds: idArr,
              token: "da140620-1ae5-43cc-a341-607c70a0145c"
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              console.log(response);
            })
            .catch(function(error) {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
        margin-top: 10px;
        margin-left: 10px;
      }
      .el-input {
        margin-top: 10px;
        width: 200px;
        left: 5px;
      }
      .flex-1 {
        flex: 1;
      }
    }
    .line-top {
      margin-top: 5px;
      .dividing-line {
        height: 1px;
        width: 100%;
        box-shadow: 0 2px 1px #ccc;
      }
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