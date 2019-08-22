<template>
    <div>
        <article class="cards-article" v-for="index of maxIndex" :key="index">
            <h3><a href="#" @click.prevent="toBlogs">{{blogs[(currentPage-1)*divideNum+index-1].title}}</a></h3>
            <div class="time-tag">
                <span :title="'创建日期：'+blogs[(currentPage-1)*divideNum+index-1].createDate">
                    更新日期：{{blogs[(currentPage-1)*divideNum+index-1].editDate}}
                </span>
            </div>
            <div class="article-desc">
                <p v-html="blogs[(currentPage-1)*divideNum+index-1].description"></p>
            </div>
            <div class="article-tags">
                <span>{{blogs[(currentPage-1)*divideNum+index-1].tag}}</span>
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
            blogs:[
                {id:1, title:"博客搭建规划", description:"当前版本v1.0....", createDate:"2019/08/20" , editDate:"2019/08/20", tag:"个人相关"},
                {id:2, title:"页面2", description:"today, let's talk about vue......", tag:"个人相关"},
                {id:3, title:"页面3", description:"today, let's talk about vue......", tag:"个人相关"},
                {id:4, title:"页面4", description:"today, let's talk about vue......", tag:"个人相关"},
                {id:5, title:"页面5", description:"today, let's talk about vue......", tag:"个人相关"},
                {id:6, title:"页面6", description:"today, let's talk about vue......", tag:"个人相关"},
            ],
            dividePages:0,
            currentPage:1,
            maxIndex:5
        }
    },
    methods:{
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
        }
    },
    created(){
        this.dividePages = Math.ceil(this.blogs.length/this.divideNum);
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
.article-tags{
    padding-top: 10px;
}
.article-tags span{
    background:rgba(0, 0, 0, 0.5);
}
.time-tag{
    position: absolute;
    right:0;
    top:0;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding: 10px 0;
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