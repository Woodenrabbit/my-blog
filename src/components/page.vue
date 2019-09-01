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
        <nav :class="[{'hide':display},'mobile-slider']">
            <ul>
                <li><a href="#" @click.prevent="visiting($event)" name="content">首页</a></li>
                <li><a href="#" @click.prevent="visiting($event)" name="archive">归档</a></li>
                <li><a href="#" @click.prevent="visiting($event)" name="tags">标签</a></li>
                <li><a href="#" @click.prevent="visiting($event)" name="about">关于</a></li>
            </ul>
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
            display: false
        }
    },
    methods:{
        showBar: function(){
            this.display = !this.display;
        },
        visiting: function(event){
            this.showBar();
            this.$router.push({name:event.target.name}); 
        }
    },
    created(){

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
.mobile-slider{
    position:fixed;
    left:-300px;
    top:0;
    height:100%;
    width:200px;
    background:rgba(90, 140, 150, 0.9);
    transition: all .5s;
}
.mobile-slider ul{
    margin-top:200px;
    padding: 0;
}
.mobile-slider ul li{
    margin-top: 20px;
}
.hide{
    left:0;
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