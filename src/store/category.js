import {get,post,post_array} from '../http/axios';
export default {
    namespaced:true,
    state: {
        //表单显示与隐藏
        visible: false,
        categorys: [],
        title:"添加栏目信息"
    },
    getters:{
        countCategorys(state){
            return state.categorys.length;
        },
        //需要为获取器传递参数的写法
        categorystatusFilter(state){
            return function(status){
                if(status){
                    return this.categorys.filter(item=>item.status === status)
                }else{
                    return this.categorys;
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
        //需要接受一个参数，这个参数为categorys
        refreshCategorys(state,categorys) {
            // console.log("state", state);
            state.categorys = categorys;
        },
        setTitle(state,title){
            state.title = title;
        }
    },
    actions: {
        async batchDeleteCategory(context,ids){
            // 1. 批量删除
            let response = await post_array("/category/batchDelete",{ids})
            // 2. 分发
            context.dispatch("findAllCategorys");
            // 3. 返回结果
            return response;
          },
        async findAllCategorys(context) {
            // console.log("context", context);
            //查询所有栏目信息
            let response = await get("/category/findAll");
            //将栏目的信息设置到state.categorys中
            //提交突变 
            context.commit("refreshCategorys", response.data);
        },
        async deleteCategoryById(context,id){
            //删除栏目信息
            let response = await get("/category/deleteById?id="+id);
            //刷新
            context.dispatch("findAllCategorys");
            //提示成功
            return response;

        },
        async saveOrUpdateCategory({dispatch,commit},category){
            // console.log("category",category);
            //提交请求
            let response = await post('/category/saveOrUpdate',category)
            //关闭模态框
            commit("closeMo");
            //刷新页面
            dispatch("findAllCategorys");
            //提示成功
            return response;
        }
    }
}