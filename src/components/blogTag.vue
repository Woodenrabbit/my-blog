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
            messenger.$emit('router','tags');
            this.$router.push({name:"tags",params:{tag_name:this.tagName}});
        }
    }
}
</script>
<style scoped>

</style>