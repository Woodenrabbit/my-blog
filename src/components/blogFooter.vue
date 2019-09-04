<template>
    <footer>
        <div></div>
        <div>
            <p>
                Thanks for visiting my blog
            </p>
            <p>
                <span>© 2019 <a href="#" @click.prevent>Wooden-Rabbit</a></span>
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
    width:100%;
    background:  rgba(90, 140, 150, 0.8);
    box-shadow: 0 0 10px #000;
    padding: 25px 0;
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
footer p{
    line-height:25px;
}
footer a{
    color: #2c3e50;
}
footer a:hover{
    color:greenyellow;
}
@media screen and (max-width:500px){
    footer{
        display: none;
    }
}
</style>