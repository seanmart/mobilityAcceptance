<template lang="html">
  <div class="card">
    <div class="text">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <a :href="button.link">{{ button.label }}</a>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
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

  .text{
    padding: $unit;
    flex: 1 1 auto;

    h1{
      font-weight: normal;
      color: $charcoal;
      font-size: 25px;
      margin-bottom: $unit / 2;
    }

    p{
      margin-bottom: $unit / 2;
    }
  }

  a{
    flex: 0 0 auto;
    padding: $unit / 2 0px;
    background: green;
    text-decoration: none;
    color: $snow;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 16px;
    font-weight: bold;
  }

  @media (max-width: $mobile){
    border-radius: 5px;
    min-height: $unit * 4;
    .text{
      padding: $mobileUnit;
    }
  }
}
</style>
