<template>
    <aside>
        <div class="cards-aside my-info">
            <div class="my-avatar">
                <a href="#" @mouseenter="talking" @mouseleave="shutUp">
                    <img :src="avatar">
                </a>
                <span class="message-welcome" :style="{opacity:showWords}">{{message}}</span>
            </div>
            <p>
                <span class="iconfont icon-youxiang" title="email"></span>
                <span>woodenrabbit@qq.com</span>
            </p>
            <p>
                <a href="https://github.com/woodenrabbit" target="_blank" class="iconfont icon-github" title="github"></a>
            </p>
        </div>
        <div class="cards-aside recommended">
            <h3>常去的网站</h3>
            <p>-news-</p>
            <p><a href="http://www.anyknew.com" target="_blank">Anynew</a></p>
            <p>-learning-</p>
            <p><a href="http://scotch.io" target="_blank">scotch</a></p>
            <p>-tools-</p>
            <p><a href="http://www.iconfont.cn" target="_blank">iconfont</a></p>
        </div>
        <div class="btn-toTop" v-if="toTop">
            <div></div><div></div><div></div><div></div>
            <button @click="backToTop">TOP</button>
        </div>
        <div class="cards-aside">
            <h3>关于本博客</h3>
            <p>前端：vue</p>
            <p>API: express</p>
            <p>数据库: mongoDB</p>
            <p>创建日期：2019-08-20</p>
        </div>
    </aside>
</template>

<script>
import avatar from "../assets/Mr.Rabbit.png";
export default {
    data(){
        return{
            toTop:false,
            avatar:avatar,
            messager:["Would you like to talk with me?","Any problem?","I don't like carrot!","Welcome to my blog!"],
            message:'',
            showWords:false,
            talkingDelay:'',
            shutUpDelay:''
        }
    },
    created(){
        //from page.vue
        this.$bus.on("asideToTop",scrollTop=>{
            if(scrollTop > 200){
                this.toTop = true;
            }else{
                this.toTop = false;
            }
        })
    },
    methods:{
        backToTop:()=>{window.scroll(0,0)},
        getWords:function(){
            let index = Math.floor(Math.random()*this.messager.length);
            this.message = this.messager[index];
            let delayTime = 1000*this.message.split(' ').length;
            this.talkingDelay = setTimeout(this.getWords,delayTime);
        },
        talking:function(){
            this.message = 'Hello!';
            this.showWords = 1;
            this.talkingDelay = setTimeout(this.getWords,3000);
        },
        shutUp:function(){
            clearInterval(this.talkingDelay);
            this.showWords = 0;
            // clearTimeout(this.talkingDelay);
            // this.shutUpDelay = setTimeout(()=>{this.messager = "Hello!"},1000);
        }
    },
    destroyed(){
        window.removeEventListener('scroll',this.handldScroll);
    }
}
</script>

<style scoped>
aside{
    width: 25%;
    min-width: 200px;
    margin-left: 20px;
}
aside .iconfont{
    font-size:30px;
    transition: all .2s;
}
aside .iconfont:hover{
    font-size:40px;
}
.my-info > p{
    display: flex;
    justify-content: center;
}
.my-info .iconfont{
    width:40px;
    height:40px;
}
.cards-aside{
    width: 100%;
    /* background: rgba(255, 255, 255, 0.7); */
    padding: 10px 20px;
    margin-bottom:20px;
    text-align: center;
    border-radius: 3px;
}
.cards-aside p{
    line-height:30px;
}
.recommended a{
    color:#63a7b3;
}
.btn-toTop{
    position:fixed;
    right:2%;
    bottom:5%;
}
.btn-toTop button{
    cursor: pointer;
    height:40px;
    border:none;
    background: rgba(0,0,0,.5);
    color:white;
    transition: all .2s;
}
.btn-toTop div{
    height:20px;
    width:15px;
    background: rgba(0,0,0,.5);
    position: absolute;
    border-radius: 10px;
    opacity: 0;
    transition: all .5s;
}
.btn-toTop div:first-child{
    top:-20px;
    left: 0px;
}
.btn-toTop div:nth-child(2){
    top:-20px;
    right: 0px;
}
.btn-toTop div:nth-child(3){
    top:-5px;
    right: -15px;
    transform: rotate(20deg);
}
.btn-toTop div:nth-child(4){
    top:-5px;
    left: -15px;
    transform: rotate(-20deg);
}
.btn-toTop:hover > button{
    border-radius: 20px 20px 10px 10px;
}
.btn-toTop:hover > div{
    opacity: 1;
}
.my-avatar{
    position: relative;
    margin: 0 auto;
}
.my-avatar img{
    height: 150px;
    width: 150px;
    border-radius: 75px;
    transition: all .5s;
}
.my-avatar a:hover img{
    transform: scale(1.1);
}
.message-welcome{
    position: absolute;
    background: #fff;
    border-radius: 20px 20px 20px 0;
    padding: 0 5px;
    line-height: 2.5rem;
    transition: all .5s;
    opacity: 0;
    white-space: nowrap;
}
@media screen and (max-width:900px){
    aside{
        display: none;
    }
}
</style>