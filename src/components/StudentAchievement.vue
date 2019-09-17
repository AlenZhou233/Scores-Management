<template>
  <div class="content">
    <div class="infolist">
      <el-table
        :data="scores"
        tooltip-effect="dark"
        border
        style="width: 100%"
        ref="multipleTable"
        max-height="866px"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <el-table-column sortable prop="classOrder" label="班序" width="110"></el-table-column>
        <el-table-column sortable prop="studentName" label="姓名" width="90"></el-table-column>
        <el-table-column sortable prop="chinese" label="语文" width="114"></el-table-column>
        <el-table-column sortable prop="mathematics" label="数学" width="120"></el-table-column>
        <el-table-column sortable prop="english" label="英语" width="114"></el-table-column>
        <el-table-column sortable prop="physics" label="物理" width="114"></el-table-column>
        <el-table-column sortable prop="thought" label="思品" width="114"></el-table-column>
        <el-table-column sortable prop="history" label="历史" width="114"></el-table-column>
        <el-table-column sortable prop="geography" label="地理" width="114"></el-table-column>
        <el-table-column sortable prop="biology" label="生物" width="114"></el-table-column>
        <el-table-column sortable prop="sum" label="总分" width="114"></el-table-column>
        <el-table-column sortable prop="classRank" label="班排" width="114"></el-table-column>
        <el-table-column sortable prop="schoolRank" label="校排" width="114"></el-table-column>
        <el-table-column sortable prop="examName" label="考试" width="150"></el-table-column>
      </el-table>
    </div>
    <div id="chart" ref="chart" class="chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
export default {
  name: "StudentAchievement",
  data() {
    return {
      chart: null,
      scores: []
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
  },
  methods: {
    getData() {
      let instance = axios.create({
        baseURL: "http://129.204.78.164:8999"
      });
      instance
        .post("/achievement/getList", {
          studentId: this.$route.params.studentId,
          examId: "",
          token: "da140620-1ae5-43cc-a341-607c70a0145c"
        })
        .then(response => {
          this.scores = response.data.data;
          let iterator = this.scores.values();
          let chinese = [];
          let mathematics = [];
          let english = [];
          let physics = [];
          let thought = [];
          let history = [];
          let geography = [];
          let biology = [];
          let examName = [];
          for (let value of iterator) {
            chinese.push(value.chinese);
            mathematics.push(value.mathematics);
            english.push(value.english);
            physics.push(value.physics);
            thought.push(value.thought);
            history.push(value.history);
            geography.push(value.geography);
            biology.push(value.biology);
            examName.push(value.examName);
          }
          let option = {
            title: {
              text: "学生成绩统计图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: [
                "语文",
                "数学",
                "英语",
                "物理",
                "思品",
                "历史",
                "地理",
                "生物"
              ]
            },
            grid: {
              bottom: "3%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: examName
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                name: "语文",
                type: "line",
                data: chinese
              },
              {
                name: "数学",
                type: "line",
                data: mathematics
              },
              {
                name: "英语",
                type: "line",
                data: english
              },
              {
                name: "物理",
                type: "line",
                data: physics
              },
              {
                name: "思品",
                type: "line",
                data: thought
              },
              {
                name: "历史",
                type: "line",
                data: history
              },
              {
                name: "地理",
                type: "line",
                data: geography
              },
              {
                name: "生物",
                type: "line",
                data: biology
              }
            ]
          };
          console.log(examName);
          this.chart.setOption(option);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  margin-top: 10px;
  flex: 1;
  flex-direction: column;
  display: flex;
  background: white;
  overflow: auto;
  margin-left: 1%;
  border-radius: 5px;
}
.infolist {
  border-radius: 5px;
  height: auto;
  margin-top: 15px;
  margin-left: 10px;
}
.chart {
  margin-top: 10px;
  width: 100%;
  height: 400px;
}
</style>