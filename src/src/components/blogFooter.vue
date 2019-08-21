<template>
    <footer>
        <div></div>
        <div>
            <p>
                Thanks for visiting my blog
                <span>© 2019 Copyright </span>
                <span>|</span>
                <span><a href="#">about</a></span>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    data(){
        return{
            title:"Mr.Rabbit 的个人博客"
        }
    }
}
</script>

<style scoped>
footer{
    height:200px;
    width:100%;
    background:linear-gradient(0deg,  rgba(90, 140, 150, 0.8), transparent);
}
footer div{
    text-align: center;
    height:50%;
}
footer span{
    margin: 0 10px;
}
footer div:last-child p{
    margin-top:0;
}

</style>