<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const fileDetails = [
  { label: "File Name", key: "fileName" },
  { label: "File Size", key: "fileSize" },
  { label: "Date", key: "date" },
  { label: "File URL", key: "urlLink" },
];

const props = defineProps({
  visible: Boolean,
  file: Object,
});

const emit = defineEmits(["cancel"]);

const cancel = () => {
  console.log("Popup closed");
  emit("cancel");
};
</script>

<template>

  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">View File</h5>
          <button type="button" class="btn-close" @click="cancel"></button>
        </div>
        <div class="popup-body">
          <div v-for="(detail, index) in fileDetails" :key="index">
            <h3>{{ detail.label }}:</h3>
            <h3 v-if="detail.key !== 'urlLink'">{{ props.file?.[detail.key] || 'N/A' }}</h3>
            <h3 v-else>
              <a :href="props.file?.[detail.key]" target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  padding: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.23);
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

.popup-body div {
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 90%;
  margin: 0 auto;
}

div > h3 {
  flex: 30%;
  font-size: 1.1rem;
  text-align: start;
  padding: 0.5rem;
  background-color: var(--font-color);
  color: var(--main-color);
}

@media (max-width: 768px) {
  .popup-content {
    width: 95%;
  }

  .popup-header {
    display: flex;
    margin: 1rem;
  }

  .popup-title {
    font-size: 1.2rem;
  }

  .popup-body div {
    flex-direction: row;
    width: 100%;
  }

  div > h3 {
    flex: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    text-align: start;
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
