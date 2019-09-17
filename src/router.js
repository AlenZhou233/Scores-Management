import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import ClassManage from './components/ClassManage.vue'
import StuList from './components/StuList.vue'
import ExamList from './components/ExamList.vue'
import Nav from './components/Nav.vue'
import StudentAchievement from './components/StudentAchievement.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
        }, {
            path: '/nav',
            name: 'nav',
            component: Nav,
            redirect: {
                name: 'ClassManage'
            },
            meta: { title: '首页'},
            children: [{
                    path: 'ClassManage',
                    name: 'ClassManage',
                    component: ClassManage,
                    meta: { title: '班级管理'}
                },
                {
                    path: 'StuList',
                    name: 'StuList',
                    component: StuList,
                    meta: { title: '学生列表'}
                },
                {
                    path: 'ExamList',
                    name: 'ExamList',
                    component: ExamList,
                    meta: { title: '考试列表'}
                },
                {
                    path: 'StudentAchievement',
                    name: 'StudentAchievement',
                    component: StudentAchievement,
                    meta: { title: '成绩'}
                }
            ]
        }
    ]
})