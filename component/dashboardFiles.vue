<script setup lang="ts">
import {ref} from "vue";
import {CListGroup, CListGroupItem} from "@coreui/vue/dist/esm/components/list-group";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFilePopup from "~/component/AddFilePopup.vue";
import DeleteFilePopup from "~/component/DeleteFilePopup.vue";
import UpdateFilePopup from "~/component/UpdateFilePopup.vue";
import ViewFilePopup from "~/component/ViewFilePopup.vue";

const files = ref([
  {
    fileName: "Report 2024",
    filesize: "1.2 MB",
    date: "2024-11-20",
    urlLink: "https://example.com/report2024",
    button: "Extend",
    color: "#EEEEEE",
  },
  {
    fileName: "Invoice 3321",
    filesize: "500 KB",
    date: "2024-10-15",
    urlLink: "https://example.com/invoice3321",
    button: "Extend",
    color: "#EEEEEE",
  },
  {
    fileName: "Presentation Q4",
    filesize: "3.5 MB",
    date: "2024-11-01",
    urlLink: "https://example.com/presentationQ4",
    button: "Extend",
    color: "#EEEEEE",
  },
]);

const dropdownStates = ref(files.value.map(() => false));

const toggleDropdown = (index: number) => {
  dropdownStates.value = dropdownStates.value.map((state, i) =>
      i === index ? !state : false
  );
};

const showDeleteConfirm = ref(false);
const currentFileIndex = ref<number | null>(null);
const showAddFileModal = ref(false);
const showUpdateFileModal = ref(false);
const fileToUpdate = ref<any>(null);
const showViewFileModal = ref(false);
const fileToView = ref<any>(null);

const handleAction = (action: string, index: number) => {
  const file = files.value[index];
  if (action === 'Add File') {
    showAddFileModal.value = true;
  } else if (action === "Delete File") {
    currentFileIndex.value = index;
    showDeleteConfirm.value = true;
  } else if (action === "Update File") {
    fileToUpdate.value = {...file};
    showUpdateFileModal.value = true;
  } else if (action === "View File") {
    fileToView.value = {...file};
    showViewFileModal.value = true;
  } else {
    console.log(`${action} selected for "${file.fileName}"`);
  }
};

const deleteFile = () => {
  if (currentFileIndex.value !== null) {
    files.value.splice(currentFileIndex.value, 1);
    dropdownStates.value.splice(currentFileIndex.value, 1);
    console.log("File deleted successfully.");
  }
  showDeleteConfirm.value = false;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
};

const addFile = (newFile: {
  fileName: string;
  filesize: string;
  date: string;
  urlLink: string;
  button: string;
  color: string;
}) => {
  files.value.push(newFile);
  showAddFileModal.value = false;
};

const cancelAddFile = () => {
  showAddFileModal.value = false;
};

const updateFile = (updatedFile: {
  fileName: string;
  filesize: string;
  date: string;
  urlLink: string;
  button: string;
  color: string;
}) => {
  if (fileToUpdate.value) {
    const index = files.value.findIndex(file => file === fileToUpdate.value);
    if (index !== -1) {
      files.value[index] = {...updatedFile}; // Update the file in the array
      console.log("File updated successfully.");
    }
  }
  showUpdateFileModal.value = false;
};

const cancelUpdateFile = () => {
  showUpdateFileModal.value = false;
};

const cancelViewFile = () => {
  showViewFileModal.value = false;
};
</script>

<template>
  <div class="dashboard-sec">
    <div class="container">
      <CListGroup>
        <CListGroupItem>
          <div class="header-colum-container">
            <div class="icon">
              <span><UIcon name="mdi-file"/></span>
            </div>
            <div class="file-name">File Name</div>
            <div>File Size</div>
            <div>Link</div>
            <div>Date</div>
            <button>button</button>
          </div>
          <div
              class="colum-container"
              v-for="(file, index) in files"
              :key="index"
              :style="{ backgroundColor: file.color }"
          >
            <div>
              <span class="icon"><UIcon name="mdi-file"/></span>
            </div>
            <div class="file-name">{{ file.fileName }}</div>
            <div><a :href="file.urlLink">File</a></div>
            <div>{{ file.filesize }}</div>
            <div>{{ file.date }}</div>

            <button @click="toggleDropdown(index)" class="extend-btn">{{ file.button }}</button>

            <ul v-show="dropdownStates[index]" class="dropdown-list">
              <li @click="handleAction('Add File', index)">Add File</li>
              <li @click="handleAction('Delete File', index)">Delete File</li>
              <li @click="handleAction('Update File', index)">Update File</li>
              <li @click="handleAction('View File', index)">View File</li>
            </ul>
          </div>
        </CListGroupItem>
      </CListGroup>
    </div>

    <DeleteFilePopup
        :visible="showDeleteConfirm"
        @confirm="deleteFile"
        @cancel="cancelDelete"
    />

    <AddFilePopup
        :visible="showAddFileModal"
        @addFile="addFile"
        @cancel="cancelAddFile"
    />

    <UpdateFilePopup
        :visible="showUpdateFileModal"
        :file="fileToUpdate"
        @updateFile="updateFile"
        @cancel="cancelUpdateFile"
    />

    <ViewFilePopup
        :visible="showViewFileModal"
        :file="fileToView"
        @cancel="cancelViewFile"
    />
  </div>
</template>

<style scoped>

.dashboard-sec {
  display: flex;
  background-color: #dddddd;
  min-height: 100vh;
}

.container {
  width: 80%;
  margin: 7rem auto;
  font-size: 1.2rem;
}

.colum-container,
.header-colum-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: .5rem;
  margin-bottom: .5rem;
  border-radius: .2rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.colum-container div,
.header-colum-container div {
  flex: 10%;
  text-align: start;
  margin: 0 1rem;
}

.icon {
  flex: 5%;
  color: var(--main-color);
}

.header-colum-container .file-name,
.colum-container .file-name {
  flex: 20%;
}


.header-colum-container .icon {
  flex: 5%;
  color: var(--font-color);
}


.header-colum-container {
  background-color: var(--main-hovor-color);
  color: var(--font-color);
}

div > a {
  text-decoration: none;
  cursor: pointer;
  color: var(--font-color);
}

.extend-btn {
  padding: .2rem;
  background-color: var(--main-color);
  color: var(--font-hovor-color);
  border: none;
  border-radius: .5rem 0;
  cursor: pointer;
  outline: none;
}

.extend-btn:hover {
  background-color: var(--font-hovor-color);
  color: var(--main-color);
  transition: .4s ease-in-out;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: .5rem;
  list-style: none;
  padding: 0;
  width: 10rem;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  padding: .5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: transparent;
}

.dropdown-list li:hover {
  background-color: #f1f1f1;
  transition: .3s ease-in-out;
}
</style>
