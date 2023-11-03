// 加密
let Base64 = require("js-base64").Base64;
import router from '@/router';

// 编码
function b64code(data) {
  let str = data;
  if (typeof str != "string") {
    str = JSON.stringify(data);
  }
  let code = Base64.encode(str);
  return code.replace(/=/g, '');
}

// 解码
function b64decode(data) {
  let str = Base64.decode(data);
  let json = ""
  try {
    json = JSON.parse(str);
  } catch (error) {
    console.error(error);
  }
  return json
}

// 设置参数
function setQuery(data, params) {
  params = params || "query"
  let query = {}
  query[params] = b64code(data)
  return query
}

// 获取参数
function getQuery(key, params) {
  params = params || "query"
  let route = router.app.$route.query || {}

  if (!route[params]) {
    return ""
  }

  let query = b64decode(route[params]);
  if (key) {
    query = query[key];
  }
  return query
}

export default {
  // 编码
  code(data) {
    return b64code(data)
  },
  // 解码
  decode(data) {
    return b64decode(data);
  },
  // 获取参数
  getQuery(key, params) {
    return getQuery(key, params)
  },
  // 设置参数
  setQuery(data, params) {
    return setQuery(data, params)
  }
}
