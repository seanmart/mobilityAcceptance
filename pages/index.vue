<template lang="html">
  <div id="home">
    <div class="content">
      <div class="cards">
        <card
          v-for="(card, i) in cards"
          :key="i"
          :title="card.title"
          :description="card.description"
          :button="card.button"
        />
      </div>
      <div class="section">
        <h1>What is Mobility Acceptance?</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
      <div class="section rule">
        <h1>About Mobility Acceptance</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import colors from '@/assets/variables.scss'
export default {
  components: { card },
  data() {
    return {
      cards: [
        {
          title: "Autopal",
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
          button: {
            color: colors.money,
            link: "#",
            label: "Go To Autopal"
          }
        },
        {
          title: "Dealer Portal",
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
          button: {
            color: colors.water,
            link: "#",
            label: "Go To Dealer Portal"
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#home {
  min-height: 100vh;

  .content {
    animation: slide-in 1s;
    padding: 0px $unit $unit;

    .cards {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      margin: 0px 0 - $unit / 2 $unit;

      .card {
        flex: 1 1 50%;
        margin: 0px $unit / 2;
      }
    }

    .section {
      padding: $unit 0px;
      &.rule{
        border-top: 1px solid rgba($charcoal,.2);
      }
    }
  }
  @media (max-width: $mobile){
    .content{
      padding: 0px $mobileUnit $mobileUnit;
      .cards{
        flex-direction: column;
        align-items:stretch;
        margin: 0px;

        .card{
          margin: $mobileUnit / 2 0px;
        }
      }
      .section{
        padding: $unit * 2 0;
      }
    }
  }
}

@keyframes slide-in{
  0%{
    transform: translateY(100%);
    opacity: 0
  }
  100%{
    transform: translateY(0%);
    opacity: 1
  }
}
</style>
