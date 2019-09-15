<template>
    <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"  @keyup.native.enter="onSubmit('loginForm')"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
            <span>{{dialogContent}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            // 表单验证，需要在 el-form-item 元素中增加 prop 属性
            rules: {
                username: [
                    { required: true, message: "账号不可为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不可为空", trigger: "blur" }
                ]
            },
            // 对话框显示和隐藏
            dialogVisible: false,
            dialogContent: ''
        };
    },
    methods: {
        onSubmit(formName) {
            // 为表单绑定验证功能
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios.post('/api/user/manage',
                        {username: this.form.username, password: this.form.password}
                    ).then(result =>{
                        if (result.data.status != 200){
                            this.dialogVisible = true;
                            this.dialogContent = result.data.data;
                        } else {
                            localStorage.setItem('user','admin');
                            this.$bus.emit('showNav');
                            this.$router.push({name:"adminQuery"});
                        }
                    })
                } else {
                    this.dialogVisible = true;
                    this.dialogContent = '请输入账号和密码';
                    return false;
                }
            });
        }
    },
    created() {
        if (localStorage.getItem('user') == 'admin') {
            this.$bus.emit('showNav');
            this.$router.push({name:"adminQuery"});
        }
    }
};
</script>

<style scoped>
    .login-box {
        border: 1px solid #dcdfe6;
        width: 350px;
        margin: 0 auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 10px #909399;
    }
    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }
    @media screen and (max-width: 500px){
        .login-box {
            width: 200px;
            padding-left: 0;
        }
    }
</style>