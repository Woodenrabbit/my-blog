<template>
    <div>
        <article class="cards-article" v-for="blog in blogFilted()" :key="blog.id">
            <h3><a href="#" @click.prevent="toBlogs(blog._id)">{{blog.title}}</a></h3>
            <div class="time-tag">
                <span :title="'创建日期：'+blog.addTime" class="iconfont icon-rili">
                    {{blog.editTime}}
                </span>
            </div>
            <div class="article-desc">
                <p v-html="blog.description+'...'"></p>
            </div>
            <div class="article-tags">
                <blog-tag v-for="tag in blog.tags" :key="tag" :tag-name="tag">
                </blog-tag>
            </div>
        </article>
        <div class="divide-bar">
            <a v-for="index of dividePages" :key="index" href="#" :class="index==currentPage?'visited':'notActive'" @click.prevent="setCurrentPage($event)">{{index}}</a>
        </div>
    </div>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            divideNum:3,
            blogs:[
                {id:1, title:"博客搭建规划", description:"当前版本v1.0....", createDate:"2019-08-20 09:30" , editDate:"2019-08-20 15:22", tags:["个人相关","博客"]},
                ],
            dividePages:0,
            currentPage:1,
        }
    },
    methods:{
        getBlogs: function(){
            this.$axios.get("/post",{})
                .then((result)=>{
                    this.blogs = result.data;
                    this.dividePages = Math.ceil(this.blogs.length/this.divideNum);
                })
                .catch((err)=>console.log(err));
        },
        setCurrentPage: function(e){
            this.currentPage = e.target.innerText;
            if(this.currentPage * this.divideNum > this.blogs.length){
                this.maxIndex = this.blogs.length - (this.currentPage - 1) * this.divideNum;
            }
            else{
                this.maxIndex = 5;
            }
        },
        toBlogs: function(){
            messenger.$emit('router','blogs');
            this.$router.push("blogs");
        },
        toTags: function(){},
        blogFilted: function(){
            let start = (this.currentPage-1) * this.divideNum;
            let end = start + this.divideNum;
            return this.blogs.slice(start, end);
        }
    },
    created(){
        this.getBlogs();
    },
    components:{
        blogTag:()=>import("./blogTag.vue")
    }
}
</script>

<style scoped>
.cards-article{
    text-align: left;
    margin-bottom:20px;
    padding: 10px 30px;
    position:relative;
    border-radius: 3px;
    transition: all 0.5s;
    background: rgba(255, 255, 255, 0.5);
}
.cards-article:hover{
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
.article-desc{
    min-height:150px;
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
}
.article-desc p{
    margin-top:10px;
}
.time-tag{
    position: absolute;
    right:0;
    top:0;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding: 12px 0;
}
.time-tag span{
    margin-right:10px;
}
.divide-bar{
    height: 50px;
    line-height: 50px;
}
.divide-bar a{
    margin:0 10px;
    transition: all 1s;
}
.divide-bar a:hover{
    border-bottom: 1px solid black;
}
</style>