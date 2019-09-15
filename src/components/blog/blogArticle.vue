<template>
    <article>
        <header>
            <h2>{{title}}</h2>
            <div class="time-tag article-tags">
                <blog-tag v-for="tag in tags" :key="tag" :tag-name="tag"></blog-tag>
                <span :title="'创建日期：'+createDate" class="iconfont icon-rili">{{editDate}}</span>
            </div>
        </header>
        <div class="my-article">
            <mavon-editor
                id="my-article"
                :value="content"
                :subfield = "prop.subfield"
                :defaultOpen = "prop.defaultOpen"
                :toolbarsFlag = "prop.toolbarsFlag"
                :boxShadow = "prop.boxShadow"
                :editable="prop.editable"
            ></mavon-editor>
        </div>
        <footer>
            <span class="iconfont icon-ico"></span>
        </footer>
    </article>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            content: "",
            tags: [],
            createDate: "",
            editDate: ""
        }
    },
    methods:{
        toHome: function() {
            messenger.$emit("router","home");
            this.$router.push("content");
        },
        getArticle: function() {
            this.$axios.get("/api/blog/"+sessionStorage.getItem("blog_id"))
                .then((result) =>{
                    this.title = result.data[0].title;
                    this.content = result.data[0].content;
                    this.tags = result.data[0].tags;
                    this.createDate = result.data[0].addTime;
                    this.editDate = result.data[0].editTime;
                })
                .catch((err) =>window.console.log(err));
        }
    },
    created() {
        this.getArticle();
    },
    components: {blogTag:() =>import("../common/blogTag")},
    computed: {
        prop () {
            let data = {
                subfield: false,// 单双栏模式
                defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                editable: false,//无法编辑
                toolbarsFlag: false,//隐藏编辑器工具栏
                boxShadow: false,
            }
            return data
        }
    },
}
</script>

<style scoped>
    article {
        text-align: left;
        border-radius: 3px;
        padding: 10px 30px;
        background: rgba(255, 255, 255, 0.5);
    }
    article h2 {
        text-align: center;
    }
    article > header {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.3);
    }
    .time-tag {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        line-height: 25px;
    }
    .my-article >>> .v-note-wrapper {
        background: none;
        z-index: 0;
    }
    .my-article >>> .v-note-panel {
        border: none;
        z-index: 0;
    }
    .my-article >>> .v-show-content {
        background: none !important;
    }
    footer {
        text-align: center;
        padding: 20px;
    }
    footer .iconfont {
        font-size: 50px;
    }
    @media screen and (max-width:900px) {
        article {
            padding: 0 5%;
        }
    }
    @media screen and (max-width:500px) {
        article {
            padding: 0 1%;
        }
    }
</style>