<template>
    <div class="main">
        <header>
            <ul class="clearfix">
                <li v-for="(item,index) in nav" :key="index">
                    <nuxt-link :to="item.link" class="nav">
                        {{item.key}}
                    </nuxt-link>
                </li>
            </ul>
        </header>
        <nuxt/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nav: [{
                key:"主页",
                link:"/"
            },{
                key: "登录",
                link: "/log"
            }, {
                key: "注册",
                link: "/reg"
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    position: relative;
    header {
        position: absolute;
        width: 100%;
        z-index: 9;
        ul {
            float: right;
            margin-top: 20px;
        }
        li {
            float: left;
            margin-right: 30px;
            text-align: center;
            cursor: pointer;
            &:hover {
                .nav {
                    color: aqua;
                }
            }
        }
        .nav {
            font-size: 14px;
            color: #fff;
            transition: all 0.3s;
        }
    }
}
</style>


