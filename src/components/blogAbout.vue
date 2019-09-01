<template>
    <section>
        <h3>关于我</h3>
        <p>我，xx，有一个梦想</p>
        <h3>关于博客</h3>
        <p>本博客所有的字体图标来自于：<a href="https://www.iconfont.cn">iconfont</a></p>
        <p>本博客的样式灵感来源：
            <a href="https://binks-sake.com/" target="_blank">binks-sake</a>
            、
            <a href="https://psyduck.liujiayang.cn" target="_blank">psyduck</a>
        </p>
    </section>
</template>

<script>
export default {
    data(){
        return{
            tag:""
        }
    },
    methods:{
        
    },
    created(){
        
    }
}
</script>

<style scoped>
section{
    text-align: left;
    border-radius: 3px;
    padding: 10px 30px;
    background: rgba(255, 255, 255, 0.5);
}
p{
    display: flex;
    line-height: 30px;
    font-weight: normal;
    padding-left: 30px;
}
h3{
    padding: 10px 0;
}
span{
    flex-basis: 50%;
    margin-right:10px;
}
@media screen and (max-width:500px){
    section{
        padding: 10px 10px;
    }
}
</style>