<template>
    <div></div>
</template>
<script>
export default {
data() {
    return {
    }
},
created() {
    let url = this.$route.query;
    this.$router.push({
        path: url,
    });
}  
}
</script>
<style>
</style>