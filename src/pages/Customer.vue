<template>
    <div class="customer">
        <h2>顾客管理</h2>
        <!-- 按钮 -->
        <div class="btns">
            <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
            <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
        </div>
        <!-- 表格 -->
        {{ids}}
        <div>
            <el-table :data="customers" size="mini" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  width="55"></el-table-column>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="realname" label="姓名"></el-table-column>
                <el-table-column prop="telephone" label="手机号"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column  label="操作" width="100px">
                    <template #default="record">
                        <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)"></a>&nbsp;
                        <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)"></a>
                        <a href=""  @click.prevent="toDetails(record.row)">详情</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
        <el-form :model="form" :rules="rules" ref="customerForm">
            <el-form-item label="姓名" label-width="100px;" prop="realname">
                <el-input v-model="form.realname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" label-width="100px;" prop="telephone">
                <el-input v-model="form.telephone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeMo">取 消</el-button>
            <el-button type="primary" @click="submitHandler">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>  

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

    export default{
        data(){
            return {
                customer:{},
                ids:[],
                form:{},
                rules:{
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.findAllCustomers();
        },
        computed: {
            // 映射，将vuex state中的状态映射为vue中属性
            ...mapState("customer",["customers","visible","title"]),
            ...mapGetters("customer",["countCustomers","customerStatusFilter"])
            //普通属性
        },
        methods: {
         	//映射，将action中得到动作映射为vue中的方法
            ...mapActions("customer",["findAllCustomers","deleteCustomerById","saveOrUpdateCustomer","batchDeleteCustomer"]),
            ...mapMutations("customer",["showMo","closeMo","setTitle"]),
            //普通方法
            toDetails(customer){
                //跳转到顾客详情页面
                this.$router.push({path:'/customerDetail',
                // query:{id:customer.id},
                // params:{customer}}
                query:{customer}}
                )
                
            },
            dialogCloseHandler(){
                this.$refs.customerForm.resetFields();
            },
            handleSelectionChange(val){
                this.ids = val.map(item=>item.id);
            },
            toAddHandler(){
                //重置表单
                this.customer = {};
                this.setTitle("添加顾客信息");
                this.showMo();
                
            },
            submitHandler() {
                //表单验证
                this.$refs.customerForm.validate((valid)=>{
                    if(valid){
                        //提交表单
                        this.saveOrUpdateCustomer(this.form)
                        .then((response)=>{
                            this.$message({type:"success",message:response.statusText});
                        })
                    }else{
                        return false;
                    }
                })
            	
            	console.log("vue",this.form);
            },
            deleteHandler(id) {
            	let promise = this.deleteCustomerById(id);
            	promise.then((response)=>{
            		this.$message({type:"success",message:response.statusText});
            	});
            	console.log("promise",promise);
            	
            },
            editHandler(row) {
                this.form = row;
                this.setTitle("修改顾客信息");
            	this.showMo();
            },
            batchDeleteHandler(){
                this.batchDeleteCustomer(this.ids)
                .then((response)=>{
                    this.$message({type:"success",message:response.statusText});
                })
            }
        }
    }
</script>
<style scoped>

</style>