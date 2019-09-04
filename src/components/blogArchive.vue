<template>
    <section>
        <div v-for="month in months" :key="month.id">
            <h3>{{month}}</h3>
            <p v-for="blog in blogsFilter(month)" :key="blog.id">
                <span><a href="#" @click.prevent="toArticle(blog._id)">{{blog.title}}</a></span>
                <span>{{blog.addTime.substring(5)}}</span>
            </p>
        </div>
    </section>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            blogs:[],
            months:[],
        }
    },
    methods:{
        getBlogs: function(){
            this.$axios.get("/api/blogs",{})
                .then((result)=>{
                    this.blogs = result.data;
                    this.blogs.forEach(blog => {
                        let month = blog.addTime.substring(0,7);
                        if(this.months.indexOf(month) == -1){
                            this.months.push(month);
                        }
                    });
                    this.months.sort().reverse();
                })
                .catch((err)=>console.log(err));
        },
        toArticle:function(id){
            sessionStorage.setItem("blog_id", id)
            this.$router.push({name:'blogs'});
        },
        blogsFilter:function(month){
            let blogsFilted = [];
            this.blogs.forEach((blog)=>{
                if(blog.addTime.substring(0,7) == month){
                    blogsFilted.push(blog);
                }
            });
            return blogsFilted;
        }
    },
    created(){
        this.getBlogs();
    }
}
</script>

<style scoped>
section{
    text-align: left;
    border-radius: 3px;
    padding: 10px 30px;
    background: rgba(255, 255, 255, 0.5);
}
p{
    display: flex;
    line-height: 30px;
    font-weight: normal;
    padding-left: 30px;
}
p:hover{
    background: rgba(0, 0, 0, 0.2)
}
h3{
    padding: 10px 0;
}
span{
    flex-basis: 50%;
    margin-right:10px;
}
span:first-child{
    flex-basis: 70%;
    white-space: nowrap;
    overflow: hidden;
}
span:last-child{
    text-align:right;
}
@media screen and (max-width:500px){
    section{
        padding: 10px 10px;
    }
    p{
        display: flex;
        line-height: 30px;
        font-weight: normal;
        padding-left: 10px;
    }
    span:last-child{
        display: none;
    }
}
</style>