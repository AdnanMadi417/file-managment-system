
<template>
  <div class="loader-sec" v-if="isLoading">
    <div class="spinner-border container" role="status">
      <span class="visually-hidden">Loading</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
});

</script>

<style scoped>
.loader-sec {
  display: flex;
  justify-content:center;
  align-items: center;

}
.spinner-border {
  color: var(--main-hovor-color);
  width: 3rem;
  height: 3rem;
}
</style>
