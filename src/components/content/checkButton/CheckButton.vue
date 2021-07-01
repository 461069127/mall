<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .check-button img{
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .checked{
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>