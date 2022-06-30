import axios from "axios"

const service = axios.create({
    baseURL: "/api",
	withCredentials:true,
	timeout: 5000,
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
})


service.interceptors.request.use(function(config){
	return config;
},error=>{
	return Promise.reject(error);
})

export function get(url,params={}){
	return new Promise((resolve,reject)=>{
		service.get(url,{
			params:params
		}).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err);
		})
	})
}

export function post(url,data={}){
	return new Promise((resolve,reject)=>{
		service({
			method:"post",
			url:url,
			data:data
		}).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err);
		})
	})
}

export default service;