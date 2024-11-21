<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

type FormData = {
  fileName: string;
  fileSize: string;
  fileDate: string;
  fileLink: string;
}

const questions = [
  {
    label: "File Name",
    type: 'text',
    placeholder: "Enter file name",
    required: true,
  },
  {
    label: "File Size",
    type: 'text',
    placeholder: "Enter file size",
    required: true,
  },
  {
    label: "Date",
    type: 'date',
    placeholder: "Enter file date",
    required: true,
  },
  {
    label: "File URL",
    type: 'text',
    placeholder: "Enter file url",
    required: true,
  }
];

defineProps({
  visible: Boolean,
});

const emit = defineEmits(['addFile', 'cancel']);

// Strongly typed form data object
const formData = ref<FormData>({
  fileName: '',
  fileSize: '',
  fileDate: '',
  fileLink: '',
});

// Submit form
const submitForm = () => {
  const { fileName, fileSize, fileDate, fileLink } = formData.value;

  if (fileName && fileSize && fileDate) {
    emit('addFile', {
      fileName,
      fileSize,
      date: fileDate,
      urlLink: fileLink || '',
      button: 'Extend',
      color: '#EEEEEE',
    });

    // Reset form after submission
    formData.value.fileName = '';
    formData.value.fileSize = '';
    formData.value.fileDate = '';
    formData.value.fileLink = '';
  } else {
    console.log('Please fill all required fields!');
  }
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="popup-section" v-if="visible">
    <div class="container" @click.self="cancel">
      <div class="popup-content">
        <div class="popup-header">
          <h5 class="popup-title">Add New File</h5>
          <span type="button" class="btn-cancel" @click="cancel">
            <UIcon
                name="fontisto-close"
            />
          </span>
        </div>
        <div class="popup-body">
          <form @submit.prevent="submitForm">
            <div class="form-control" v-for="(question , index) in questions" :key="index">
              <label class="form-label">{{ question.label }}</label>
              <input
                  v-if="question.type === 'text' || question.type === 'file' || question.type === 'date'"
                  :type="question.type"
                  :placeholder="question.placeholder"
                  :id="question.label"
              />
            </div>
            <div>
              <button type="submit" class="btn-submit">Add File</button>
              <button type="submit" class="btn-cancel" @click="cancel">Cancel</button>
            </div>
          </form>
        </div>
        <div class="popup-footer"></div>
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


.btn-cancel:hover {
  cursor: pointer;
  color: red;
  transition: .4s ease-in-out;
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
  padding: 1rem;
  border-top: 3px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-submit {
  background-color: var(--main-color);
  padding: .5rem;
  margin: 0 1.5rem;
  font-size: 1rem !important;
  color: white;
  cursor: pointer;
  border-radius: .5rem;
}

.btn-submit:hover {
  background-color: var(--button-color);
  transition: .3s ease-in-out;
}

</style>
