<template>
    <section>
        <header>
            <h3>所有的标签</h3>
            <div>
                <span v-for="key in Object.keys(combinedTags)" :key="key">
                    <a href="#" @click.prevent="toBlogs(key)">{{key}}{{'['+combinedTags[key]+']'}}</a>
                </span>
            </div>
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
            tag:"",
            tags:[]
        }
    },
    methods:{
        toBlogs:function(tag){
            sessionStorage.setItem("blogsFilter", tag);
            this.$router.push({name:'content'});
        },        
        getTags: function(){
            this.$axios.get("/api/tags")
                .then((result)=>{
                    this.tags = result.data;
                })
                .catch((err)=>window.console.log(err));
        }
    },
    created(){
        this.tag = this.$route.params.tag_name || "";
        this.getTags();
    },
    computed:{
        combinedTags(){
            let arr = {};
            this.tags.forEach((item)=>{
                item.tags.forEach((tag)=>{
                    if(arr[tag] == undefined){
                        arr[tag] = 1;
                    }
                    else{
                        arr[tag]++;
                    }
                })
            })
            return arr;
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