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
}
section{
    display: flex;
    margin:1% 10%;
    min-height:500px;
}

@media screen and (max-width:900px){
    section{
        margin:0%;
    }
    aside{
        display: none;
    }
    main{
        width:100%;
    }
}
</style>