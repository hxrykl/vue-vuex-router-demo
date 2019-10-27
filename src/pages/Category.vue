<template>
    <div class="category">
        <h2>栏目管理</h2>
        <!-- 按钮 -->
        <div class="btns">
            <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
            <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
        </div>
        <!-- 表格 -->
        {{ids}}
        <div>
            <el-table :data="categorys" size="mini" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  width="55"></el-table-column>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="栏目名称"></el-table-column>
                <el-table-column prop="num" label="序号"></el-table-column>
                <el-table-column prop="parentId" label="父栏目"></el-table-column>
                <el-table-column  label="操作" width="100px">
                    <template #default="record">
                        <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)"></a>&nbsp;
                        <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
        <el-form :model="form" :rules="rules" ref="categoryForm">
            <el-form-item label="栏目名称" label-width="100px;" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="序号" label-width="100px;" prop="num">
                <el-input v-model="form.num" autocomplete="off"></el-input>
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
                category:{},
                ids:[],
                form:{},
                rules:{
                    name: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' },
                        { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '请输入序号', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2到5个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.findAllCategorys();
        },
        computed: {
            // 映射，将vuex state中的状态映射为vue中属性
            ...mapState("category",["categorys","visible","title"]),
            ...mapGetters("category",["countCategorys","categoryStatusFilter"])
            //普通属性
        },
        methods: {
         	//映射，将action中得到动作映射为vue中的方法
            ...mapActions("category",["findAllCategorys","deleteCategoryById","saveOrUpdateCategory","batchDeleteCategory"]),
            ...mapMutations("category",["showMo","closeMo","setTitle"]),
            //普通方法
            dialogCloseHandler(){
                this.$refs.categoryForm.resetFields();
            },
            handleSelectionChange(val){
                this.ids = val.map(item=>item.id);
            },
            toAddHandler(){
                //重置表单
                this.category = {};
                this.setTitle("添加栏目信息");
                this.showMo();
                
            },
            submitHandler() {
                //表单验证
                this.$refs.categoryForm.validate((valid)=>{
                    if(valid){
                        //提交表单
                        this.saveOrUpdateCategory(this.form)
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
            	let promise = this.deleteCategoryById(id);
            	promise.then((response)=>{
            		this.$message({type:"success",message:response.statusText});
            	});
            	console.log("promise",promise);
            	
            },
            editHandler(row) {
                this.form = row;
                this.setTitle("修改栏目信息");
            	this.showMo();
            },
            batchDeleteHandler(){
                this.batchDeleteCategory(this.ids)
                .then((response)=>{
                    this.$message({type:"success",message:response.statusText});
                })
            }
        }
    }
</script>
<style scoped>

</style>