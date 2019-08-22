<template>
    <article>
        <h2>{{article.title}}</h2>
        <div class="time-tag">
            <span>作者：{{article.author}}</span>
            <span :title="'创建日期：'+article.createDate">更新日期：{{article.editDate}}</span>
        </div>
        <div class="my-article" v-html="article.content"></div>
    </article>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            article:{
                title:"博客搭建规划",
                content:"当前版本v1.0</br>实现目标：</br>1.使用vue搭建前端静态页面</br>2.实现响应式移动端适配",
                author: "Mr.Rabbit",
                createDate:"2019/08/20",
                editDate:"2019/08/20"
            }
        }
    },
    methods:{
        toHome: function(){
            messenger.$emit("router","home");
            this.$router.push("content");
        }
    },
    created(){
        
    }
}
</script>

<style scoped>
article{
    text-align: left;
    border-radius: 3px;
    padding: 0 30px;
}
article h2{
    text-align: center;
    margin-bottom:10px;
}
.time-tag{
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    line-height: 25px;
}
.my-article{
    line-height: 30px;
}
@media screen and (max-width:900px){
    article{
        padding: 0 10%;
    }
}
</style>