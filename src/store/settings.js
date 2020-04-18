import  * as authInfo from '../utils/auth.js';

const state = {
    iframe: authInfo.getIframe(),  // 是否不使用自己的head头，和side菜单栏；
    fullscreen: false, // true 地图左侧全屏；
    flexible:false,  // true地图全屏
  }
  
  const mutations = {
    SET_IFRAME:(state,iframe) =>{
      state.iframe = iframe;
      authInfo.setIframe(iframe);
    },
    // 是否全屏
    SET_FullSCREEN: (state, fullscreen) => {
      state.fullscreen = fullscreen;
    },
    SET_FLEXIBLE:(state,flexible) =>{
      state.flexible = flexible;
    }
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations
  }
  