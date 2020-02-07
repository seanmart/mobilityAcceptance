<template>
  <div id="site" v-scroll:section>
    <the-header />
    <div class="banner" v-scroll="{ parallax: { ySpeed: -2 } }" />
    <nuxt />
    <the-footer />
  </div>
</template>
<script>
import theHeader from "@/components/header";
import theFooter from "@/components/footer";
export default {
  components: { theHeader, theFooter }
};
</script>
<style lang="scss">
html {
  font-family: 'Noto Serif', serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: $silver;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#site {
  .banner {
    position: absolute;
    z-index: -1;
    background: $abyss;
    background: linear-gradient(0deg,lighten($abyss,5%) 1%, $abyss 100%);
    width: 100%;
    height: $unit * 8;
    left: 0px;
    top: 0px;
  }
  .content {
    max-width: 1000px;
    margin: 0px auto;
  }

  a{
    font-family: 'Roboto', sans-serif;
  }

  @media (max-width: $mobile){
    .banner{
      //height: 100vh;
    }
  }
}
</style>
