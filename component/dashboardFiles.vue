<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CListGroup, CListGroupItem } from "@coreui/vue/dist/esm/components/list-group";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewFilePopup from "~/component/ViewFilePopup.vue";

let { $axios } = useNuxtApp();
const api = $axios();

interface File {
  id: string;
  fileName: string;
  fileSize: string;
  date: string;
  urlLink: string;
  button: boolean;
}

const files = ref<File[]>([]);

const fetchFiles = async () => {
  try {
    const response = await api.get("https://671f40e7e7a5792f052d8a2f.mockapi.io/Files");
    files.value = response.data.map((file: any) => ({
      ...file,
      date: new Date(file.date).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};
const selectedFile = ref<File | null>(null);
const isPopupVisible = ref(false);

const handleAction = (action: string, fileId: string) => {
  if (action === "Delete") {
    deleteFile(fileId);
  } else if (action === "View") {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      selectedFile.value = file;
      isPopupVisible.value = true; // Show popup on View action
    }
  } else if (action === "Update") {
    console.log(`Update file with ID: ${fileId}`);
  }
};

const deleteFile = async (fileId: string) => {
  try {
    await api.delete(`https://671f40e7e7a5792f052d8a2f.mockapi.io/Files/${fileId}`);
    files.value = files.value.filter(file => file.id !== fileId);
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const closePopup = () => {
  isPopupVisible.value = false; // Close the popup
  selectedFile.value = null; // Clear the selected file
};

onMounted(fetchFiles);
</script>

<template>
  <div class="dashboard-sec">
    <div class="container">
      <CListGroup>
        <CListGroupItem>
          <div class="header-colum-container">
            <div class="file-name">
              <span class="icon"><UIcon name="mdi-file" /></span>
              <span class="label"> File Name</span>
            </div>
            <div>File Size</div>
            <div>Link</div>
            <div>Date</div>
            <div>Action</div>
          </div>
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
            <ViewFilePopup :visible="isPopupVisible" :file="selectedFile" @cancel="closePopup" />
          </div>
        </CListGroupItem>
      </CListGroup>
    </div>
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
.colum-container .file-name .icon{
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
