<template>
    <article>
        <nav><router-link to="/">首页</router-link></nav>
        <h2>{{article.title}}</h2>
        <div class="time-tag">
            <span>作者：{{article.author}}</span>
            <span>创建日期：{{article.createDate}}</span>
            <span>最近更新：{{article.editDate}}</span>
        </div>
        <div class="my-article" v-html="article.content"></div>
    </article>
</template>

<script>
export default {
    data(){
        return{
            article:{
                title:"博客搭建规划",
                content:"当前版本v1.0</br>实现目标：</br>1.使用vue搭建前端静态页面</br>2.实现响应式移动端适配",
                author: "Mr.Rabbit",
                createDate:"2019/08/20 10:00:00",
                editDate:"2019/08/20 14:00:00"
            }
        }
    },
    methods:{
    },
    created(){
        
    }
}
</script>

<style scoped>
article{
    text-align: left;
    border-radius: 3px;
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
}
.time-tag span:first-child{
    width:20%;
}
.my-article{
    line-height: 30px;
}
@media screen and (max-width:810px){
    article{
        padding: 0 10%;
    }
}
</style>