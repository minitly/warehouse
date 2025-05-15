<template>
  <header class="fixed top-0 w-full z-50">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-white">
        Warehouse Management System
      </NuxtLink>

      <div class="hidden md:flex space-x-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-gray-300 hover:text-white transition-colors"
        >
          {{ link.title }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const navLinks = [
  { title: "About", path: "/about" },
  { title: "Login", path: "/login" },
  { title: "Signup", path: "/signup" },
];
</script>
