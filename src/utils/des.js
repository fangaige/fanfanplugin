import CryptoJS from 'crypto-js'
import config from '../config/config.js'
//des加密无密文
export const encryptDes = (message, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
//des解密密文
export const decryptDes = (ciphertext, key) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

//des加密（这种方法有密文）
export const encryptDesMw = (message, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

//des解密有密文
export const decryptDesMw = (ciphertext, key) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  // direct decrypt ciphertext
  let decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

//md5加密
export const encryptMd5 = (key) => {
  return CryptoJS.MD5(key).toString(CryptoJS.enc.Hex).toUpperCase();
}


//SHA1加密
export const encryptSHA1 = (message, key)  => {
  return CryptoJS.SHA1(message,key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Hex);
}
//SHA1解密
export const decryptSHA1 = (ciphertext, key) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  let decrypted = CryptoJS.HmacSHA1({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex,{
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}

//和达SHA1加密 
export const encryptSHA1HD = (HDACC ,HDSTAMP)  => { 
  let message = 'HD#@!' + HDACC + HDSTAMP 
  return CryptoJS.SHA1(message).toString(CryptoJS.enc.Hex); 
} 


//CryptoJS.SHA256(waitSignData).toString();
export const encryptSHA256 = (waitSignData) => {
  return CryptoJS.SHA256(waitSignData).toString(CryptoJS.enc.Hex); 
}


//和达SHA256加密 
export const encryptSHA256HD = (path)  => { 
  let client_secret = config.apiPath[path].client_secret;
  let client_id = config.apiPath[path].client_id;
  let waitSignData = client_id+"$"+client_secret;
  return CryptoJS.SHA256(waitSignData).toString(CryptoJS.enc.Hex);
} 