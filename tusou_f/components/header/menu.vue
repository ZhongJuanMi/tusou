<template>
  <div class="menu"
       :class="show?'show':''"
       @mouseleave='()=>this.show=false'>
    <p class="menu_title"
       @mouseenter='()=>this.show=true'>菜单</p>
    <ul class="menu_list">
      <li @click=go(index,item.link)
          tag="li"
          :class="curPageIndex==index?'on':''"
          v-for="(item,index) in nav"
          :key="index">{{item.value}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nav: [{
        value: '主那个页',
        link: '/'
      }, {
        value: '你哒体重',
        link: '/weight',
      }, {
        value: '去登录吧',
        link: '/log'
      }, {
        value: '去注册啦',
        link: '/reg'
      }],
      show: false
    }
  },
  computed: {
    curPageIndex () {
      let index = 0
      let path = this.$route.fullPath
      for (let i in this.nav) {
        if (this.nav[i].link == path) {
          index = i
        }
      }
      return index
    }
  },
  methods: {
    go (index, link) {
      if (index == this.curPageIndex) {
        return false
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
    font-size: 14px;
    color: #fff;
    width: 120px;
    text-align: center;
    background: transparent;
    border-radius: 10px;
    line-height: 40px;
    padding: 10px 0;
    overflow: hidden;
    transition: all 0.4s;
    position: relative;
    top: -20px;
    &_title {
        cursor: default;
        transition: all 0.4s;
    }
    &.show {
        background: rgba(#fff, 0.3);
        .menu_title {
            color: aqua;
        }
        .menu_list {
            opacity: 1;
            height: 160px;
        }
    }
    &_list {
        opacity: 0;
        height: 0;
        transition: all 0.4s;
    }
    li {
        &:not(.on):hover {
            color: aqua;
            cursor: pointer;
        }
        &.on {
            cursor: default;
            color: aqua;
            background-color: rgba(#fff, 0.2);
        }
    }
}
</style>

