<template lang="html">
  <div id="home">
    <div class="banner"/>
    <div class="content">
      <div class="cards">
        <card
          v-for="(card, i) in data.cards"
          :key="i"
          :title="card.title"
          :description="card.description"
          :button="card.button"
        />
      </div>
      <div
        v-for="(section,i) in data.sections"
        :key="i"
        :class="{rule: i > 0}"
        class="section"
      >
        <h1 v-html="section.title"/>
        <p v-html="section.text"/>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/assets/data'
import card from "@/components/card";
import colors from '@/assets/variables.scss'
export default {
  components: { card },
  data() {return {data}},
};
</script>

<style lang="scss">

@mixin bluefade{
  background: $abyss;
  background: linear-gradient(0deg,lighten($abyss,5%) 1%, $abyss 100%);
}

#home {
  min-height: 100vh;
  position: relative;
  padding: $unit;

  .banner{
    position: absolute;
    z-index: 0;
    width: 100%;
    left: 0px;
    top: 0px;
    height: $unit * 10;
    @include bluefade;
  }

  .content{
    position: relative; z-index: 1;
    .cards {
      padding-top: $header;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      margin: 0px 0 - $unit / 2 0px;

      .card {
        flex: 1 1 50%;
        margin: 0px $unit / 4;
      }
    }

    .section {
      padding: $unit * 2 0px;
      &.rule{
        border-top: 1px solid rgba($charcoal,.2);
      }
    }

  }

  @media (max-width: $mobile){
    padding: 0px;
    .banner{
      display: none;
    }

    .content{

      .cards{
        padding: $mobileHeader $mobileUnit $mobileUnit;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0px;
        @include bluefade;

        .card{
          margin: $mobileUnit / 2 0px;
          flex: 0 0 auto;

          &:last-child{
            margin-bottom: 0px;
          }
        }
      }

      .section{
        padding: $mobileUnit * 2 $mobileUnit;
      }

    }
  }
}

</style>
