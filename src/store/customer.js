import {get,post,post_array} from '../http/axios';
export default {
    namespaced:true,
    state: {
        //表单显示与隐藏
        visible: false,
        customers: [],
        title:"添加顾客信息"
    },
    getters:{
        countCustomers(state){
            return state.customers.length;
        },
        //需要为获取器传递参数的写法
        customerStatusFilter(state){
            return function(status){
                if(status){
                    return this.customers.filter(item=>item.status === status)
                }else{
                    return this.customers;
                }
                
            }
        }
    },
    mutations: {
        showMo(state) {
            state.visible = true;
        },
        closeMo(state) {
            state.visible = false;
        },
        //需要接受一个参数，这个参数为customers
        refreshCustomers(state,customers) {
            // console.log("state", state);
            state.customers = customers;
        },
        setTitle(state,title){
            state.title = title;
        }
    },
    actions: {
        async batchDeleteCustomer(context,ids){
            // 1. 批量删除
            let response = await post_array("/customer/batchDelete",{ids})
            // 2. 分发
            context.dispatch("findAllCustomers");
            // 3. 返回结果
            return response;
          },
        async findAllCustomers(context) {
            // console.log("context", context);
            //查询所有顾客信息
            let response = await get("/customer/findAll");
            //将顾客的信息设置到state.customers中
            //提交突变 
            context.commit("refreshCustomers", response.data);
        },
        async deleteCustomerById(context,id){
            //删除顾客信息
            let response = await get("/customer/deleteById?id="+id);
            //刷新
            context.dispatch("findAllCustomers");
            //提示成功
            return response;

        },
        async saveOrUpdateCustomer({dispatch,commit},customer){
            // console.log("customer",customer);
            //提交请求
            let response = await post('/customer/saveOrUpdate',customer)
            //关闭模态框
            commit("closeMo");
            //刷新页面
            dispatch("findAllCustomers");
            //提示成功
            return response;
        }
    }
}