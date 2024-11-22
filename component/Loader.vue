
<template>
  <div class="d-flex justify-content-center align-items-center" v-if="isLoading">
    <div class="spinner-border text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
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
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
