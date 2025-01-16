<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Vídeos</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/dashboard/youtube/comments" 
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
          <Icon name="mdi:comment" class="w-5 h-5" />
          <span>Comentários</span>
        </NuxtLink>
        <button @click="showScheduler = true" 
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Novo Vídeo
        </button>
      </div>
    </div>

    <!-- Grid de Vídeos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div v-for="video in paginatedPosts" :key="video.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden group">
        <!-- Thumbnail com Duração -->
        <div class="relative">
          <img :src="video.thumbnail" :alt="video.title" 
               class="w-full aspect-video object-cover" />
          <span class="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {{ video.duration }}
          </span>
          <!-- Overlay de Play -->
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-white bg-opacity-0 group-hover:bg-opacity-90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              <Icon name="mdi:play" class="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
        
        <!-- Informações do Vídeo -->
        <div class="p-4">
          <div class="flex space-x-3">
            <img :src="video.channelAvatar" alt="" class="w-9 h-9 rounded-full" />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-base mb-1 line-clamp-2 group-hover:text-red-600">
                {{ video.title }}
              </h3>
              <p class="text-gray-500 text-sm">{{ video.channelName }}</p>
              <div class="flex items-center text-sm text-gray-500 mt-1">
                <span>{{ video.views }} visualizações</span>
                <span class="mx-1">•</span>
                <span>{{ video.publishedAt }}</span>
              </div>
            </div>
          </div>
          
          <!-- Métricas -->
          <div class="flex items-center justify-between mt-4 pt-4 border-t">
            <button @click="showLikes(video)" 
                    class="flex items-center space-x-2 text-gray-500 hover:text-red-600">
              <Icon name="mdi:thumb-up" class="w-5 h-5" />
              <span>{{ video.likes }}</span>
            </button>
            <button @click="showComments(video)"
                    class="flex items-center space-x-2 text-gray-500 hover:text-red-600">
              <Icon name="mdi:comment" class="w-5 h-5" />
              <span>{{ video.comments.length }}</span>
            </button>
            <div class="flex items-center space-x-2 text-gray-500">
              <Icon name="mdi:share" class="w-5 h-5" />
              <span>{{ video.shares }}</span>
            </div>
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
      variant="red"
      @previous="previousPage"
      @next="nextPage"
      @page="goToPage"
    />

    <!-- Modal de Likes -->
    <UModal v-model="showLikesModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Curtidas</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="like in selectedVideo?.likesList" :key="like.id" 
               class="flex items-center justify-between py-2 border-b">
            <div class="flex items-center space-x-3">
              <img :src="like.avatar" :alt="like.name" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ like.name }}</p>
                <p class="text-sm text-gray-500">{{ like.subscribers }} inscritos</p>
              </div>
            </div>
            <button class="px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Comentários -->
    <UModal v-model="showCommentsModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Comentários</h2>
        <div class="space-y-6 max-h-96 overflow-y-auto">
          <div v-for="comment in selectedVideo?.comments" :key="comment.id" class="border-b pb-4">
            <div class="flex space-x-3">
              <img :src="comment.avatar" :alt="comment.name" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <p class="font-medium">{{ comment.name }}</p>
                  <span class="text-sm text-gray-500">{{ comment.time }}</span>
                </div>
                <p class="mt-1">{{ comment.text }}</p>
                <div class="flex items-center space-x-4 mt-2">
                  <div class="flex items-center space-x-2">
                    <button class="text-gray-500 hover:text-red-600">
                      <Icon name="mdi:thumb-up" class="w-5 h-5" />
                    </button>
                    <span class="text-sm text-gray-500">{{ comment.likes }}</span>
                    <button class="text-gray-500 hover:text-red-600 ml-2">
                      <Icon name="mdi:thumb-down" class="w-5 h-5" />
                    </button>
                  </div>
                  <button class="text-gray-500 hover:text-red-600 text-sm">
                    Responder
                  </button>
                </div>
                
                <!-- Respostas -->
                <div v-if="comment.replies?.length" class="mt-4 ml-8 space-y-4">
                  <div v-for="reply in comment.replies" :key="reply.id" class="flex space-x-3">
                    <img :src="reply.avatar" :alt="reply.name" class="w-8 h-8 rounded-full" />
                    <div>
                      <div class="flex items-center space-x-2">
                        <p class="font-medium">{{ reply.name }}</p>
                        <span class="text-sm text-gray-500">{{ reply.time }}</span>
                      </div>
                      <p class="mt-1">{{ reply.text }}</p>
                      <div class="flex items-center space-x-4 mt-2">
                        <div class="flex items-center space-x-2">
                          <button class="text-gray-500 hover:text-red-600">
                            <Icon name="mdi:thumb-up" class="w-4 h-4" />
                          </button>
                          <span class="text-sm text-gray-500">{{ reply.likes }}</span>
                          <button class="text-gray-500 hover:text-red-600 ml-2">
                            <Icon name="mdi:thumb-down" class="w-4 h-4" />
                          </button>
                        </div>
                        <button class="text-gray-500 hover:text-red-600 text-sm">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
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
      platform="youtube"
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
const itemsPerPage = ref(8)
const showLikesModal = ref(false)
const showCommentsModal = ref(false)
const selectedVideo = ref(null)
const showScheduler = ref(false)

// Computed properties
const posts = computed(() => postsStore.youtubePosts)
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage.value))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return posts.value.slice(start, end)
})

// Load posts when component mounts
onMounted(async () => {
  await postsStore.fetchYoutubePosts()
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
function showLikes(video) {
  selectedVideo.value = video
  showLikesModal.value = true
}

function showComments(video) {
  selectedVideo.value = video
  showCommentsModal.value = true
}

function handlePostScheduled() {
  // Atualizar a lista de vídeos após o agendamento
}
</script>
