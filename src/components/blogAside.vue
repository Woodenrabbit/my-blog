<template>
    <aside>
        <div class="cards-aside">
            <div class="my-avatar">
                <a href="#">
                    <img :src="avatar">
                </a>
                <span class="message-welcome">Hello</span>
            </div>
            <p>性别：男</p>
            <p>爱好：羽毛球、口琴、画画</p>
            <p>邮箱：woodenrabbit@qq.com</p>
        </div>
        <div class="cards-aside">
            <h3>常去的网站</h3>
            <p>-news-</p>
            <p><a href="http://www.anyknew.com" target="_blank">Anynew</a></p>
            <p>-learning-</p>
            <p><a href="http://scotch.io" target="_blank">scotch</a></p>
            <p>-entertainment-</p>
            <p><a href="http://www.bilibili.com" target="_blank">bilibili</a></p>
        </div>
        <div class="btn-toTop" v-if="toTop">
            <div></div><div></div><div></div><div></div>
            <button @click="backToTop">TOP</button>
        </div>
        <div class="cards-aside">
            <h3>关于本博客</h3>
            <p>前端：vue</p>
            <p>API: express</p>
            <p>数据库: mySQL</p>
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
            avatar:avatar
        }
    },
    mounted:function(){
        window.addEventListener('scroll',this.handleScroll,true);
    },
    methods:{
        handleScroll:function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 200){
                this.toTop = true;
            }else{
                this.toTop = false;
            }
        },
        backToTop:()=>{window.scroll(0,0)}
    },
    destroyed:function(){
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
.cards-aside{
    width: 100%;
    /* background: rgba(255, 255, 255, 0.7); */
    padding: 10px 20px;
    margin-bottom:20px;
    text-align: left;
    border-radius: 3px;
}
.cards-aside p{
    line-height:30px;
}
.cards-aside a{
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
.my-avatar a:hover + .message-welcome{
    opacity: 1;
}
.message-welcome{
    position: absolute;
    left:50%;
    background: #fff;
    border-radius: 20px 20px 20px 0;
    padding: 0 5px;
    line-height: 2.5rem;
    transition: all .5s;
    opacity: 0;
}
</style>