<template>
  <div
      v-if="visible"
      :class="['toast', `toast-${type}`]"
      @click="closeToast"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
  },
  duration: {
    type: Number,
    default: 2000,
  },
});

const visible = ref(true);

const closeToast = () => {
  visible.value = false;
};

onMounted(() => {
  setTimeout(() => {
    closeToast();
  }, props.duration);
});
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: var(--font-hovor-color);
  opacity: 1;
  animation: slide-in 0.3s ease-out, fade-out 0.5s ease-out forwards;
  animation-delay: 0s, 4.5s;
  cursor: pointer;
  z-index: 1000;
  background-color: var(--main-hovor-color);

}

@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
