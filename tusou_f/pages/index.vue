<template>
    <div>
        <h1>我是兔砸</h1>
        <el-button type="danger">{{name}}</el-button>
    </div>

</template>
<script>
export default {
    async asyncData({ app }) {
        let { data } = await app.$axios.get("api/users/getUser");
        return{
            // name:data.data.username
            name:1
        }
    }
}
</script>

