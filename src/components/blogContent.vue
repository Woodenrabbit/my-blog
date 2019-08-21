<template>
    <div>
        <article class="cards-article" v-for="index of maxIndex" :key="index">
            <h3><router-link to="./blogs">{{blogs[(currentPage-1)*divideNum+index-1].title}}</router-link></h3>
            <div class="time-tag">
                <span>创建日期：{{blogs[(currentPage-1)*divideNum+index-1].createDate}}</span>
                <span>最近更新：{{blogs[(currentPage-1)*divideNum+index-1].editDate}}</span>
            </div>
            <p v-html="blogs[(currentPage-1)*divideNum+index-1].description"></p>
        </article>
        <div class="divide-bar">
            <a v-for="index of dividePages" :key="index" href="#" :class="index==currentPage?'visited':'notActive'" @click.prevent="setCurrentPage($event)">{{index}}</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            divideNum:5,
            blogs:[
                {id:1, title:"博客搭建规划", description:"当前版本v1.0....", createDate:"2019/08/20 10:00:00" , editDate:"2019/08/20 14:00:00"},
                {id:2, title:"页面2", description:"today, let's talk about vue......"},
                {id:3, title:"页面3", description:"today, let's talk about vue......"},
                {id:4, title:"页面4", description:"today, let's talk about vue......"},
                {id:5, title:"页面5", description:"today, let's talk about vue......"},
                {id:6, title:"页面6", description:"today, let's talk about vue......"},
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
    height:200px;
    margin-bottom:20px;
    padding: 10px 30px;
    position:relative;
    border-radius: 3px;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0);
}
.cards-article:hover{
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 1px #000;
}
.time-tag{
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