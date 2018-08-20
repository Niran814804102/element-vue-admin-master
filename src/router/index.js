import Main from '../views/index.vue'
import Abstract from '../views/layout/abstract.vue'
import PersonalData from '../views/home/personal_data.vue'
import PublicData from '../views/home/public_data.vue'
import Login from '../views/login.vue'

import DataExplore from '../views/project/dataexplore.vue'
import ModelCompute from '../views/project/modelcompute.vue'
import DataDisplay from '../views/project/datadisplay.vue'

import AllProject from '../views/project/allproject.vue'
import ModelProject from '../views/project/modelproject.vue'
import DisplayProject from '../views/project/displayproject.vue'
import ExploreProject from '../views/project/exploreproject.vue'
import testDialog from '../../src/components/dialog/testDialog.vue'


export const loginRouter = {
  path: '/login',
  name: 'login',
  meta:{
    title: '登录',
  },
  icon: 'fa fa-user-circle-o fa-lg',
  component: Login,
}

export const appRouter = [
  {
    meta: {
      title: '数据资源',
    },
    path: '/dataSource',
    name: 'dataSource',
    icon: 'fa fa-database fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '公共数据',
          requireAuth: false
        },
        name: 'pubData',
        path: 'pubData',
        icon: 'fa fa-database fa-lg',
        component: PublicData
      },
      {
        meta: {
          title: '我的数据',
          requireAuth: true
        },
        name: 'perData',
        path: 'perData',
        icon: 'fa fa-database fa-lg',
        component: PersonalData
      }
    ]
  },
  {
    meta: {
      title: '应用功能'
    },
    name: 'appManage',
    path: '/appManagement',
    icon: 'fa fa-cubes fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '数据上图',
          requireAuth: false
        },
        name: 'dataViewM',
        path: 'dataViewM',
        icon: 'fa fa-map fa-lg',
        component: DataDisplay
      },{
        meta: {
          title: '数据探索',
          requireAuth: false
        },
        name: 'dataExplorerM',
        path: 'dataExplorerM',
        icon: 'fa fa-eercast fa-lg',
        component: DataExplore
      },{
        meta:{
          title: '模型计算',
          requireAuth: false
        },
        name: 'Model',
        path: 'Model',
        icon: 'fa fa-life-ring fa-lg',
        component: ModelCompute
      },
      {
        meta: {
          title: '数据编辑',
          requireAuth: false
        },
        name: 'dataEditor',
        path: 'dataEditor',
        icon: 'fa fa-pencil-square-o fa-lg',
        component: testDialog
      },
    ]
  },
  {
    meta: {
      title: '项目管理'
    },
    path: '/project',
    name: 'project',
    icon: 'fa fa-folder-o fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '所有项目',
          requireAuth: false
        },
        name: 'allProject',
        path: 'allProject',
        icon: 'fa fa-folder-open-o fa-lg',
        component: AllProject,
      },
      {
        meta: {
          title: '模型项目',
          requireAuth: false
        },
        name: 'modelProject',
        path: 'modelProject',
        icon: 'fa fa-life-ring fa-lg',
        component: ModelProject,
      },
      {
        meta: {
          title: '地图项目',
          requireAuth: false
        },
        name: 'dataDisplay',
        path: 'dataDisplay',
        icon: 'fa fa-map fa-lg',
        component: DisplayProject
      },
      {
        meta: {
          title: '统计项目',
          requireAuth: false
        },
        name: 'dataExplorer',
        path: 'dataExplorer',
        icon: 'fa fa-eercast fa-lg',
        component: ExploreProject
      },
    ]
  },
  // {
  //   meta: {
  //     title: '程序开发'
  //   },
  //   name: 'developer',
  //   path: '/developer',
  //   icon: 'fa fa-life-ring fa-lg',
  //   component: Abstract,
  //   children: [
  //     {
  //       meta: {
  //         title: '秘钥管理',
  //         requireAuth: false
  //       },
  //       name: 'keyManegement',
  //       path: 'keyManegement',
  //       icon: 'fa fa-key fa-lg',
  //       component: Table
  //     },{
  //       meta: {
  //         title: '开发文档',
  //         requireAuth: false
  //       },
  //       name: 'help',
  //       path: 'help',
  //       icon: 'fa fa-file-word-o fa-lg',
  //       component: Table
  //     }
  //   ]
  // }
]
//TODO 修改不加路径时跳转的url地址
export const mainRouter = {
  path: '/',
  redirect: '/dataSource/pubData',
  name: 'index',
  meta: {
    title: '首页'
  },
  component: Main,
  children: appRouter
}

export const routers = [
  loginRouter,
  mainRouter,
  // toolbarRouter,
  // catch all redirect
  {path: '*', redirect: '/dataSource/pubData'}
]

/*export const toolbarRouter = {
  path: '/personal',
  name: 'personal',
  component: personal
}*/

