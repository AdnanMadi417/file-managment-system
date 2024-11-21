

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: Boolean,
  file: Object,
});

const emit = defineEmits(["updateFile", "cancel"]);

const updatedFile = ref({ ...props.file });

const handleUpdateFile = () => {
  emit("updateFile", updatedFile.value);
};

const cancelUpdateFile = () => {
  emit("cancel");
};
</script>

<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h3>Update File</h3>
      <input v-model="updatedFile.fileName" placeholder="File Name" />
      <input v-model="updatedFile.filesize" placeholder="File Size" />
      <input v-model="updatedFile.date" placeholder="Date" />
      <input v-model="updatedFile.urlLink" placeholder="File URL" />
      <input v-model="updatedFile.button" placeholder="Button" />
      <input v-model="updatedFile.color" placeholder="Color" />

      <button @click="handleUpdateFile">Update</button>
      <button @click="cancelUpdateFile">Cancel</button>
    </div>
  </div>
</template>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
