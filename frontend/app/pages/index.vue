<script setup>

import { DESTINATIONS_API_URL } from '~/utils';

const destinations = ref([]);

const fetchDestinations = async () => {
  try {
    const response = await fetch(DESTINATIONS_API_URL);
    if (response.ok) {
      const json = await response.json();
      destinations.value = json.data;
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
};

onMounted(() => {
  fetchDestinations();
});

</script>

<template>
  <div>
    <ul class="destinations-list">
      <li v-for="destination in destinations" :key="destination.id">
        <NuxtLink :to="`/destination/${destination.documentId}`">
          <img v-if="destination.image" :src="destination.image.url" :alt="destination.name" width="300" height="200" />
          <h3>{{ destination.name }}</h3>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.destinations-list {
  list-style: none;
  padding: 0;
}

</style>
