<script setup>

import { STRAPI_BASE_URL } from '~/utils';

const route = useRoute();
const review = ref(null);

const fetchReview = async () => {
  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/reviews/${route.params.id}?populate=*`
    );
    if (response.ok) {
      const json = await response.json();
      review.value = json.data;
    }
  } catch (error) {
    console.error('Error fetching review:', error);
  }
};

const renderBlocks = (blocks) => {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        const text = block.children.map((child) => child.text).join('');
        return `<p class="mb-4">${text}</p>`;
      }
      if (block.type === 'heading') {
        const text = block.children.map((child) => child.text).join('');
        const level = block.level || 2;
        return `<h${level} class="text-xl font-bold mb-2">${text}</h${level}>`;
      }
      return '';
    })
    .join('');
};

onMounted(() => {
  fetchReview();
});

</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div v-if="review">
      <div class="relative rounded-2xl overflow-hidden mb-8 group">
        <img
          v-if="review.image"
          :src="review.image.url"
          :alt="review.title"
          class="w-full max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
        />

      </div>

      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-blue-400">{{ review.title }}</h1>

      <div class="flex flex-wrap gap-2 mb-6">
        <span v-if="review.director" class="bg-white/[0.03] text-gray-300 px-4 py-1.5 rounded-full text-sm border border-white/10">Directed by {{ review.director }}</span>
        <span v-if="review.genre" class="bg-white/[0.03] text-gray-300 px-4 py-1.5 rounded-full text-sm border border-white/10">{{ review.genre }}</span>
        <span v-if="review.releaseYear" class="bg-white/[0.03] text-gray-300 px-4 py-1.5 rounded-full text-sm border border-white/10">{{ review.releaseYear }}</span>
      </div>

      <div class="text-2xl font-bold text-blue-400 mb-8">Rating: {{ review.rating }}/10</div>

      <div class="text-lg leading-relaxed text-gray-400 prose-invert" v-html="renderBlocks(review.body)"></div>

      <NuxtLink to="/" class="inline-flex items-center gap-2 mt-10 text-blue-400 font-medium hover:text-blue-300 transition-colors duration-200 group/link">
        <span class="transition-transform duration-200 group-hover/link:-translate-x-1">&larr;</span>
        See all reviews
      </NuxtLink>
    </div>

    <div v-else class="text-center py-20">
      <div class="inline-flex flex-col items-center gap-4">
        <div class="skeleton w-full max-w-lg h-64 rounded-2xl"></div>
        <div class="skeleton h-8 w-48"></div>
        <div class="skeleton h-4 w-32"></div>
      </div>
    </div>
  </div>
</template>
