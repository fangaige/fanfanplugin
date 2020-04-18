
import  * as authInfo from '../utils/auth.js';
import UniWaterAuthentication from "../api/UniWaterAuthentication";
import { Message } from "element-ui";

const state = {
    loginType: authInfo.getLoginSystemType(), // 是否uniwater登录方式 true:uniwater 方式登录 false:独立系统模式登录
    // token: authInfo.getToken(), // 取得Cookie
    uniwatercode: "", // uniwater 系统授权码
    uniwatertoken: authInfo.getUniwaterToken(), // uniWater详细信息
    userInfo: authInfo.getUserInfo(), //登录用户详细信息
    menuRoles: [], // 菜单权限
    functions: [], // 当前系统功能菜单
    // pageaction: null, // 页面按钮
    // changepwd: false // 是否允许修改密码
  };

  const mutations = {
    //登录类型
    SET_LOGINTYPE: (state, loginType) => {
      state.loginType = loginType;
      authInfo.setLoginSystemType(loginType);
    },
    //系统Token
    // SET_TOKEN: (state, token) => {
    //   state.token = token;
    //   authInfo.setToken(token);
    // },
    // uniWater授权码
    SET_UNIWATERCODE: (state, uniwatercode) => {
      state.uniwatercode = uniwatercode;
    },
    // 对应子系统路由名称
    // SET_UNIWATER_SYSTEMCODE: (state, uniwater_systemcode) => {
    //   state.uniwater_systemcode = uniwater_systemcode;
    //   authInfo.setUniwaterCode(uniwater_systemcode);
    // },
    SET_UNIWATERTOKEN: (state, uniwatertoken) => {
      state.uniwatertoken = uniwatertoken;
      authInfo.setUniwaterToken(uniwatertoken);
    },
    SET_USERINFO: (state, userDetials) => {
      let userInfo = {};
      userInfo.userID = userDetials._id;
      userInfo.userName = userDetials.name;
      userInfo.iDeptID = userDetials.group;

      state.userInfo = userInfo;
      authInfo.setUserInfo(state.userInfo);
    },
    SETMENUROLES: (state, menuRoles) => {
      state.menuRoles = menuRoles;
    },
    SET_FUNCTIONS: (state, functions) => {
      state.functions = functions;
    },
    // SET_PAGEACTION: (state, pageaction) => {
    //   state.pageaction = pageaction;
    // },
    // SET_CHANGEPWD: (state, changepwd) => {
    //   state.changepwd = changepwd;
    // }
  };

  const actions = {

    uniwaterLogin({ commit, state, rootState }) {
      return new Promise( (resolve, reject)=> {
        
        if(!state.uniwatertoken){
          // 取得uniWater用户登录得token信息，及当前登录用户得详细信息
          UniWaterAuthentication.getUserInfo(rootState.config, location.origin + location.pathname, state.uniwatercode)
          .then(res => {
            let unUniWaterToken = {
              token_type: res.token_type,
              access_token: res.access_token,
              refresh_token: res.refresh_token,
              expires_in: res.expires_in
            };
            commit("SET_UNIWATERTOKEN", unUniWaterToken);
            commit("SET_USERINFO", res.user);
            resolve();
          })
          .catch(error => {
            // Message.error('登录错误');
            reject(error);
          });
         }else{
           resolve()
          }
        })
    },



  }

export default {
    namespaced: true,
    state,
    mutations,
    actions
  };