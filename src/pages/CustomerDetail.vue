<template>
    <div class="customer_details">
        <h2>顾客详情</h2>
        <el-button type="primaty" size="small" @click="backHandler">返回</el-button>
        姓名{{customer.realname}}<br/>
        手机{{customer.telephone}}
    </div>
</template>
<script>
    export default {
        //不是函数而是对象的话就会报错
        data(){
            return {customer:{}}
        },
        created(){
            console.log("当前路由",this.$route);
            this.customer = this.$route.query.customer;
        },
        methods:{
            backHandler(){
                // this.$router.push('/customer')
                //同上
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>

</style>