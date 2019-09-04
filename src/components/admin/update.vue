<template>
    <div id="admin">
        <form method="POST">
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" name="title" v-model="title" @focus="edit_title" disabled>
            </div>
            <div class="form-group">
                <label for="tags">标签</label>
                <input type="text" name="tags" v-model="tags" >
            </div>
            <div>
                <mavon-editor v-model="content" />
            </div>
            <button @click.prevent="submit">提交</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:"",
            content:"",
            tags:[],
            createDate:"",
            editDate:"",
            message:''
        }
    },
    methods:{
        toHome: function(){
            messenger.$emit("router","home");
            this.$router.push("content");
        },
        getArticle: function(){
            this.$axios.get("/api/blog/"+sessionStorage.getItem("editID"))
                .then((result)=>{
                    this.title = result.data[0].title;
                    this.content = result.data[0].content || '';
                    this.tags = result.data[0].tags.join(' ');
                    this.createDate = result.data[0].addTime;
                    this.editDate = result.data[0].editTime;
                })
                .catch((err)=>window.console.log(err));
        },
        submit: function(){
            this.$axios.put("/api/content/"+sessionStorage.getItem("editID"),{
                    title: this.title,
                    tags: this.tags,
                    content: this.content
                })
                .then((result)=>{
                    alert(result.data);
                })
                .catch((err)=>window.console.log(err));
        },
        edit_title:function(){
            this.message = "请输入...";
        }
    },
    created(){
        this.getArticle();
    },
    components:{blogTag:()=>import("../common/blogTag")}
}
</script>

<style scoped>
#admin form > div{
    margin: 20px 0;
}
@media screen and (max-width:500px){
    label{
        font-size:20px;
    }
    input{
        height:20px;
        width:60%;
    }
}
</style>