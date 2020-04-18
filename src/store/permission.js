import  * as authInfo from '../utils/auth.js';
import UniWaterAuthentication from "../api/UniWaterAuthentication";
import _ from "lodash";
/**
 * 使用角色确定当前用户是否具有权限
 * @param roles 角色
 * @param route 路由
 */
function hasPermission(roles, route) {
    // if (route.meta && route.meta.roles) {
    //   return roles.some(role => route.meta.roles.includes(role));
    // } else {
    //   return true;
    // }
    if (route.meta && route.meta.code) {
      return roles.some(
        role => route.meta.code.toLowerCase() === role.toLowerCase()
      );
    } else {
      return true;
    }
  }
/**
 * 递归过滤异步路由表
 * @param routes 异步路由
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
      const tmp = { ...route };
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles);
        }
        res.push(tmp);
      }
    });
    return res;
  }

export function buildMenu(functions) {
    const res = [];
    functions.forEach(info => {
      if (info.children) {
        res.push({
          menuID: info._id,
          pMenuID: info.pid,
          actionType: info.type,
          keyName: info.value,
          cFunName: info.name,
          cFunIcon: info.icon,
          cFunUrl: info.value,
          children: buildMenu(info.children)
        });
      } else {
        res.push({
          menuID: info._id,
          pMenuID: info.pid,
          actionType: info.type,
          keyName: info.value,
          cFunName: info.name,
          cFunIcon: info.icon,
          cFunUrl: info.value
        });
      }
    });
    return res;
  }

  /**
 * 从uniWater中取得当前系统所有得菜单权限
 */
export function uniWaterFunctions(functions) {
    const res = [];
    functions.forEach(info => {
      info.type != "action" && res.push(info.value);
      if (info.children) {
        uniWaterFunctions(info.children).forEach(eachInfo => {
          res.push(eachInfo);
        });
      }
    });
    return res;
  }
//******************************************************************************* */
const state = {
    routes: [],
    addRoutes: []
  };
  
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};
const actions = {
    generateRoutesForUniWater({ commit, rootState }, asyncRouters) {

        return new Promise((resolve, reject) => {
          // 取得unWater树型菜单
          UniWaterAuthentication.getMenu(
            rootState.config,
            rootState.user.userInfo.userID,
            rootState.user.uniwatertoken.access_token
          )
            .then(res => {
              let uniwaterMenu = _.filter(res.Response, {
                code: rootState.uniwater_systemcode
              });
              
              let roles = [];
              if (uniwaterMenu.length > 0) {
                let systemMenu = buildMenu(uniwaterMenu);
                commit("user/SET_FUNCTIONS", systemMenu, {root: true});
               
                roles = uniWaterFunctions(uniwaterMenu[0].children);
                commit("user/SETMENUROLES", roles, {root: true});
              }
              /***正式，使用代码**** */
              let accessedRoutes = [];
              if (roles.length > 0) {
               
                accessedRoutes = filterAsyncRoutes(asyncRouters, roles);
              }
            //   let accessedRoutes = asyncRoutes;// 启用正式代码此行去掉 ---- 仅用于测试使用
            //   /***正式，使用代码**** */
            //   commit("SET_ROUTES", accessedRoutes);
              resolve(accessedRoutes);
              
            // console.log('getMenu',rootState.uniwater_systemcode,res)
            // console.log('systemmenu++++',uniwaterMenu,rootState.user.functions,rootState.user.menuRoles)
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      iframeRoutersUniWater( {commit, rootState }, asyncRouters){

        return new Promise((resolve, reject) => {
            const roles = location.pathname.split('/').splice(1) || ['fan']
            commit("user/SETMENUROLES", roles, {root: true});
            
            const accessedRoutes = asyncRouters  // filterAsyncRoutes(asyncRouters, roles);
            
            resolve(accessedRoutes);
        })
      }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
  };