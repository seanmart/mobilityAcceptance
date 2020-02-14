<template lang="html">
  <header>
      <div class="logo" v-scroll="{parallax:{ySpeed:2}}">
        <logo/>
      </div>
  </header>
</template>

<script>
import width from '@/assets/variables.scss'
import logo from '@/components/logo'
export default {
  components:{logo},
  data(){
    return{
      width
    }
  }
}
</script>

<style lang="scss">
  header{
    height: $header;
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    color: white;

    svg{
      flex: 0 0 auto;
      width: 300px;
      fill: $snow;
    }

    @media (max-width: $mobile){
      height: $mobileHeader;
      svg{
        width: 200px;
      }
    }
  }
</style>
