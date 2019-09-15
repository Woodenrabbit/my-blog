<template>
    <section>
        <header>
            <h3>所有的标签</h3>
        </header>
        <div>
            <span v-for="key in Object.keys(combinedTags)" :key="key" :style="{'font-size':11 + combinedTags[key]*5 + 'px'}">
                <a href="#" @click.prevent="toBlogs(key)">-{{key}}{{'['+combinedTags[key]+']'}}-</a>
            </span>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tag: "",
            tags: []
        }
    },
    methods: {
        toBlogs(tag) {
            sessionStorage.setItem("blogsFilter", tag);
            this.$router.push({name: 'content'});
        },        
        getTags() {
            this.$axios.get("/api/tags")
                .then((result) =>{
                    this.tags = result.data;
                })
                .catch((err) =>window.console.log(err));
        }
    },
    created(){
        this.tag = this.$route.params.tag_name || "";
        this.getTags();
    },
    computed:{
        combinedTags() {
            let arr = {};
            this.tags.forEach((item) =>{
                item.tags.forEach((tag) =>{
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
    section {
        text-align: left;
        border-radius: 3px;
        padding: 10px 30px;
        background: rgba(255, 255, 255, 0.5);
    }
    h3 {
        padding: 10px 0;
    }
    header + div {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    span {
        flex-basis: 33%;
        text-align: center;
        white-space: nowrap;
    }
    @media screen and (max-width: 500px){
        section {
            padding: 10px 1%;
        }
    }
</style>