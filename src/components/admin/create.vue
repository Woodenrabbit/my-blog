<template>
    <div id="admin">
        <form method="POST">
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" name="title" v-model="title" @focus="edit_title">
            </div>
            <div class="form-group">
                <label for="tags">标签</label>
                <input type="text" name="tags" v-model="tags">
            </div>
            <div>
                <mavon-editor v-model="content" />
            </div>
            <button @click.prevent="submit">提交</button>
            <p>{{message}}</p>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:"",
            tags:"",
            content:"",
            message:"请输入..."
        }
    },
    components:{
    },
    methods:{
        submit:function(){
            this.$axios.post("/api/content/add",{title:this.title, tags:this.tags.join(' '), content:this.content})
                .then((result)=>{
                    this.message = result.data;
                })
                .catch((err)=>window.console.log(err))
        },
        edit_title:function(){
            this.message = "请输入...";
        }
    },
    watch:{
        // content:function(){
        //     window.console.log(this.content);
        // }
    },
    computed:{
    }
}
</script>

<style scoped>
#admin form > div{
    margin: 20px 0;
}
@media screen and (max-width:500px){
    label{
        font-size:20px;
    }
    input{
        height:20px;
        width:60%;
    }
}
</style>