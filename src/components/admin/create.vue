<template>
    <el-form ref="createForm" :model="form" :rules="rules" class="login-box">
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
            <el-input v-model="form.tags" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item prop="content">
            <mavon-editor v-model="form.content" />
        </el-form-item>
        <el-button type="primary" @click.native.prevent="submit('createForm')">提交</el-button>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: "",
                tags: "",
                content: "",
            },
            rules: {
                title: [
                    {required: true, message: "标题不可为空", tigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        submit: function(formName){
            this.$refs[formName].validate(valid =>{
                if (valid) {
                    this.$axios.post("/api/content/add",{
                        title:this.form.title,
                        tags:this.form.tags, 
                        content:this.form.content
                    })
                    .then((result)=>{
                        alert(result.data);
                    })
                    .catch((err)=>window.console.log(err))
                }
            })
        }
    },
}
</script>

<style scoped>
    #admin form > div {
        margin: 20px 0;
    }
    @media screen and (max-width:500px) {
        label {
            font-size: 20px;
        }
        input {
            height: 20px;
            width: 60%;
        }
    }
</style>