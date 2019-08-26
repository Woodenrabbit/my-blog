<template>
    <article>
        <header>
            <h2>{{title}}</h2>
            <div class="time-tag article-tags">
                <a href="#" @click.prevent="toTags" class="iconfont icon-biaoqian" v-for="tag in tags" :key="tag">
                    <span>{{tag}}</span>
                </a>
                <span :title="'创建日期：'+createDate" class="iconfont icon-rili">{{editDate}}</span>
            </div>
        </header>
        <div class="my-article" v-html="content"></div>
        <footer>
            <span class="iconfont icon-ico"></span>
        </footer>
    </article>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            title:"博客搭建规划",
            content:"当前版本v1.0</br>实现目标：</br>1.使用vue搭建前端静态页面</br>2.实现响应式移动端适配",
            author: "Mr.Rabbit",
            tags:["个人相关","博客"],
            createDate:"2019-08-20",
            editDate:"2019-08-20"
        }
    },
    methods:{
        toHome: function(){
            messenger.$emit("router","home");
            this.$router.push("content");
        },
        getArticle: function(){
            this.$axios.get("/post/"+sessionStorage.getItem("blog_id"))
                .then((result)=>{
                    this.title = result.data[0].title;
                    this.content = result.data[0].content;
                    this.tags = result.data[0].tags;
                    this.createDate = result.data[0].addTime;
                    this.editDate = result.data[0].editTime;
                })
                .catch((err)=>window.console.log(err));
        }
    },
    created(){
        this.getArticle();
    }
}
</script>

<style scoped>
article{
    text-align: left;
    border-radius: 3px;
    padding: 10px 30px;
    background: rgba(255, 255, 255, 0.5);
}
article h2{
    text-align: center;
}
article > header{
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.3);
}
.time-tag{
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    line-height: 25px;
}
.my-article{
    line-height: 30px;
}
footer{
    text-align: center;
    padding: 20px;
}
footer .iconfont{
    font-size:50px;
}
@media screen and (max-width:900px){
    article{
        padding: 0 10%;
    }
}
</style>