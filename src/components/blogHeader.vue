<template>
    <header>
        <h1>{{title}}</h1>
    </header>
</template>

<script>
export default {
    data(){
        return{
            title:"Mr.Rabbit 的个人博客",
        }
    }
}
</script>

<style scoped>
header{
    height:200px;
    width:100%;
    background:linear-gradient(180deg,  rgba(90, 140, 150, 0.8), transparent);
    position:relative;
}
h1{
    text-align: center;
    line-height:200px;
}
@media screen and (max-width:1050px){
    .my-avatar{
        display: none;
    }
}
</style>