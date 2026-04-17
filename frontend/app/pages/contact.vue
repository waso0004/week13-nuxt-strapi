<script setup>
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const handleSubmit = () => {
  const to = 'hello@ghiblicritic.test';
  const subject = encodeURIComponent(form.value.subject);
  const body = encodeURIComponent(`From: ${form.value.name} (${form.value.email})\n\n${form.value.message}`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
};

const autoResize = (e) => {
  const el = e.target;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};
</script>

<template>
  <div>
  <section class="relative border-b border-white/5 bg-gray-950 overflow-hidden">
    <div class="absolute inset-0 bg-blue-500/5"></div>

    <div class="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
      <h1 class="text-5xl md:text-7xl font-extrabold mb-6 text-blue-400 animate-float">
        Say Hello
      </h1>
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Want to recommend a movie, ask a question, or just chat? Send us a message.
      </p>
    </div>
  </section>

  <div class="max-w-2xl mx-auto px-4 py-16">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <label for="name" class="font-medium text-gray-400 text-sm tracking-wide uppercase">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="bg-white/[0.03] border border-white/10 text-gray-100 placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus-ring transition-all duration-300"
          placeholder="What should we call you?"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="font-medium text-gray-400 text-sm tracking-wide uppercase">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="bg-white/[0.03] border border-white/10 text-gray-100 placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus-ring transition-all duration-300"
          placeholder="you@example.com"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="subject" class="font-medium text-gray-400 text-sm tracking-wide uppercase">Subject</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          required
          class="bg-white/[0.03] border border-white/10 text-gray-100 placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus-ring transition-all duration-300"
          placeholder="Give it a title"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="message" class="font-medium text-gray-400 text-sm tracking-wide uppercase">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="3"
          class="bg-white/[0.03] border border-white/10 text-gray-100 placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus-ring transition-all duration-300 resize-none overflow-hidden"
          placeholder="What's on your mind?"
          @input="autoResize"
        ></textarea>
      </div>

      <button
        type="submit"
        class="self-end bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 btn-press shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
      >
        Send Message
      </button>
    </form>
  </div>
  </div>
</template>
