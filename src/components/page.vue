<template>
    <div id="page">
        <blog-header></blog-header>
        <section>
            <main>
                <router-view/>
            </main>
            <blog-aside></blog-aside>
        </section>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
export default {
    name:"page",
    components:{
        blogHeader:()=>import("./blogHeader.vue"),
        blogAside:()=>import("./blogAside.vue"),
        blogFooter:()=>import("./blogFooter.vue")
    },
    created(){
        
    }
}
</script>

<style scoped>
main{
    width:70%;
    transition: all .2s;
}
#page > section{
    display: flex;
    margin:1% 10%;
    min-height:500px;
}

@media screen and (max-width:900px){
    #page > section{
        margin:0%;
    }
    main{
        width:100%;
    }
}
</style>