<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Posts do Instagram</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/dashboard/instagram/comments" 
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center space-x-2">
          <Icon name="mdi:comment" class="w-5 h-5" />
          <span>Comentários</span>
        </NuxtLink>
        <button @click="showScheduler = true"
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
          Novo Post
        </button>
      </div>
    </div>

    <!-- Grid de Posts -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div v-for="post in paginatedPosts" :key="post.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="relative aspect-square">
          <img :src="post.image" :alt="post.caption" class="w-full h-full object-cover" />
        </div>
        
        <div class="p-4">
          <div class="flex items-center space-x-2 mb-3">
            <img :src="post.authorAvatar" alt="" class="w-8 h-8 rounded-full" />
            <span class="font-semibold">{{ post.author }}</span>
          </div>
          
          <p class="text-gray-600 mb-4 line-clamp-2">{{ post.caption }}</p>
          
          <div class="flex items-center justify-between text-gray-500">
            <button @click="showLikes(post)" class="flex items-center space-x-2 hover:text-pink-500">
              <Icon name="mdi:heart" class="w-6 h-6" />
              <span>{{ post.likes }}</span>
            </button>
            <button @click="showComments(post)" class="flex items-center space-x-2 hover:text-pink-500">
              <Icon name="mdi:comment" class="w-6 h-6" />
              <span>{{ post.comments.length }}</span>
            </button>
            <button class="flex items-center space-x-2 hover:text-pink-500">
              <Icon name="mdi:share" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="posts.length"
      :items-per-page="itemsPerPage"
      variant="pink"
      @previous="previousPage"
      @next="nextPage"
      @page="goToPage"
    />

    <!-- Modal de Curtidas -->
    <UModal v-model="showLikesModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Curtidas</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="like in selectedPost?.likesList" :key="like.id" 
               class="flex items-center justify-between border-b pb-2">
            <div class="flex items-center space-x-3">
              <img :src="like.avatar" :alt="like.username" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ like.username }}</p>
                <p class="text-sm text-gray-500">{{ like.name }}</p>
              </div>
            </div>
            <button class="text-pink-500 hover:text-pink-600">
              <Icon name="mdi:account-plus" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Comentários -->
    <UModal v-model="showCommentsModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Comentários</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="comment in selectedPost?.comments" :key="comment.id" class="border-b pb-4">
            <div class="flex items-start space-x-3">
              <img :src="comment.avatar" :alt="comment.username" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">{{ comment.username }}</p>
                    <p class="text-sm text-gray-500">{{ comment.time }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button class="text-gray-400 hover:text-pink-500">
                      <Icon name="mdi:heart" class="w-5 h-5" />
                    </button>
                    <button class="text-gray-400 hover:text-red-500">
                      <Icon name="mdi:delete" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p class="mt-1">{{ comment.text }}</p>
                <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <button class="hover:text-gray-700">Responder</button>
                  <span>{{ comment.likes }} curtidas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Post Scheduler -->
    <PostScheduler
      v-model="showScheduler"
      platform="instagram"
      @post-scheduled="handlePostScheduled"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePostsStore } from '~/stores/posts'
import PostScheduler from '~/components/PostScheduler.vue'

const postsStore = usePostsStore()
const currentPage = ref(1)
const itemsPerPage = ref(9)
const showLikesModal = ref(false)
const showCommentsModal = ref(false)
const selectedPost = ref(null)
const showScheduler = ref(false)

// Computed properties
const posts = computed(() => postsStore.instagramPosts)
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage.value))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return posts.value.slice(start, end)
})

// Load posts when component mounts
onMounted(async () => {
  await postsStore.fetchInstagramPosts()
})

// Pagination methods
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}

// Modal methods
function showLikes(post) {
  selectedPost.value = post
  showLikesModal.value = true
}

function showComments(post) {
  selectedPost.value = post
  showCommentsModal.value = true
}

const handlePostScheduled = () => {
  // Atualizar a lista de posts após o agendamento
}
</script>
