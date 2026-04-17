<script setup>
const searchQuery = useState('searchQuery', () => '');
const searchOpen = ref(false);
const searchInput = ref(null);
const menuOpen = ref(false);

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    menuOpen.value = false;
    await nextTick();
    searchInput.value?.focus();
  } else {
    searchQuery.value = '';
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value && searchOpen.value) {
    searchOpen.value = false;
    searchQuery.value = '';
  }
};

const closeMenu = () => {
  menuOpen.value = false;
};

const headerHidden = ref(false);
let lastScrollY = 0;

const onScroll = () => {
  const y = window.scrollY;
  const diff = y - lastScrollY;

  if (y < 60) {
    headerHidden.value = false;
  } else if (diff > 5) {
    headerHidden.value = true;
    menuOpen.value = false;
    if (searchOpen.value) {
      searchOpen.value = false;
      searchQuery.value = '';
    }
  } else if (diff < -5) {
    headerHidden.value = false;
  }

  lastScrollY = y;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-950 text-gray-100 overflow-x-hidden">
    <header
      class="fixed md:sticky top-0 left-0 right-0 z-40 glass border-b border-white/5 w-full transition-transform duration-300 will-change-transform"
      :class="headerHidden ? '-translate-y-full md:translate-y-0' : 'translate-y-0'"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-400 hover:text-blue-300 transition shrink-0">GhibliCritic</NuxtLink>
        <nav class="flex gap-6 items-center shrink-0">
          <NuxtLink to="/" class="hidden md:inline text-gray-400 hover:text-blue-400 font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">Home</NuxtLink>
          <NuxtLink to="/about" class="hidden md:inline text-gray-400 hover:text-blue-400 font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">About</NuxtLink>
          <NuxtLink to="/contact" class="hidden md:inline text-gray-400 hover:text-blue-400 font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">Contact</NuxtLink>
          <button
            v-if="!searchOpen"
            @click="toggleSearch"
            aria-label="Open search"
            class="text-gray-400 hover:text-blue-400 transition p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
          </button>
          <button
            @click="toggleMenu"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="menuOpen"
            class="md:hidden text-gray-400 hover:text-blue-400 transition p-1"
          >
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
      </div>
      <transition
        enter-active-class="transition-all duration-200 ease-out overflow-hidden"
        leave-active-class="transition-all duration-150 ease-in overflow-hidden"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-64 opacity-100"
        leave-from-class="max-h-64 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="menuOpen" class="md:hidden border-t border-gray-800 bg-gray-900">
          <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col items-center gap-1">
            <NuxtLink
              to="/"
              @click="closeMenu"
              class="w-full text-center text-gray-300 hover:text-blue-400 font-medium transition py-2 px-2 rounded hover:bg-gray-800"
            >Home</NuxtLink>
            <NuxtLink
              to="/about"
              @click="closeMenu"
              class="w-full text-center text-gray-300 hover:text-blue-400 font-medium transition py-2 px-2 rounded hover:bg-gray-800"
            >About</NuxtLink>
            <NuxtLink
              to="/contact"
              @click="closeMenu"
              class="w-full text-center text-gray-300 hover:text-blue-400 font-medium transition py-2 px-2 rounded hover:bg-gray-800"
            >Contact</NuxtLink>
          </div>
        </div>
      </transition>
      <transition
        enter-active-class="transition-all duration-200 ease-out overflow-hidden"
        leave-active-class="transition-all duration-150 ease-in overflow-hidden"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-24 opacity-100"
        leave-from-class="max-h-24 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="searchOpen" class="border-t border-gray-800 bg-gray-900">
          <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search movies..."
              class="flex-1 min-w-0 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
              @keydown.esc="toggleSearch"
            />
            <button
              @click="toggleSearch"
              aria-label="Close search"
              class="shrink-0 text-gray-400 hover:text-blue-400 transition p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </header>

    <main class="flex-1 min-w-0 pt-16 md:pt-0">
      <NuxtPage />
    </main>

    <footer class="glass border-t border-white/5 w-full">
      <div class="max-w-7xl mx-auto px-4 py-6 text-gray-500 text-center text-sm">
        <p class="flex items-center justify-center gap-2">&copy; 2026 <span class="text-blue-400 font-semibold">GhibliCritic</span></p>
      </div>
    </footer>
  </div>
</template>
