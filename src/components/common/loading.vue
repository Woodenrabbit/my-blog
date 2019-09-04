<template>
    <div class="loading" v-if="loading"></div>
</template>
<script>
export default {
    data(){
        return{
            loading:false,
        }
    },
    methods:{
        show:function(){
            if(!this.loading){
                this.loading = true;
            }
        }
    }
}
</script>
<style scoped>
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
</style>