<template>
    <section>
        <header>
            #{{tag}}
        </header>
        <div>
            
        </div>
    </section>
</template>

<script>
import messenger from "../libs/messenger.js";
export default {
    data(){
        return{
            tag:""
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
        this.tag = this.$route.params.tag_name || "";
        if(this.tag == ""){
            
        }
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