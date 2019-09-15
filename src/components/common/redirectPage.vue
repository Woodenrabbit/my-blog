<template>
    <div></div>
</template>
<script>
export default {
    created() {
        let url = this.$route.query;
        this.$router.push({
            path: url,
        });
    }  
}
</script>