<template>
    <section>
        <div v-for="month in months" :key="month.id">
            <h3>{{month}}</h3>
            <p v-for="blog in blogsFilter(month)" :key="blog.id">
                <span><a href="#" @click.prevent="toArticle">{{blog.title}}</a></span>
                <span>{{blog.createDate}}</span>
            </p>
        </div>
    </section>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            blogs:[
                {id:1, title:"博客搭建规划", createDate:"2019-08-20 10:23", editDate:"2019-08-21 10:45"},
                {id:2, title:"博客2", createDate:"2019-03-20 10:23", editDate:"2019-08-21 10:45"},
                {id:3, title:"博客3", createDate:"2019-04-20 10:23", editDate:"2019-08-21 10:45"},
                {id:4, title:"博客4", createDate:"2019-05-20 10:23", editDate:"2019-08-21 10:45"},
                {id:5, title:"博客5", createDate:"2018-08-20 10:23", editDate:"2019-08-21 10:45"},
                {id:6, title:"博客5", createDate:"2018-08-20 10:23", editDate:"2019-08-21 10:45"},
            ],
            months:[],
        }
    },
    methods:{
        toArticle:function(){
            this.$router.push({name:'blogs'});
        },
        blogsFilter:function(month){
            let blogsFilted = [];
            this.blogs.forEach((blog)=>{
                if(blog.createDate.substring(0,7) == month){
                    blogsFilted.push(blog);
                }
            });
            return blogsFilted;
        }
    },
    created(){
        this.blogs.forEach(blog => {
            let month = blog.createDate.substring(0,7);
            if(this.months.indexOf(month) == -1){
                this.months.push(month);
            }
        });
        this.months.sort().reverse();
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
</style>