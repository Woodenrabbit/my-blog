<template>
    <div style="position:relative">
        <div class="loading" v-if="loading"></div>
        <p class="filter" v-if="queryFilter">筛选条件：{{queryFilter}}
            <a href="#" @click.prevent="removeFilter">撤销</a>
        </p>
        <article class="cards-article" v-for="blog in blogFilted()" :key="blog.id">
            <h3><a href="#" @click.prevent="toBlogs(blog._id)">{{blog.title}}</a></h3>
            <div class="time-tag">
                <span :title="'创建日期：'+blog.addTime" class="iconfont icon-rili">
                    {{blog.editTime}}
                </span>
            </div>
            <div class="article-desc">
                <!-- <p v-html="blog.description+'...'"></p> -->
                <mavon-editor
                    :value="blog.description"
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :boxShadow = "false"
                    :editable="false"
                ></mavon-editor>
            </div>
            <div class="article-tags">
                <blog-tag v-for="tag in blog.tags" :key="tag" :tag-name="tag"></blog-tag>
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
            divideNum:5,
            blogs:[],
            dividePages:0,
            currentPage:1,
            loading:false,
            queryFilter:""
        }
    },
    methods:{
        getBlogs: function(){
            this.loading = true;
            let url;
            if(this.queryFilter){
                url = "/api/blogs/"+ this.queryFilter;
            }
            else{
                url = "/api/blogs";
            }
            this.$axios.get(url,{})
                .then((result)=>{
                    this.blogs = result.data;
                    this.dividePages = Math.ceil(this.blogs.length/this.divideNum);
                    this.loading = false;
                })
                .catch((err)=>{
                    console.log(err)
                    this.loading = false;
                });
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
        toBlogs: function(id){
            sessionStorage.setItem("blog_id", id);
            sessionStorage.setItem("currentNav", "blogs");
            //messenger.$emit('router','blogs');
            this.$router.push("blogs");
        },
        toTags: function(){},
        blogFilted: function(){
            let start = (this.currentPage-1) * this.divideNum;
            let end = start + this.divideNum;
            return this.blogs.slice(start, end);
        },
        removeFilter:function(){
            this.queryFilter = "";
            sessionStorage.setItem("blogsFilter","");
            this.getBlogs();
        }
    },
    created(){
        this.queryFilter = sessionStorage.getItem("blogsFilter");
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
.filter{
    text-align: left;
    margin:10px 0;
    background: rgba(255, 255, 255, 0.5);
    padding: 10px 10px;
    border-radius: 10px;
}
.filter a{
    color:royalblue;
}
.loading{
    position: absolute;
    top:0;
    left:50%;
    height:50px;
    width:50px;
    background: rgba(0, 0, 0, 0.5);
    animation: roll 1s infinite linear;
}
@keyframes roll {
    to {transform:rotate(360deg)}
}
.article-desc{
    height:150px;
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
}
.article-desc >>> .v-note-wrapper{
    background:none;
    z-index: 0;
}
.article-desc >>> .v-note-panel{
    border: none;
    z-index: 0;
}
.article-desc >>> .v-show-content{
    background:none !important;
}
.article-desc p{
    margin-top:10px;
}
.article-tags{
    min-height:20px;
}
.time-tag{
    position: absolute;
    right:20px;
    bottom:0;
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
@media screen and (max-width:500px){
    .cards-article{
        padding: 10px 10px;
    }
    .time-tag{
        display: none;
    }
}
</style>