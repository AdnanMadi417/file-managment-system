<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

type FormData = {
  fileName: string;
  fileSize: string;
  fileDate: string;
  fileLink: string;
};

const questions = [
  { label: "File Name", type: 'text', placeholder: "Enter file name", required: true },
  { label: "File Size", type: 'text', placeholder: "Enter file size", required: true },
  { label: "Date", type: 'date', placeholder: "Enter file date", required: true },
  { label: "File URL", type: 'text', placeholder: "Enter file url", required: true },
];

defineProps({
  visible: Boolean,
});

const emit = defineEmits(['addFile', 'cancel']);

const formData = ref<FormData>({
  fileName: '',
  fileSize: '',
  fileDate: '',
  fileLink: '',
});

const mapLabelToKey = (label: string): keyof FormData => {
  switch (label) {
    case "File Name":
      return "fileName";
    case "File Size":
      return "fileSize";
    case "Date":
      return "fileDate";
    case "File URL":
      return "fileLink";
    default:
      throw new Error(`Unknown label: ${label}`);
  }
};

const submitForm = () => {
  const { fileName, fileSize, fileDate, fileLink } = formData.value;


  if (fileName && fileSize && fileDate) {
    emit('addFile', {
      fileName,
      fileSize,
      date: fileDate,
      urlLink: fileLink || '',
    });
    Object.keys(formData.value).forEach(key => (formData.value[key as keyof FormData] = ''));
  } else {
    console.log('Please fill all required fields!');
  }
};

const cancel = () => emit('cancel');

</script>


<template>
  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">Add New File</h5>
          <span type="button" class="btn-cancel" @click="cancel">
            <UIcon name="fontisto-close" />
          </span>
        </div>
        <div class="popup-body">
          <form @submit.prevent="submitForm">
            <div class="form-control" v-for="(question, index) in questions" :key="index">
              <label class="form-label">{{ question.label }}</label>
              <input
                  v-model="formData[mapLabelToKey(question.label)]"
                  :type="question.type"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  :required="question.required"
              />

            </div>
          </form>
        </div>
        <div class="popup-footer">
          <button type="submit" class="btn-submit" @click="submitForm">Upload</button>
          <button type="button" class="btn-cancel" @click="cancel">Close</button>
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  align-items: center;
  color: var(--main-color);
  font-size: 1.25rem;
}

.btn-cancel {
  cursor: pointer;
}

.popup-body {
  padding: 1rem;
  font-size: 1rem;
  color: var(--main-color);
}

.form-control {
  width: 90%;
  margin: 1rem auto;
  border: 2px solid #EEEEEE;
  font-size: 1rem !important;
}

.form-control > label {
  margin: 0 1rem;
  min-width: 100px;
  max-width: 100px;
}

.form-control input {
  background-color: #EEEEEE;
  width: calc(100% - (100px + 2rem));
  padding: .5rem;
  outline: none;
}

.popup-footer {
  width: calc(100% - 70px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 3px solid #e9ecef;
  gap: 0.5rem;
}

.popup-footer button{
  background-color: var(--main-color);
  color: var(--font-hovor-color);
  cursor: pointer;
  border-radius: .5rem;
  min-width: 90px ;
}

.btn-submit {
  background-color: var(--main-color);
  padding: .5rem;
  font-size: 1rem !important;
}

.btn-submit:hover {
  background-color: var(--button-color);
  transition: .3s ease-in-out;
}

.btn-cancel:hover {
  background-color: red;
  color: var(--font-hovor-color);
  transition: .3s ease-in-out;
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

  .popup-body {
    padding: 0.8rem;
  }
}

</style>
