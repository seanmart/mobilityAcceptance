<template>
  <div id="site" v-scroll:section>
    <the-header/>
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
  .content {
    max-width: 1000px;
    margin: 0px auto;
  }

  a{
    font-family: 'Roboto', sans-serif;
  }

  h1{
    font-size: 22px;
    font-weight: bold;
    color: $abyss;
    margin-bottom: $unit / 3;
  }

  p{
    font-size: 16px;
    color: $charcoal;
    line-height: 150%;
  }

  @media (max-width: $mobile){
    h1{
      font-size: 20px;
    }
    p{
      font-size: 14px;
    }
  }

}
</style>
