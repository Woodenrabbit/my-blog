<template>
    <a href="#" @click.prevent="toTags" class="iconfont icon-biaoqian">
        <span>{{tagName}}</span>
    </a>
</template>
<script>
import messenger from "../libs/messenger.js";
export default {
    props:["tagName"],
    methods:{
        toTags:function(){
            sessionStorage.setItem("blogsFilter", this.tagName);
            if(this.$route.name == "content"){
                //this.$router.go(0);
                this.$router.push({name:"redirect",query:this.$route.path});
            }
            else{
                this.$router.push({name:"content"});
            }
        }
    }
}
</script>
<style scoped>

</style>