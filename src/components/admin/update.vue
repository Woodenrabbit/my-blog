<template>
    <el-form ref="updateForm" :model="form" class="login-box">
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" disabled></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
            <el-input v-model="form.tags" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item prop="content">
            <mavon-editor v-model="form.content" />
        </el-form-item>
        <el-button type="primary" @click.native.prevent="submit()">提交</el-button>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title:"",
                content:"",
                tags:"",
                createDate:"",
                editDate:"",
            },
        }
    },
    methods: {
        toHome: function() {
            messenger.$emit("router","home");
            this.$router.push("content");
        },
        getArticle: function() {
            this.$axios.get("/api/blog/"+sessionStorage.getItem("editID"))
                .then((result) =>{
                    this.form.title = result.data[0].title;
                    this.form.content = result.data[0].content || '';
                    this.form.tags = result.data[0].tags.join(' ');
                    this.form.createDate = result.data[0].addTime;
                    this.form.editDate = result.data[0].editTime;
                })
                .catch((err) =>window.console.log(err));
        },
        submit: function() {
            this.$axios.put("/api/content/" + sessionStorage.getItem("editID"),{
                    title: this.form.title,
                    tags: this.form.tags,
                    content: this.form.content
                })
                .then((result) =>{
                    alert(result.data);
                })
                .catch((err) =>window.console.log(err));
        }
    },
    created() {
        this.getArticle();
    },
    components:{blogTag: () =>import("../common/blogTag")}
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