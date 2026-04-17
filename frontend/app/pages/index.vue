<script setup>

import { REVIEWS_API_URL } from '~/utils';

const reviews = ref([]);
const searchQuery = useState('searchQuery', () => '');
const selectedReview = ref(null);
const showModal = ref(false);

const fetchReviews = async () => {
  try {
    const response = await fetch(REVIEWS_API_URL);
    if (response.ok) {
      const json = await response.json();
      reviews.value = json.data;
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const filteredReviews = computed(() => {
  if (!searchQuery.value) return reviews.value;
  const query = searchQuery.value.toLowerCase();
  return reviews.value.filter((review) =>
    review.title?.toLowerCase().includes(query) ||
    review.director?.toLowerCase().includes(query) ||
    review.genre?.toLowerCase().includes(query)
  );
});

const openModal = (review) => {
  selectedReview.value = review;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => { selectedReview.value = null; }, 300);
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
  fetchReviews();
});

</script>

<template>
  <div>
  <!-- Hero -->
  <section class="relative border-b border-white/5 bg-gray-950 overflow-hidden">
    <div class="absolute inset-0 bg-blue-500/5"></div>

    <div class="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
      <h1 class="text-5xl md:text-7xl font-extrabold mb-6 text-blue-400 animate-float">
        GhibliCritic
      </h1>
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Your go-to spot for Studio Ghibli movie reviews. We watch them, we rate them, and we talk about what makes them so good.
      </p>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 py-12">
    <h2 class="text-4xl font-bold mb-8">All Reviews</h2>

    <!-- Skeleton loader -->
    <div v-if="!reviews.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="n in 5" :key="n" class="rounded-xl overflow-hidden border border-white/5">
        <div class="skeleton w-full h-80"></div>
        <div class="p-4 space-y-3">
          <div class="skeleton h-5 w-3/4"></div>
          <div class="skeleton h-4 w-1/2"></div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredReviews.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        v-for="review in filteredReviews"
        :key="review.id"
        @click="openModal(review)"
        class="card-glow bg-gray-900/60 rounded-xl overflow-hidden flex flex-col cursor-pointer border border-white/5 group"
      >
        <div class="relative overflow-hidden">
          <img
            v-if="review.image"
            :src="review.image.url"
            :alt="review.title"
            class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="font-semibold text-lg mb-1 text-gray-100 group-hover:text-blue-400 transition-colors duration-200">{{ review.title }}</h3>
          <div class="flex justify-between items-center text-sm text-gray-500 mt-auto pt-2">
            <span>{{ review.genre }} &middot; {{ review.releaseYear }}</span>
            <span class="text-blue-400 font-bold">{{ review.rating }}/10</span>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 py-12 text-lg">
      Nothing came up. Try a different search?
    </p>

    <!-- Modal -->
    <transition name="backdrop">
      <div
        v-if="showModal && selectedReview"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="bg-gray-900/95 border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        >
          <button
            @click="closeModal"
            class="absolute top-3 right-3 z-10 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 btn-press leading-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="flex items-center justify-center bg-gray-800/50 rounded-l-2xl overflow-hidden">
              <img
                v-if="selectedReview.image"
                :src="selectedReview.image.url"
                :alt="selectedReview.title"
                class="w-full rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl"
              />
            </div>

            <div class="p-6 flex flex-col">
              <h2 class="text-3xl font-bold mb-3 text-blue-400">{{ selectedReview.title }}</h2>

              <div class="flex flex-wrap gap-2 mb-4">
                <span v-if="selectedReview.director" class="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10">Directed by {{ selectedReview.director }}</span>
                <span v-if="selectedReview.genre" class="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10">{{ selectedReview.genre }}</span>
                <span v-if="selectedReview.releaseYear" class="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10">{{ selectedReview.releaseYear }}</span>
              </div>

              <div class="text-2xl font-bold text-blue-400 mb-6">Rating: {{ selectedReview.rating }}/10</div>

              <div class="text-base leading-relaxed text-gray-300" v-html="renderBlocks(selectedReview.body)"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>
