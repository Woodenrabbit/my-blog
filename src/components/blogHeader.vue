<template>
    <header>
        <div class="my-title">
            <h1>{{title}}</h1>
            <p>去看没有看过的东西，去做没有做过的事情</p>
        </div>
        <div :class="[show?'nav-show':'',navFixed?'fixed':'not-fixed','navigation-bar']">
            <nav>
                <a href="#" :class="{'visited':currentLink=='home'}" @click.prevent="visiting($event)" name="home">首页</a>
                <span>|</span>
                <a href="#" :class="{'visited':currentLink=='archive'}" @click.prevent="visiting($event)" name="archive">归档</a>
                <span>|</span>
                <a href="#" :class="{'visited':currentLink=='tags'}" @click.prevent="visiting($event)" name="tags">标签</a>
                <span>|</span>
                <a href="#" :class="{'visited':currentLink=='about'}" @click.prevent="visiting($event)" name="about">关于</a>
            </nav>
        </div>
        <div class="placeholder" v-if="placeholder">
        </div>
    </header>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            title:"Mr.Rabbit's Blog",
            currentLink:"home",
            navFixed:false,
            navHeight:0,
            placeholder:false,
            oldPosition:0,
            show:false,
        }
    },
    mounted:function(){
        this.handleResize();
        window.addEventListener('resize',this.handleResize,true);
        window.addEventListener('scroll',this.handleScroll,true);
        messenger.$on('router',(target)=>{this.currentLink = target});    
        let navigation = document.querySelector(".navigation-bar");
        this.navHeight = navigation.offsetTop;
        this.oldPosition = document.documentElement.scrollTop || document.body.scrollTop;
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
        handleScroll:function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //let contentHeight = document.querySelector(".navigation-bar").offsetHeight;
            if(scrollTop > this.navHeight){
                if(scrollTop <= this.oldPosition){
                    this.show = true;
                }
                else{
                    this.show = false;
                }
                this.navFixed = true;
                this.placeholder = true;
            }
            else{
                this.navFixed = false;
                this.placeholder = false;
                this.show = false;
            }
            setTimeout(() => {
                this.oldPosition = scrollTop;
            }, (0));
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
    position:relative;
    box-shadow: 0 0px 10px #000;
    transition: all .2s;
    background:  rgba(90, 140, 150, 0.8);
}
.my-title{
    padding-top: 50px;
    padding-bottom: 20px;
}
h1{
    padding-bottom: 10px;
}
.placeholder{
    height:52px;
}
div.nav-show{
    top: 0;
    box-shadow: 0 0px 10px #000;
}
.fixed{
    position: fixed;
    padding: 0 10%;
    top: -52px;
    left: 0;
    background:  rgb(90, 140, 150);
}
.navigation-bar{
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    padding: 0 10%;
    transition: all .3s;
}
.navigation-bar nav{
    display: flex;
    padding: 10px 30px;
}
.navigation-bar nav a{
    padding: 5px 0;
}
.navigation-bar nav span{
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
    .navigation-bar{
        padding: 0;
    }
}
@media screen and (max-width:500px){
    header{
        height:100px;
    }
    .navigation-bar{
        display: none;
    }
    .my-title{
        padding: 0;
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