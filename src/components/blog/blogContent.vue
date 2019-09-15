<template>
    <div style="position:relative">
        <p class="filter" v-if="queryFilter">筛选条件：{{queryFilter}}
            <a href="#" @click.prevent="removeFilter">撤销</a>
        </p>
        <article class="cards-article" v-for="blog in blogFilted()" :key="blog.id">
            <h3><a href="#" @click="toBlogs(blog._id)">{{blog.title}}</a></h3>
            <div class="time-tag">
                <span :title="'创建日期：'+blog.addTime" class="iconfont icon-rili">
                    {{blog.editTime}}
                </span>
            </div>
            <div class="article-desc">
                <p v-html="getDesciption(blog.content)"></p>
            </div>
            <div class="article-tags">
                <blog-tag v-for="tag in blog.tags" :key="tag" :tag-name="tag"></blog-tag>
            </div>
        </article>
        <div class="divide-bar" v-if="dividePages > 1">
            <a v-for="index of dividePages" :key="index" href="#" :class="index==currentPage?'visited':'notActive'" @click="setCurrentPage($event)">{{index}}</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            blogs:[],
            currentPage:1,
            loading:false,
            queryFilter:false,
            isMobile:""
        }
    },
    methods:{
        getBlogs() {
            this.loading = true;
            let url;
            if (this.queryFilter) {
                url = "/api/blogs/"+ this.queryFilter;
            } else {
                url = "/api/blogs";
            }
            this.$axios.get(url, {})
                .then((result) =>{
                    this.blogs = result.data;
                    this.loading = false;
                })
                .catch((err) =>{
                    console.log(err)
                    this.loading = false;
                });
        },
        setCurrentPage(e) {
            this.currentPage = e.target.innerText;
        },
        toBlogs(id) {
            sessionStorage.setItem("blog_id", id);
            sessionStorage.setItem("currentNav", "blogs");
            //messenger.$emit('router','blogs');
            this.$router.push("blogs");
        },
        removeFilter() {
            this.queryFilter = "";
            sessionStorage.setItem("blogsFilter","");
        },
        blogFilted() {
            let start = (this.currentPage-1) * this.divideNum;
            let end = start + this.divideNum;
            return this.blogs.slice(start, end);
        },
        getDesciption(content) {
            if (!RegExp.escape) {
                RegExp.escape = function(value) {
                    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                };
            }
            var unicode = ['!', '@', '%', '$', '#', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '\\', '|', ':', ';', '\'', '"', '<', '>', '/', '?', '~', '`'];

            var regex = new RegExp(unicode.map(function(val) {
                return RegExp.escape(val);
            }).join('|'), 'g');
            return content.substring(0,250).replace(regex, "") + "...";
        }
    },
    created() {
        //获取标签筛选
        this.queryFilter = sessionStorage.getItem("blogsFilter") || "";
        if (sessionStorage.getItem("isMobile") == "true"){
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        //from page
        this.$bus.on('changeListLimit', (isMobile) =>this.isMobile = isMobile);
    },
    computed: {
        dividePages: function() {
            if (this.divideNum == 0) {
                return 1;
            } else {
                return  Math.ceil(this.blogs.length/this.divideNum);
            }
        },
        divideNum: function() {
            if (this.isMobile) {
                //页数初始化
                this.currentPage = 1;
                return this.blogs.length;
            } else { 
                return 5; 
            }
        }
    },
    watch: {
        queryFilter() {
            this.getBlogs();
        }
    },
    components: {
        blogTag:() =>import("../common/blogTag")
    }
}
</script>

<style scoped>
    .cards-article {
        text-align: left;
        margin-bottom: 20px;
        padding: 10px 30px;
        position: relative;
        border-radius: 3px;
        transition: all 0.5s;
        background: rgba(255, 255, 255, 0.5);
    }
    .cards-article:hover {
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
    }
    .filter {
        text-align: left;
        margin: 10px 0;
        background: rgba(255, 255, 255, 0.5);
        padding: 10px 10px;
        border-radius: 10px;
    }
    .filter a {
        color: royalblue;
    }
    .article-desc {
        height: 150px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
    .article-desc >>> .v-note-wrapper {
        background: none;
        z-index: 0;
    }
    .article-desc >>> .v-note-panel {
        border: none;
        z-index: 0;
    }
    .article-desc >>> .v-show-content {
        background: none !important;
    }
    .article-desc p{
        line-height: 28px;
        margin-top: 10px;
    }
    .article-tags {
        min-height: 20px;
    }
    .time-tag {
        position: absolute;
        right: 20px;
        bottom: 0;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        padding: 12px 0;
    }
    .time-tag span {
        margin-right: 10px;
    }
    .divide-bar {
        height: 50px;
        line-height: 50px;
    }
    .divide-bar a {
        margin: 0 10px;
        transition: all 1s;
    }
    .divide-bar a:hover {
        border-bottom: 1px solid black;
    }
    @media screen and (max-width:500px) {
        .cards-article {
            padding: 10px 10px;
        }
        .time-tag {
            display: none;
        }
    }
</style>