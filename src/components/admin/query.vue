<template>
    <el-table :data="blogs" style="width: 100%">
        <el-table-column prop="addTime" label="日期" min-width="100px">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="tags" label="标签">
        </el-table-column>
        <el-table-column prop="_id" label="操作">
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="toEdit(blogs[scope.$index]._id)"
                type="button"  size="small">
                修改
                </el-button>
            </template>
        </el-table-column>
        <button @click="toCreate">增加</button>
  </el-table>
</template>

<script>
export default {
    data() {
        return{
            blogs:[],
            months:[],
        }
    },
    methods: {
        getBlogs: function() {
            this.$axios.get("/api/blogs",{})
                .then((result) =>{
                    this.blogs = result.data;
                    this.blogs.forEach(blog => {
                        let month = blog.addTime.substring(0,7);
                        if (this.months.indexOf(month) == -1){
                            this.months.push(month);
                        }
                    });
                    this.months.sort().reverse();
                })
                .catch((err)=>console.log(err));
        },
        toEdit: function(id) {
            sessionStorage.setItem("editID", id)
            this.$router.push({name:'adminUpdate'});
        },
        toCreate: function() {
            this.$router.push({name:'adminCreate'});
        },
        blogsFilter: function(month) {
            let blogsFilted = [];
            this.blogs.forEach((blog)=>{
                if (blog.addTime.substring(0,7) == month){
                    blogsFilted.push(blog);
                }
            });
            return blogsFilted;
        }
    },
    created() {
        this.getBlogs();
    }
}
</script>

<style scoped>
    section {
        text-align: left;
        border-radius: 3px;
        padding: 10px 30px;
        width: 50%;
    }
    p {
        display: flex;
        line-height: 30px;
        font-weight: normal;
        padding-left: 30px;
        justify-content: space-between;
    }
    h3 {
        padding: 10px 0;
    }
    span {
        margin-right: 10px;
    }
    span:first-child {
        white-space: nowrap;
        overflow: hidden;
    }
    span:last-child {
        text-align: right;
    }
    @media screen and (max-width:500px) {
        section {
            width: 100%;
            padding: 10px 0;
        }
        p {
            padding: 0 10px;
        }
    }
</style>