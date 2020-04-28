<template lang="html">
  <footer>
    <div class="content">
      <img src="cigarbreak.svg"/>
      <p v-html="data.footer.text"/>
      <p class="copyright">© {{new Date().getFullYear()}} Cigar Break Asset Management</p>
    </div>
  </footer>
</template>

<script>
import data from '@/assets/data'
export default {
  data(){return{data}}
};
</script>

<style lang="scss">
footer {
  background: $silverShade;
  padding: $unit * 2 $unit;

  .content{
    img{
      display: block;
      width: 150px;
      margin: 0px auto 30px;
    }

    p{
      color: $snow;
      opacity: .7;
      text-align: center;
      font-family: 'Roboto', sans-serif;

    }
  }

  @media (max-width: $mobile){
    padding: $mobileUnit * 2 $mobileUnit;

    .copyright{
      margin-top: 30px;
    }
  }
}
</style>
