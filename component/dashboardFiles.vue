<script setup lang="ts">
import {onMounted, ref} from "vue";
import {CListGroup, CListGroupItem} from "@coreui/vue/dist/esm/components/list-group";
import "bootstrap/dist/css/bootstrap.min.css";
import AddFilePopup from "~/component/AddFilePopup.vue";
import DeleteFilePopup from "~/component/DeleteFilePopup.vue";
import UpdateFilePopup from "~/component/UpdateFilePopup.vue";
import ViewFilePopup from "~/component/ViewFilePopup.vue";

let {$axios} = useNuxtApp();
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
    console.log(response.data);
    files.value = response.data.map((file: any) => ({
      ...file,
      date: new Date(file.date).toLocaleDateString(),
    }));
    dropdownStates.value = files.value.map(() => false);
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

onMounted(fetchFiles);

const dropdownStates = ref<boolean[]>([]);

const showAddFileModal = ref(false);
const showDeleteConfirm = ref(false);
const showUpdateFileModal = ref(false);
const showViewFileModal = ref(false);

const currentFileIndex = ref<number | null>(null);
const fileToUpdate = ref<any>(null);
const fileToView = ref<any>(null);

const addFile = async (newFile: any) => {
  try {
    const response = await api.post('/files', newFile);
    files.value.push(response.data);
    showAddFileModal.value = false;
  } catch (error) {
    console.error('Error adding file:', error);
  }
};


const openAddFileModal = () => {
  showAddFileModal.value = true;
};

const cancelAddFile = () => {
  showAddFileModal.value = false;
};

const handleAction = (action: string, index: number) => {
  const file = files.value[index];
  if (action === "Add File") {
    openAddFileModal();
  } else if (action === "Delete File") {
    currentFileIndex.value = index;
    showDeleteConfirm.value = true;
  } else if (action === "Update File") {
    fileToUpdate.value = {...file};
    showUpdateFileModal.value = true;
  } else if (action === "View File") {
    fileToView.value = {...file};
    showViewFileModal.value = true;
  }
};

const deleteFile = async () => {
  if (currentFileIndex.value !== null) {
    try {
      const fileId = files.value[currentFileIndex.value].id;
      await api.delete(`/files/${fileId}`);
      files.value.splice(currentFileIndex.value, 1);
      dropdownStates.value.splice(currentFileIndex.value, 1);
      showDeleteConfirm.value = false;
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
};

const updateFile = async (updatedFile: any) => {
  if (fileToUpdate.value) {
    const index = files.value.findIndex((file) => file.id === fileToUpdate.value.id);
    if (index !== -1) {
      try {
        const response = await api.put(`/files/${fileToUpdate.value.id}`, updatedFile);
        files.value[index] = {...response.data};
        showUpdateFileModal.value = false;
      } catch (error) {
        console.error("Error updating file:", error);
      }
    }
  }
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
            <div class="file-name">
              <span class="icon"><UIcon name="mdi-file"/></span>
              <span class="label"> File Name</span>
            </div>
            <div>File Size</div>
            <div>Link</div>
            <div>Date</div>
            <div class="dropdown-container">
              <button class="extend">button</button>
            </div>
          </div>
          <div
              class="colum-container"
              v-for="(file, index) in files"
              :key="file.id"
          >
            <div class="file-name">
              <span class="icon"><UIcon name="mdi-file"/></span>
              <span class="label">{{ file.fileName }}</span>
            </div>
            <div>{{ file.fileSize }} GB</div>
            <div><a :href="file.urlLink" target="_blank">File</a></div>
            <div>{{ file.date }}</div>
            <div class="dropdown-container">
              <button class="extend-btn">Extend</button>
              <ul class="dropdown-list">
                <li @click="handleAction('Add File',index)">Add File</li>
                <li @click="handleAction('Delete File' ,index)">Delete File</li>
                <li @click="handleAction('Update File' ,index)">Update File</li>
                <li @click="handleAction('View File',index )">View File</li>
              </ul>
            </div>
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

.header-colum-container .file-name,
.colum-container .file-name {
  flex: 20%;
}

.header-colum-container .icon {
  margin-right: 1rem;
  color: var(--font-color);
}

.colum-container .icon {
  margin-right: 1rem;
  color: var(--main-color);
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

.extend {
  padding: .2rem;
  background-color: transparent;
  border: none;
  border-radius: .5rem 0;
  cursor: pointer;
  outline: none;
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

.dropdown-container {
  position: relative;
  display: inline-block;
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

.dropdown-container:hover .dropdown-list {
  display: block;
}

.dropdown-list {
  position: absolute;
  top: 99%;
  left: 0;
  display: none;
  margin-top: .2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  list-style: none;
  padding: 0;
  width: 10rem;
  z-index: 1000;

}

.dropdown-list li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}

.dropdown-list li:hover {
  background-color: var(--font-hovor-color);
}
</style>
