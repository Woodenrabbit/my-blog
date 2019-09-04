<template>
    <div id="page">
        <blog-header></blog-header>
        <div class="loading-bar">
            <div class="loading"></div>
        </div>
        <section>
            <main>
                <router-view/>
            </main>
            <blog-aside></blog-aside>
        </section>
        <blog-footer></blog-footer>
        <nav :class="[{'nav-hide':hide},'nav-mobile']" v-if="isMobile">
            <div v-for="n in mobileNav" :key="n.name">
                <a href="#" @click="visiting($event)" :name="n.name">{{n.value}}</a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:"page",
    components:{
        blogHeader:()=>import("./blogHeader.vue"),
        blogAside:()=>import("./blogAside.vue"),
        blogFooter:()=>import("./blogFooter.vue")
    },
    data(){
        return {
            mobileNav:[
                {name:"content",value:"首页"},
                {name:"archive",value:"归档"},
                {name:"tags",value:"标签"},
                {name:"about",value:"关于"},
            ],
            isMobile: "",//宽度小于500时触发
            oldPosition:0,//判断滚动方向
            hide:true
        }
    },
    methods:{
        showBar: function(){
            this.display = !this.display;
        },
        visiting: function(event){
            this.showBar();
            this.$router.push({name:event.target.name}); 
        },
        resizeHandler: function(){
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            
            //to header
            this.$bus.emit("headerChange",clientWidth);
            
            if(clientWidth <= 500){
                this.isMobile = true;
            }else{
                this.isMobile = false;
            }
        },
        scrollHandler:function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //判断上下滚动
            let scrollDown;
            if(scrollTop <= this.oldPosition){
                scrollDown = false;
                this.hide = false;
            }
            else{
                scrollDown = true;
                this.hide = true;
            }
            setTimeout(() => {
                this.oldPosition = scrollTop;
            }, (0));
            //to aside
            this.$bus.emit("asideToTop",scrollTop);
            //to header
            this.$bus.emit("headerNav",[scrollTop,scrollDown]);
        }
    },
    mounted(){
        //监听窗口大小
        window.addEventListener('resize',this.resizeHandler,true);
        //监听滚动条
        window.addEventListener('scroll',this.scrollHandler,true);
        //页面初始高度
        this.oldPosition = document.documentElement.scrollTop || document.body.scrollTop;
    },
    created(){
        this.resizeHandler();
        this.scrollHandler();
    },
    watch:{
        isMobile(){
            console.log(this.isMobile)
            //to content
            this.$bus.emit("changeListLimit",this.isMobile);
        }
    }
}
</script>

<style scoped>
#page{
    position:relative;
}
#page > section{
    display: flex;
    margin:1% 10%;
    min-height:500px;
}
main{
    width:70%;
    transition: all .2s;
}
.nav-mobile{
    position:fixed;
    left:0;
    bottom:0;
    display: flex;
    justify-content: space-around;
    height:50px;
    width:100%;
    line-height:50px;
    background:rgb(90, 140, 150);
    box-shadow: 0 0 10px #000;
    transition: all .5s;
}
.nav-hide{
    bottom:-50px;
}
.loading-bar{
    height:5px;
    width: 100%;
}
.loading{
    width:20px;
    height:100%;
    background: blue;
    transition: all 1s;
}
@media screen and (max-width:900px){
    #page > section{
        margin:1% 0;
    }
    main{
        width:100%;
    }
}
</style>