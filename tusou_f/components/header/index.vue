<template>
  <header class="clearfix">
    <ul class="fl">
      <li>
        <span>{{note}}</span>
        <span class="name">{{name}}</span>
        <span>欢迎来到兔窝镇</span>
      </li>
      <nuxt-link :to="item.link"
                 tag="li"
                 v-for="(item,index) in nav"
                 :key="index"
                 class="nav"
                 v-if="!name">
        {{item.key}}
      </nuxt-link>
      <li v-if="name"
          class="nav"
          @click="outLog">注销登录</li>
    </ul>
    <zjMenu class="fr menu" />
  </header>
</template>

<script>
import zjMenu from './menu'
export default {
  data () {
    return {
      nav: [
        {
          key: "登录",
          link: "/log"
        }, {
          key: "注册",
          link: "/reg"
        }]
    }
  },
  methods: {
    // 退出登录
    outLog () {
      this.$cookie.delete('user_token')
      this.$store.commit('clearUserInfo')
      this.$router.push('/log')
    }
  },
  computed: {
    // 返回头部头部信息(时间)
    note () {
      let hours = new Date().getHours()
      let text = ''
      if (hours < 6) {
        text = '凌晨静悄悄，注意身体哟~'
      } else if (hours < 12) {
        text = '早上好！'
      } else if (hours < 14) {
        text = '中午好，今天的午饭还好吗？'
      } else if (hours < 17) {
        text = '下午好！'
      } else if (hours < 19) {
        text = '傍晚好，吃饭了吗？'
      } else if (hours < 22) {
        text = '晚上好！'
      } else if (hours < 24) {
        text = '早点睡哦~'
      }
      return text
    },
    name () {
      return this.$store.state.userInfo.name
    }
  },
  components: {
    zjMenu
  }
}
</script>

<style lang="scss" scoped>
header {
    position: absolute;
    width: 100%;
    z-index: 9;
    top: 0;
    left: 0;
    padding: 20px 0 0 20px;
    li {
        margin-right: 30px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #fff;
        transition: all 0.3s;
        &.nav {
            cursor: pointer;
        }
        &:hover {
            &.nav {
                color: aqua;
            }
        }
        .name {
            color: aqua;
            margin-right: 10px;
        }
    }
}
</style>


