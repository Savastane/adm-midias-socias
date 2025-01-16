<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav v-if="!isLoginPage" class="bg-gray-800">
      <div class="mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-white text-xl">Social Media Manager</h1>
          </div>
          <div class="flex items-center">
            <button @click="handleLogout" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside v-if="!isLoginPage" class="bg-white w-64 min-h-screen border-r border-gray-200">
        <nav class="mt-5 px-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.route"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="[
              route.path === item.route
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <Icon
              :name="item.icon"
              class="mr-3 flex-shrink-0 h-6 w-6"
              :class="[
                route.path === item.route
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              ]"
            />
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const { signOut } = useAuth()
const isLoginPage = computed(() => route.path === '/login')

const menuItems = [
  { name: 'Facebook', route: '/dashboard/facebook', icon: 'mdi:facebook' },
  { name: 'YouTube', route: '/dashboard/youtube', icon: 'mdi:youtube' },
  { name: 'Instagram', route: '/dashboard/instagram', icon: 'mdi:instagram' },
  { name: 'Twitter', route: '/dashboard/twitter', icon: 'mdi:twitter' },
  { name: 'TikTok', route: '/dashboard/tiktok', icon: 'mdi:music-note' }
]

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>

<style>
html {
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
}

body {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
