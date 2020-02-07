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
        <h1>what is Mobility Acceptance</h1>
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
export default {
  components: { card },
  data() {
    return {
      cards: [
        {
          title: "title 1",
          description: "description 1",
          button: {
            link: "#",
            label: "view"
          }
        },
        {
          title: "title 2",
          description: "description 2",
          button: {
            link: "#",
            label: "view 2"
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
    padding: 0px $unit $unit;

    .cards {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      margin: 0px 0 - $unit / 2 $unit;

      .card {
        flex: 1 1 auto;
      }
    }

    .section {
      padding: $unit 0px;
      &.rule{
        border-top: 1px solid rgba($charcoal,.2);
      }

      h1 {
        font-size: 25px;
        margin-bottom:$unit / 2;
        color: $abyss;
      }

      p{
        font-size: 16px;
        color: $charcoal;
        line-height: 160%;
      }
    }
  }
  @media (max-width: $mobile){
    .content{
      .cards{
        flex-direction: column;
        align-items:stretch;

        .card{
          margin-bottom: $unit;
        }
      }
    }
  }
}
</style>
