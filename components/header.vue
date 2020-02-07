<template lang="html">
  <header>
    <div class="content">
      <logo/>
    </div>
    <div class="banner" v-scroll="{ parallax: { ySpeed: -2 } }"/>
  </header>
</template>

<script>
import logo from '@/components/logo'
export default {
  components:{logo}
}
</script>

<style lang="scss">
  header{
    height: $unit * 6;
    .banner{
      position: absolute;
      z-index: -1;
      background: $abyss;
      background: linear-gradient(0deg,lighten($abyss,5%) 1%, $abyss 100%);
      width: 100%;
      left: 0px;
      top: 0px;
      animation: shrink 2s;
      height: $unit * 10;
    }

    .content{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      color: white;
      height: 100%;

      svg{
        flex: 0 0 auto;
        width: 300px;
        fill: $snow;
      }
    }

    @media (max-width: $mobile){
      .content{
        svg{
          max-width: 70vw;
        }
      }
    }
  }
</style>
