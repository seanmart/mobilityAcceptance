<template lang="html">
  <div class="card">
    <div class="text">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <a :href="button.link" :class="button.color">{{ button.label }}</a>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null},
    description: { type: String, default: null },
    button: { type: Object, default: () => ({}) }
  }
};
</script>

<style lang="scss">

.card {
  background: $snow;
  min-height: $unit * 6;
  border-radius: 10px;
  box-shadow: 0px 30px 40px -20px rgba($abyss, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: $unit;

  .text{
    flex: 1 1 auto;
    margin-bottom: $unit;

  }

  a{
    flex: 0 0 auto;
    padding: $unit / 1.5 0px;
    text-decoration: none;
    color: $snow;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 15px;
    border-radius: 5px;
    transition: transform .25s, background .25s, box-shadow .25s;
    position: relative;
    overflow: hidden;

    &.green{
      background: $money;

      &:hover{
        background: saturate($money, 10%);
      }
      &:active{
        transform: translateY(1px);
      }
    }
    &.blue{
      background: $water;
      &:hover{
        background: darken(saturate($water, 10%),10%);
      }
      &:active{
        transform: translateY(1px);
      }
    }
  }

  @media (max-width: $mobile){
    border-radius: 5px;
    min-height: $unit * 4;
    padding: $mobileUnit;
    .text{
      margin-bottom: $mobileUnit;
    }
  }
}
</style>
