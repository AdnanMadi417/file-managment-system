<template>
  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">Confirm Deletion</h5>
          <button type="button" class="btn-close" @click="cancel" aria-label="Close"></button>
        </div>
        <div class="popup-body">
          <p>Are you sure you want to delete this file?</p>
        </div>
        <div class="popup-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
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
  font-size: 1.25rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.popup-body {
  padding: 1rem;
  font-size: 1rem;
  color: #495057;
}

.popup-footer {
  padding: 1rem;
  border-top: 3px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
