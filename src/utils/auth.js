// 系统统一平台Token信息存储
const TokenKey = "Admin-Token";
export function getToken() {
  return JSON.parse(localStorage.getItem(TokenKey));
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 系统登录类型
const LoginTypekey = "LoginSystem_Type";
export function getLoginSystemType() {
  return JSON.parse(localStorage.getItem(LoginTypekey));
}

export function setLoginSystemType(loginType) {
  return localStorage.setItem(LoginTypekey, JSON.stringify(loginType));
}

export function removeLoginSystemType() {
  return localStorage.removeItem(LoginTypekey);
}

// 用户登录详细信息
const Userkey = "UserInfo-Detials";
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(Userkey));
}

export function setUserInfo(UserInfo) {
  return localStorage.setItem(Userkey, JSON.stringify(UserInfo));
}

export function removeUserInfo() {
  return localStorage.removeItem(Userkey);
}

// 存储uniwaterToken数据信息
const UniWatertokenKey = "Uniwater-Token";
export function getUniwaterToken() {
  return JSON.parse(localStorage.getItem(UniWatertokenKey));
}

export function setUniwaterToken(token) {
  return localStorage.setItem(UniWatertokenKey, JSON.stringify(token));
}

export function removeUniwaterToken() {
  return localStorage.removeItem(UniWatertokenKey);
}

// 存储uniwaterCode授权码
const UniWaterCodeKey = "Uniwater-Code";
export function getUniwaterCode() {
  return JSON.parse(localStorage.getItem(UniWaterCodeKey));
}

export function setUniwaterCode(uniWaterCode) {
  return localStorage.setItem(UniWaterCodeKey, JSON.stringify(uniWaterCode));
}

export function removeUniwaterCode() {
  return localStorage.removeItem(UniWaterCodeKey);
}

export function removeLocalCache() {
  removeLoginSystemType(); // 清除系统登录类型=》缓存信息
  removeToken(); // 移除系统token数据信息=》缓存信息
  removeUserInfo(); // 清除系统用户=》缓存信息
  removeUniwaterCode(); // 清除uniWater 系统授权码=》缓存信息
  removeUniwaterToken(); // 清除uniWatertoken=》缓存信息
}

// import Cookies from "js-cookie";
// 系统统一平台Token信息存储
// const TokenKey = "Admin-Token";
// export function getToken() {
//   return Cookies.get(TokenKey);
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token);
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey);
// }
