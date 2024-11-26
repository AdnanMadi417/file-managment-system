<template>
  <div class="table-responsive">
    <div class="table-container">
      <h2 class="table-title">Table 1</h2>

      <table>
        <tr class="header">
          <th>Index</th>
          <th>Value</th>
        </tr>
        <tbody>
        <tr v-for="(row, index) in table1" :key="index">
          <td>{{ row.index }}</td>
          <td>{{ row.value }}</td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="table-container">
      <h2 class="table-title">Table 2</h2>
      <table>
        <tr>
          <th>Category</th>
          <th>Value</th>
        </tr>
        <tbody>
        <tr v-for="(row, index) in table2" :key="index">

          <td>{{ row.category }}</td>

          <td>{{ row.value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const table1 = ref([
  { index: "A1", value: 41 },
  { index: "A2", value: 18 },
  { index: "A3", value: 21 },
  { index: "A4", value: 63 },
  { index: "A5", value: 2 },
  { index: "A6", value: 53 },
  { index: "A7", value: 5 },
  { index: "A8", value: 57 },
  { index: "A9", value: 60 },
  { index: "A10", value: 93 },
  { index: "A11", value: 28 },
  { index: "A12", value: 3 },
  { index: "A13", value: 90 },
  { index: "A14", value: 39 },
  { index: "A15", value: 80 },
  { index: "A16", value: 88 },
  { index: "A17", value: 49 },
  { index: "A18", value: 60 },
  { index: "A19", value: 26 },
]);

const table2 = computed(() => {
  const A5 = table1.value.find(row => row.index === "A5")?.value || 0;
  const A20 = table1.value.find(row => row.index === "A19")?.value || 0;
  const A15 = table1.value.find(row => row.index === "A15")?.value || 0;
  const A7 = table1.value.find(row => row.index === "A7")?.value || 1;
  const A13 = table1.value.find(row => row.index === "A13")?.value || 0;
  const A12 = table1.value.find(row => row.index === "A12")?.value || 0;

  return [
    { category: "Alpha", value: A5 + A20 },
    { category: "Beta", value: Math.floor(A15 / A7) },
    { category: "Charlie", value: A13 * A12 },
  ];
});
</script>

<style>

.table-responsive{
  width: 80%;
  margin: 2rem auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.table-title{
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
}


th, td {
  border: 2px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #eeeeee;
}
</style>
