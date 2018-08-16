/* eslint-disable no-unused-vars */
import * as types from '../mutation-types'

//state：状态定义
const state = {
  currentUser: null,
  isLogin: false,
  token: ""
}
// getters：状态设置
const getters = {
  currentUser: state => state.currentUser,
  isLogin: state => state.isLogin
}
// actions：引发状态变化
const actions = {
  setUser({commit}, user){
    commit(types.SET_USER_STATUS, user)
  }
}
// mutations：状态变化
const mutations = {
  [types.SET_USER_STATUS] (state, user){
    if(user){
      sessionStorage.setItem("userid", user);
      state.currentUser = user;
      state.isLogin = true;
    }else if(user == null){
      //登出的时候，清空sessionStorage
      sessionStorage.removeItem("userid");
      state.currentUser = null;
      state.isLogin = false;
      // state.token = "";
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
