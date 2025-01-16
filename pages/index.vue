<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Social Media Manager Dashboard</h1>
      <button @click="handleLogout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="platform in platforms" :key="platform.name" 
           class="p-4 border rounded shadow">
        <h2 class="text-xl mb-2">{{ platform.name }}</h2>
        <button @click="connectPlatform(platform.name)" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Connect
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { signOut } = useAuth()
const router = useRouter()

const platforms = ref([
  { name: 'Instagram' },
  { name: 'Facebook' },
  { name: 'Twitter' }
])

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}

const connectPlatform = (platform) => {
  // TODO: Implement platform connection logic
  console.log(`Connecting to ${platform}...`)
}
</script>
