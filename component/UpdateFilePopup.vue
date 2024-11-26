<script setup lang="ts">
import {defineEmits, defineProps, reactive, ref, watch} from "vue";

interface File {
  id?: string;
  fileName?: string;
  fileSize?: string;
  date?: string;
  urlLink?: string;
  button?: boolean;
  [key: string]: any;
}

const props = defineProps<{
  visible: Boolean;
  file: File | null;
}>();

const emit = defineEmits(["updateFile", "cancel"]);

const updatedFile = reactive<File>({
  id: props.file?.id || "",
  fileName: props.file?.fileName || "",
  fileSize: props.file?.fileSize || "",
  date: props.file?.date || "",
  urlLink: props.file?.urlLink || "",
});

watch(() => props.file, (newFile) => {
  if (newFile) {
    updatedFile.id = newFile.id || "";
    updatedFile.fileName = newFile.fileName || "";
    updatedFile.fileSize = newFile.fileSize || "";
    updatedFile.date = newFile.date || "";
    updatedFile.urlLink = newFile.urlLink || "";
  }
}, { immediate: true });

interface Toast {
  message: string;
  type: string;
  duration: number;
}
const toasts = ref<Toast[]>([]);
const addToast = (message: string, type = 'success', duration = 2000) => {
  toasts.value.push({ message, type, duration });
};


const handleUpdateFile = () => {
  if (updatedFile.id && updatedFile.id.trim()) {
    emit("updateFile", updatedFile);
    addToast(`File ${updatedFile.fileName} updated successfully.`, "success");
  } else {
    emit("cancel");
  }
};

const cancel = () => {
  emit("cancel");
};

const fileDetails = [
  { label: "File Name", key: "fileName" },
  { label: "File Size", key: "fileSize" },
  { label: "Date", key: "date" },
  { label: "File URL", key: "urlLink" },
];
</script>

<template>
  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">Update File</h5>
          <button type="button" class="btn-close" @click="cancel"></button>
        </div>
        <hr class="divider">
        <div class="popup-body">
          <div class="file-detail" v-for="(detail, index) in fileDetails" :key="index">
            <label class="file-label">{{ detail.label }}:</label>
            <div class="file-input">
              <input
                  v-model="updatedFile[detail.key]"
                  :placeholder="props.file?.[detail.key] || 'Enter ' + detail.label"
                  :type="detail.key === 'urlLink' ? 'url' : 'text'"
              />
              <div v-if="detail.key === 'urlLink' && updatedFile[detail.key]">
                <a :href="updatedFile[detail.key]" target="_blank" rel="noopener noreferrer">Open Link</a>
              </div>
            </div>
          </div>
        </div>
        <div class="popup-footer">
          <button @click="handleUpdateFile" class="update-btn">Update</button>
          <button @click="cancel" class="cancel-btn">Cancel</button>
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
  background: rgba(0, 0, 0, 0.9);
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
  max-width: 550px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
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

.divider{
  border:1px solid var(--main-hovor-color) ;
}

.popup-body {
  padding: 1rem;
  font-size: 1rem;
  color: var(--main-color) !important;
}

.popup-body .file-detail{
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: start;
  width: 90%;
  margin: 0 auto .5rem auto;
  background-color: var(--font-color);
}

.popup-body .file-detail label{
  min-width: 100px;
}

.popup-body .file-detail,
.popup-body .file-input{
  font-size: 1rem;
  text-align: start;
  color: var(--main-color);
  background-color:transparent;
  padding: .2rem;
}

.popup-body div .file-detail{
  min-width: 200px;
  padding: .2rem;
}

.file-detail .file-input{
  flex: 1 1 70%;
}

.popup-body div input {
  width: 100%;
  outline: none;
  margin: 0 auto;
  border: 1px solid var(--font-hovor-color);
  padding: .2rem;
}

.popup-footer {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: -1rem auto 0 auto;
}

.popup-footer button {
  display: inline-block;
  margin: 1rem;
  padding: 0.3rem;
  outline: none;
  border-radius: .2rem;
  background-color: var(--main-hovor-color);
  color: var(--font-color);
}

.update-btn:hover {
  background-color: var(--button-color);
  transition: background-color .3s ease-in-out;
}

.cancel-btn:hover {
  background-color: red;
  transition: background-color .3s ease-in-out;
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
