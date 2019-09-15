<template>
    <el-container>
        <el-header height="initial">
            <h1>博客管理页面</h1>
            <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" v-if="!isLogin">
                <el-menu-item index="1" @click.native="toQuery()">所有</el-menu-item>
                <div class="line"></div>
                <el-menu-item index="2" @click.native="toCreate()">新增</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            isLogin: false
        }
    },
    created() {
        if (this.$route.path == '/admin/login') {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
        this.$bus.on('showNav', () =>{
            this.isLogin = false;
        })
    },
    methods: {
        toCreate() {
            this.$router.push({name: 'adminCreate'})
        },
        toQuery() {
            this.$router.push({name: 'adminQuery'})
        }
    }
}
</script>
<style>
    .el-header, 
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 20px;
    }
    .el-menu {
        background: none;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
</style>