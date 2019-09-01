<template>
    <section>
        <div v-for="month in months" :key="month.id">
            <h3>{{month}}</h3>
            <p v-for="blog in blogsFilter(month)" :key="blog.id">
                <span>{{blog.title}}</span>
                <!-- <span>{{blog.addTime}}</span> -->
                <button @click="toEdit(blog._id)">修改</button>
            </p>
        </div>
        <button @click="toCreate">增加</button>
    </section>
</template>

<script>
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
        toEdit:function(id){
            sessionStorage.setItem("editID", id)
            this.$router.push({name:'adminUpdate'});
        },
        toCreate:function(){
            this.$router.push({name:'adminCreate'});
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
    width:50%;
}
p{
    display: flex;
    line-height: 30px;
    font-weight: normal;
    padding-left: 30px;
    justify-content: space-between;
}
h3{
    padding: 10px 0;
}
span{
    margin-right:10px;
}
span:first-child{
    white-space: nowrap;
    overflow: hidden;
}
span:last-child{
    text-align:right;
}
@media screen and (max-width:500px){
    section{
        width:100%;
        padding:10px 0;
    }
    p{
        padding:0 10px;
    }
}
</style>