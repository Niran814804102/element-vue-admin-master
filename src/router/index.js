import Main from '../views/index.vue'
import Abstract from '../views/layout/abstract.vue'
import PersonalData from '../views/home/personal_data.vue'
import PublicData from '../views/home/public_data.vue'
import Login from '../views/login.vue'
import Table from '../views/table/table.vue'
import AllProject from '../views/project/allproject.vue'
import DataDisplay from '../views/project/datadisplay.vue'
import DataExplore from '../views/project/dataexplore.vue'
import Data3D from '../views/project/display3d.vue'
import modelcompute from '../views/project/modelcompute.vue'
import DataView from '../views/appmanage/dataview.vue'
import test from '../views/project/test.vue'
import modelSign from'../views/project/modelSign.vue'



export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: Login
}

export const appRouter = [
  // {
  //   title: '地理所',
  //   path: '/home',
  //   name: 'home',
  //   // icon: 'fa fa-home fa-lg',
  //   component: Home
  // },
  {
    title: '数据资源',
    path: '/dataSource',
    name: 'dataSource',
    icon: 'fa fa-database fa-lg',
    component: Abstract,
    children: [
      {
        title: '我的数据',
        name: 'perData',
        path: 'perdata',
        icon: 'fa fa-database fa-lg',
        component: PersonalData
      },
      {
        title: '公共数据',
        name: 'pubData',
        path: 'pubdata',
        icon: 'fa fa-database fa-lg',
        component: PublicData
      }
    ]
  },
  {
    title: '我的项目',
    path: '/project',
    name: 'project',
    icon: 'fa fa-folder-o fa-lg',
    component: Abstract,
    children: [
      {
        title: '所有项目',
        name: 'allProject',
        path: 'allProject',
        icon: 'fa fa-folder-open-o fa-lg',
        component: AllProject
      },
      {
        title: '数据上图',
        name: 'dataDisplay',
        path: 'dataDisplay',
        icon: 'fa fa-map fa-lg',
        component: DataDisplay
      },
      {
        title: '数据探索',
        name: 'dataExplorer',
        path: 'dataExplorer',
        icon: 'fa fa-eercast fa-lg',
        component: DataExplore
      },
      {
        title: '数据上图3D',
        name: 'data3D',
        path: 'data3D',
        icon: 'fa fa-map-o fa-lg',
        component: Data3D
      }
    ]
  },
  {
    title: '应用管理',
    name: 'appManage',
    path: '/appManagement',
    icon: 'fa fa-cubes fa-lg',
    component: Abstract,
    children: [
      {
        title: '数据上图',
        name: 'dataViewM',
        path: 'dataViewM',
        icon: 'fa fa-map fa-lg',
        component: DataView
      },{
        title: '数据探索',
        name: 'dataExplorerM',
        path: 'dataExplorerM',
        icon: 'fa fa-eercast fa-lg',
        component: DataView
      },{
        title: '模型注册',
        name: 'modelSign',
        path: 'modelSign',
        icon: 'fa fa-podcast fa-lg',
        component: modelSign,
      },{
        title: '模型计算',
        name: 'Model',
        path: 'Model',
        icon: 'fa fa-life-ring fa-lg',
        component: modelcompute,
      },{
        title: '数据编辑',
        name: 'dataEditor',
        path: 'dataEditor',
        icon: 'fa fa-pencil-square-o fa-lg',
        component: test
      },{
        title: '数据上图3D',
        name: 'data3DM',
        path: 'data3DM',
        icon: 'fa fa-map-o fa-lg',
        component: DataView
      }
    ]
  },
  {
    title: '程序开发',
    name: 'developer',
    path: '/developer',
    icon: 'fa fa-life-ring fa-lg',
    component: Abstract,
    children: [
      {
        title: '秘钥管理',
        name: 'keyManegement',
        path: 'keyManegement',
        icon: 'fa fa-key fa-lg',
        component: Table
      },{
        title: '开发文档',
        name: 'help',
        path: 'help',
        icon: 'fa fa-file-word-o fa-lg',
        component: Table
      }
    ]
  }
]
//TODO 修改不加路径时跳转的url地址
export const mainRouter = {
  path: '/',
  redirect: '/dataSource/perData',
  name: 'index',
  component: Main,
  children: appRouter
}

export const routers = [
  loginRouter,
  mainRouter,
  // toolbarRouter,
  // catch all redirect
  {path: '*', redirect: '/dataSource/perData'}
]

/*export const toolbarRouter = {
  path: '/personal',
  name: 'personal',
  component: personal
}*/

