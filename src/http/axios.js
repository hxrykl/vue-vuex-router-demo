// 导入依赖
import axios from 'axios';
import qs from 'qs'
//基础地址
axios.defaults.baseURL = "http://39.105.108.131:6677";
// 响应拦截
axios.interceptors.response.use(function(response){
	//解构，将后台的参数结果设置到response
	let {data} = response;
	// 数据
	response.data = data.data;
	//状态
	response.status = data.status;
	//结果信息
	response.statusText = data.message;
	//返回一个数据结果对象
	return response; 
},function(error){
  //返回一个状态为reject承诺对象
	return Promise.reject(error);
});

/**
 * 提交post请求 发送的数据为查询字符串，key=val&key=val
*/
export function post(url,data){
  return axios({
    //请求方式post
    method:"post",  
    //地址
    url,   
    //将对象 序列化成URL的形式，以&进行拼接
    data:qs.stringify(data),
    // 如果请求花费了超过 `timeout` 的时间，请求将被中断
    timeout:10000,
    //即将被发送的自定义请求头
    headers: { 
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
*/
export function post_array(url,data){
  return axios({
    method:"post",
    url,
    data:qs.stringify(data,{arrayFormat:"repeat"}),
    timeout:10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
/**
 * 提交post请求 发送的数据为json字符串
*/
export function post_json(url,data){
  return axios({
    method:"post",
    url,
    data,
    timeout:10000
  })
}

export function get (url, params) {
  return axios({
    method: 'get',
    url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}