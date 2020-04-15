import  * as authInfo from '../utils/auth.js';
import { Loading,Message} from "element-ui";

const permission = function(router, store, asyncRouters){
  let loading=null;
  const whiteList = ['/login', '/404'] 

  router.beforeEach(async (to, from, next) => {
    startLoading(); // 开始加载
    if (to.query.UniWater) {
       authInfo.removeLocalCache(); // 清除系统缓存数据信息
       store.commit('user/SET_LOGINTYPE', true)

       let login =
       store.state.config.UniWaterUrl +
       "/hdl/oauth/v1.0/login?response_type=code&state=test&client_id=" +
       store.state.config.UniWaterconfig.client_id +
       "&redirect_uri=" +
       location.origin +
       location.pathname;
       location.replace(login);
       return false
    }
    // 是否全屏加载
    if (to.query.iframe) {
      store.commit("settings/SET_IFRAME", true)
    }
    if (to.query.code) {
        store.commit("user/SET_UNIWATERCODE", to.query.code);
        // Uniwater登录,存uniwatertoken，userInfo
        await store.dispatch("user/uniwaterLogin").then().catch(error => {
          Message.error('登录错误!');
          loginerr()
        }) 
    }
    const hasToken = authInfo.getUniwaterToken()
    // const loginType = authInfo.getLoginSystemType();
    const hasMenuRoles = store.state.user.menuRoles && store.state.user.menuRoles.length > 0

    if (hasToken && hasToken.access_token) {
      if (hasMenuRoles) {
        console.log('有token，有menu，next')
          next();
      }else{
          store.dispatch("permission/generateRoutesForUniWater",asyncRouters).then(res => {
           console.log('有token，没menu，发getmenu，并过滤好路由表',res)
           if(res && res.length > 0){
            router.addRoutes(res)
            next({ ...to, replace: true });
           }else{
            Message.error('获取菜单为空！请检查权限！');
           }

          }).catch( err=>{
            Message.error('获取菜单权限错误');
            console.error(err)
            loginerr()
          })
        
      }
    }else{
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        loginerr()
        // next(`/login?redirect=${to.path}`);
        // endLoading();
      }
    }
  
  })

  router.afterEach(() => {
    endLoading();
  });


    // 开始加载
    function startLoading(option) {
      //使用Element loading-start 方法
      let loadOption = Object.assign(
        {
          lock: true,
          text: "加载中……",
          background: "rgba(0, 0, 0, 0.7)"
        },
        option
      );
      loading = Loading.service(loadOption);
    }
    
    // 结束加载
    function endLoading() {
      //使用Element loading-close 方法
      loading.close();
    }

    function loginerr() {
      // 跳转到 uniwater的 登录页面
      location.replace(store.state.config.UniWaterLogin);
  }
}

export default permission