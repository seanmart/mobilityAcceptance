<template lang="html">
  <header>
    <div class="content">
      <logo/>
    </div>
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
    height: $unit * 5;
    .content{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      color: white;

      svg{
        flex: 0 0 auto;
        width: 350px;
        fill: $snow;
      }
    }
    @media (max-width: $mobile){
      .content{
        svg{
          width: 60vw;
        }
      }
    }
  }
</style>
