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

a{
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}

h1{
  font-size: 21px;
  font-weight: 700;
  color: $abyss;
  margin-bottom: $unit / 3;
  font-family: 'Roboto', sans-serif;
}

p{
  font-size: 14px;
  color: $charcoal;
  line-height: 160%;
}

@media (max-width: $mobile){
  h1{
    font-size: 20px;
  }
  p{
    font-size: 15px;
  }
}

#site {
  .content {
    max-width: $siteWidth;
    margin: 0px auto;
  }

  @keyframes above{
    0%{
      opacity: 0;
      transform: translateY(-10%);
    }
    100%{
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes below{
    0%{
      opacity: 0;
      transform: translateY(10%);
    }
    100%{
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes side{
    0%{
      opacity: 0;
      transform: translateX(-5%);
    }
    100%{
      opacity: 1;
      transform: translateX(0%);
    }
  }


  @keyframes above-show{
    0%{transform: translateY(-10%);}
    100%{transform: translateY(0%);}
  }

  @keyframes below-show{
    0%{transform: translateY(10%);}
    100%{transform: translateY(0%);}
  }

}
</style>
