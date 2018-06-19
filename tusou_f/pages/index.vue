<template>
    <div class="main">
        <!-- 菜单 -->
        <div class="cube">
            <nuxt-link to="/weight">
                <div class="front">
                    <h2>Front side</h2>
                </div>
            </nuxt-link>
            
            <div class="back">
                <h2>Back side</h2>
            </div>
            <div class="top">
                <h2>Top side</h2>
            </div>
            <div class="bottom">
                <h2>Bottom side</h2>
            </div>
            <div class="left">
                <h2>Left side</h2>
            </div>
            <div class="right">
                <h2>Right side</h2>
            </div>
            <i class="i_front"></i>
            <i class="i_back"></i>
            <i class="i_top"></i>
            <i class="i_bottom"></i>
            <i class="i_left"></i>
            <i class="i_right"></i>
        </div>
    </div>

</template>
<script>
export default {
    layout: 'common',
  // async asyncData({ app }) {
  //     let { data } = await app.$axios.get("/api/users/getUser");
  //     return{
  //         name:data.data.name
  //     }
  // }
  mounted() {}
};
</script>

<style lang="scss" scoped>
@keyframes down {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    height: 100%;
  }
}

.main {
  width: 100%;
  height: 100vh;
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 0;
    background: linear-gradient(45deg, rgba(91, 234, 213, .9) 0, rgba(98, 103, 252, 0.9) 100%);
    background-size: 100%;
    animation: down 0.8s ease-in-out 1s forwards;
  }
}
.cube {
  position: absolute;
  height: 200px;
  width: 200px;
  transform-style: preserve-3d;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
}

.cube div {
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  opacity: 0.9;
  background-color: #000;
  border: solid 1px #eee;
  color: #fff;
  font: 10px arial;
  text-align: center;
  line-height: 200px;
  transition: transform 0.2s ease-in;
}

.front {
  background: url(~/assets/images/1.jpg);
  transform: translateZ(100px);
}

.back {
  background: url(~/assets/images/2.jpg);
  transform: translateZ(-100px) rotateY(180deg);
}

.right {
  background: url(~/assets/images/3.jpg);
  transform: rotateY(-270deg) translateX(100px);
  transform-origin: top right;
}

.left {
  background: url(~/assets/images/4.jpg);
  transform: rotateY(270deg) translateX(-100px);
  transform-origin: center left;
}

.top {
  background: url(~/assets/images/5.jpg);
  transform: rotateX(-270deg) translateY(-100px);
  transform-origin: top center;
}

.bottom {
  background: url(~/assets/images/6.jpg);
  transform: rotateX(270deg) translateY(100px);
  transform-origin: bottom center;
}
/* inner cube */
i {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
  display: block;
  // background: linear-gradient(45deg,#23075d 0,#00605c 100%);
  background: linear-gradient(
    45deg,
    rgba(0, 96, 93, 0.3) 0,
    rgba(0, 96, 93, 0.9) 100%
  );
  transition: all 1s linear;
}
i.i_front {
  transform: translateZ(50px);
}
i.i_back {
  transform: translateZ(-50px) rotateY(180deg);
}
i.i_bottom {
  transform: rotateX(-90deg) translateY(50px);
  transform-origin: left bottom;
}
i.i_left {
  transform: rotateY(270deg) translateX(-50px);
  transform-origin: center left;
}
i.i_right {
  transform: rotateY(-270deg) translateX(50px);
  transform-origin: top right;
}
i.i_top {
  transform: rotateX(-270deg) translateY(-50px);
  transform-origin: left top;
}

@keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }

  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.cube {
  animation:rotate 20s infinite linear;
}

.cube:hover .front {
  transform: translateZ(200px);
}

.cube:hover .back {
  transform: translateZ(-200px) rotateY(180deg);
}

.cube:hover .right {
  transform: rotateY(-270deg) translateZ(100px) translateX(100px);
}

.cube:hover .left {
  transform: rotateY(270deg) translateZ(100px) translateX(-100px);
}

.cube:hover .top {
  transform: rotateX(-270deg) translateZ(100px) translateY(-100px);
}

.cube:hover .bottom {
  transform: rotateX(270deg) translateZ(100px) translateY(100px);
}
</style>
