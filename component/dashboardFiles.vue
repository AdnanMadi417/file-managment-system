<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CListGroup, CListGroupItem } from "@coreui/vue/dist/esm/components/list-group";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewFilePopup from "~/component/ViewFilePopup.vue";
import UpdateFilePopup from "~/component/UpdateFilePopup.vue";
import AddFilePopup from "~/component/AddFilePopup.vue";
import Loader from "~/component/Loader.vue";
let { $axios } = useNuxtApp();
import Toast from './Toast.vue';


const api = $axios();

interface Toast {
  message: string;
  type: string;
  duration: number;
}

interface File {
  id: string;
  fileName: string;
  fileSize: string;
  date: string;
  urlLink: string;
  button: boolean;
}

const files = ref<File[]>([]);
const selectedFile = ref<File | null>(null);
const isViewFilePopupVisible = ref(false);
const isUpdateFilePopupVisible = ref(false);
const isAddFilePopupVisible = ref(false);
const isLoading = ref(false);  // Add loading state

const fetchFiles = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("https://671f40e7e7a5792f052d8a2f.mockapi.io/Files");
    files.value = response.data.map((file: any) => ({
      ...file,
      date: new Date(file.date).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
  } finally {
    isLoading.value = false;
  }
};
const toasts = ref<Toast[]>([]);

const showAddFilePopup = () => {
  isAddFilePopupVisible.value = true;
};

const addToast = (message: string, type = 'success', duration = 2000) => {
  toasts.value.push({ message, type, duration });
};

const handleAddFile = (newFile: File) => {
  files.value.push({
    ...newFile,
    id: Date.now().toString(),
  });
  isAddFilePopupVisible.value = false;
};

const handleAction = (action: string, fileId: string) => {
  if (action === "Delete") {
    deleteFile(fileId);
  } else if (action === "View") {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      selectedFile.value = file;
      isViewFilePopupVisible.value = true;

    }
  } else if (action === "Update") {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      selectedFile.value = { ...file };
      isUpdateFilePopupVisible.value = true;
    }
    }
};

const deleteFile = async (fileId: string) => {
  try {
    await api.delete(`https://671f40e7e7a5792f052d8a2f.mockapi.io/Files/${fileId}`);
    files.value = files.value.filter(file => file.id !== fileId);
    addToast(`File with ID ${fileId} deleted successfully.`, "success");
    console.log(`${fileId}`)
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error) {
    addToast("Failed to delete file. Please try again.", "error");
    console.error("Error deleting file:", error);
  }
};

const handleUpdateFile = (updatedFile: File) => {
  if (updatedFile && updatedFile.id) {
    const index = files.value.findIndex(f => f.id === updatedFile.id);
    if (index !== -1) {
      files.value[index] = updatedFile;
    }
    console.log("Updated file in dashboard:", updatedFile);
    isUpdateFilePopupVisible.value = false;
  } else {
    console.error("Updated file is invalid or missing 'id'");
  }
};

const closePopup = () => {
  isViewFilePopupVisible.value = false;
  isUpdateFilePopupVisible.value = false;
  isAddFilePopupVisible.value = false;
  selectedFile.value = null;
};

onMounted(fetchFiles);

defineExpose({ addToast });

</script>

<template>
  <div class="dashboard-sec">
    <div class="container">
      <CListGroup>
        <CListGroupItem>
          <div class="header-colum-container">
            <div class="file-name">
              <span class="icon"><UIcon name="mdi-file" /></span>
              <span class="label">File Name</span>
            </div>
            <div>File Size</div>
            <div>Link</div>
            <div>Date</div>
            <div>
              <button @click="showAddFilePopup">Add File</button>
            </div>
          </div>

          <Loader :isLoading="isLoading" />


          <div
              class="colum-container"
              v-for="file in files"
              :key="file.id"
          >
            <div class="file-name">
              <span class="icon"><UIcon name="mdi-file" /></span>
              <span class="label">{{ file.fileName }}</span>
            </div>
            <div>{{ file.fileSize }} GB</div>
            <div><a :href="file.urlLink" target="_blank">File</a></div>
            <div>{{ file.date }}</div>
            <div class="action-container">
              <div class="dropdown-container">
                <button class="extend-btn">Extend</button>
                <ul class="dropdown-list">
                  <li @click="handleAction('Delete', file.id)">Delete</li>
                  <li @click="handleAction('View', file.id)">View</li>
                  <li @click="handleAction('Update', file.id)">Update</li>
                </ul>
              </div>
            </div>
          </div>
        </CListGroupItem>
      </CListGroup>
    </div>
    <Toast
        v-for="(toast, index) in toasts"
        :key="index"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @remove="toasts.splice(index, 1)"
    />

  </div>
  <AddFilePopup :visible="isAddFilePopupVisible" @addFile="handleAddFile" @cancel="closePopup" />
  <ViewFilePopup :visible="isViewFilePopupVisible" :file="selectedFile" @cancel="closePopup" />
  <UpdateFilePopup :visible="isUpdateFilePopupVisible" :file="selectedFile" @updateFile="handleUpdateFile" @cancel="closePopup" />
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
  font-size: 1.2rem !important;
}

.colum-container,
.header-colum-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.2rem;
  background-color: var(--font-hovor-color);
}

.colum-container div,
.header-colum-container div {
  flex: 1 1 10%;
  text-align: start;
  margin: 0 1rem;
}

.header-colum-container .file-name,
.colum-container .file-name {
  flex: 2 1 20%;
}

@media (max-width: 1200px) {
  .container {
    width: 90%;
  }

  .colum-container,
  .header-colum-container {
    flex-direction: column;
    align-items: stretch;
  }

  .colum-container div,
  .header-colum-container div {
    flex: 1 1 100%;
    margin: 0.5rem 0;
  }

  .header-colum-container .file-name,
  .colum-container .file-name {
    flex: 1 1 100%;
  }
}

.header-colum-container .file-name .icon,
.colum-container .file-name .icon {
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .colum-container div,
  .header-colum-container div {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
}

.header-colum-container {
  background-color: var(--main-hovor-color);
  color: var(--font-color);
}

div > a {
  text-decoration: none;
  cursor: pointer;
  color: var(--main-color);
}

.extend-btn {
  padding: 0.5rem 1rem;
  background-color: var(--main-color);
  color: var(--font-hovor-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.extend-btn:hover {
  background-color: var(--font-hovor-color);
  color: var(--main-color);
}


.dropdown-container {
  position: relative;
}

.dropdown-list {
  display: none;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: .5rem 1rem;
  border-radius: 5px;
  z-index: 1000;
  min-width: 120px;
}

.dropdown-container:hover .dropdown-list {
  display: block;
  margin: -.5rem 1rem 0 1rem;
}


.dropdown-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.dropdown-list li:last-child {
  border-bottom: none;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}

</style>
