<template>
    <header>
        <h1>{{title}}</h1>
        <p>去看没有看过的东西，去做没有做过的事情</p>
        <nav>
            <a href="#" :class="{'visited':currentLink=='home'}" @click.prevent="visiting($event)" name="home">首页</a>
            <span>|</span>
            <a href="#" :class="{'visited':currentLink=='blogs'}" @click.prevent="visiting($event)" name="blogs">归档</a>
            <span>|</span>
            <a href="#" :class="{'visited':currentLink=='about'}" @click.prevent="visiting($event)" name="about">关于</a>
        </nav>
    </header>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            title:"Mr.Rabbit's Blog",
            currentLink:"home"
        }
    },
    mounted:function(){
        this.handleResize();
        window.addEventListener('resize',this.handleResize,true);
        messenger.$on('router',(target)=>{this.currentLink = target});    
    },
    methods:{
        handleResize:function(){
            var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if(clientWidth<=500){
                this.title = "Mr.Rabbit";
            }else{
                this.title = "Mr.Rabbit's Blog";
            }
        },
        visiting:function(e){
            this.currentLink = e.target.name;
            this.$router.push({name:this.currentLink});
        }
    },
    destroyed:function(){
        window.removeEventListener('resize',this.handleResize);
    }
}
</script>

<style scoped>
header{
    height:200px;
    background:  rgba(90, 140, 150, 0.8);
    box-shadow: 0 0 10px #000;
    position:relative;
    padding: 0 10%;
}
h1{
    padding-top: 50px;
    padding-bottom: 10px;
}
header nav{
    position: absolute;
    bottom:0;
    display: flex;
    justify-content: center;
    padding: 10px 30px;
}
header nav a{
    padding: 5px 0;
}
header nav span{
    margin: 0 10px;
    padding: 5px 0;
}
@media screen and (max-width:1050px){
    .my-avatar{
        display: none;
    }
}
@media screen and (max-width:900px){
    header{
        padding: 0;
    }
    header nav{
        left: 50%;
        transform: translate(-50%);
    }
}
@media screen and (max-width:500px){
    header{
        height:100px;
    }
    header nav{
        display: none;
    }
    h1{
        line-height:100px;
        padding: 0;
    }
    h1 + p{
        display: none;
    }
}
</style>