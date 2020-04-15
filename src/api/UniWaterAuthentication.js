
import axios from "axios"; 
// import config from "../config/config.js";
//引入加密方法
import * as Des from "../utils/des.js";
let config = null;
let instance = null;

export function getsecret() {
  return Des.encryptSHA256(
    config.UniWaterconfig.client_id +
      "$" +
      config.UniWaterconfig.client_secret
  );
}
// 接收 从 vuex中传来的 config信息，uniwaterurl等
function configInit (configg){
    config= configg
    instance= axios.create({
              baseURL: config.UniWaterUrl,
              //解决跨域
              crossDomain: true,
              timeout: 30000,
              //转换res为json
              responseType: "json",
              headers: {
                "Content-Type": "application/json"
              },
              transformRequest: [
                function(data) {
                  data = JSON.stringify(data);
                  return data;
                }
              ]
            });
}
export default {

  // 获取access_token
  getUserInfo(configg, redirect_uri, code) {
      console.log('+++++++',configg)
      configInit(configg)
    return new Promise((resolve, reject) => {
      instance({
        method: "post",
        url: "/hdl/oauth/v1.0/access.json",
        data: {
          grant_type: "authorization_code",
          client_id: config.UniWaterconfig.client_id,
          client_secret: getsecret(),
          code: code,
          redirect_uri: redirect_uri
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //菜单树（用户权限）
  getMenu(configg, userid, access_token) {
    configInit(configg)
    return new Promise((resolve, reject) => {
      instance({
        method: "post",
        url: "/hdl/uniwater/v1.0/menu/tree.json",
        data: {
          access_token: access_token,
          userid: userid
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
