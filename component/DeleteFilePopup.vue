<template>
  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">Confirm Deletion</h5>
          <button type="button" class="btn-close" @click="cancel"></button>
        </div>
        <div class="popup-body">
          <p>Are you sure you want to delete this file?</p>
        </div>
        <div class="popup-footer">
          <button type="button" class="btn-cancel" @click="cancel">Cancel</button>
          <button type="button" class="btn-confirm" @click="confirm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};

</script>

<style scoped>
.popup-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  width: 80%;
  max-width: 450px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-title {
  margin: 0;
  font-size: 1.4rem;
  color: var(--main-color);
}

.btn-close {
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: transparent;
  color: var(--main-color);
}

.btn-close:hover {
  color: red;
}

.popup-body {
  padding: 1rem;
  font-size: 1rem;
  color: #495057;
}

.popup-footer {
  padding: 1rem;
  border-top: 3px solid var(--main-color);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.popup-footer button {
  border: none;
  font-size: 1.2rem;
  margin: 0 1rem;
  color: var(--font-color);
  padding: .2rem .5rem;
  border-radius: 0.2rem;
}

.popup-footer .btn-cancel,
.popup-footer .btn-confirm {
  background-color: var(--main-color);
  color: var(--font-color);
}

.popup-footer .btn-cancel:hover {
  background-color: var(--button-color);
  transition: .3s ease-in-out;
}

.popup-footer .btn-confirm:hover {
  background-color: red;
  transition: .3s ease-in-out;
}

@media (max-width: 1200px) {
  .popup-footer {
    display: flex;
    justify-content: space-between;
  }
}


@media (max-width: 768px) {
  .popup-content {
    width: 90%;
  }

  .popup-header {
    display: flex;
  }

  .popup-title {
    font-size: 1.2rem;
  }

  .popup-body div {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .popup-title {
    font-size: 1rem;
  }

  .btn-close {
    font-size: 1.2rem;
  }

  .popup-body {
    padding: 0.8rem;
  }
}

</style>
