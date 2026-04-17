<script setup>

import { STRAPI_BASE_URL } from '~/utils';

const route = useRoute();
const destination = ref(null);

const fetchDestination = async () => {
  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/destinations/${route.params.id}?populate=*`
    );
    if (response.ok) {
      const json = await response.json();
      destination.value = json.data;
    }
  } catch (error) {
    console.error('Error fetching destination:', error);
  }
};

onMounted(() => {
  fetchDestination();
});

</script>

<template>
  <div v-if="destination">
    <img
      v-if="destination.image"
      :src="destination.image.url"
      :alt="destination.name"
      width="600"
      height="400"
    />
    <h1>{{ destination.name }}</h1>
    <p><strong>ID:</strong> {{ destination.id }}</p>
    <p><strong>Description:</strong> {{ destination.description }}</p>
    <p><strong>Have Visited:</strong> {{ destination.haveVisited ? 'Yes' : 'No' }}</p>
    <p><strong>Rating:</strong> {{ destination.rating }}/10</p>
    <NuxtLink to="/">← Back to all destinations</NuxtLink>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
