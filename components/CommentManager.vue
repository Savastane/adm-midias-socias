<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <!-- Header e Filtros -->
    <div class="mb-6 space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Gestão de Comentários</h2>
        <div class="flex space-x-2">
          <select v-model="selectedPlatform" class="px-4 py-2 border rounded-lg">
            <option value="all">Todas as Redes</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
          </select>
          <select v-model="sortOrder" class="px-4 py-2 border rounded-lg">
            <option value="newest">Mais Recentes</option>
            <option value="oldest">Mais Antigos</option>
          </select>
        </div>
      </div>
      
      <!-- Barra de Pesquisa -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar nos comentários..."
          class="w-full px-4 py-2 border rounded-lg pl-10"
        />
        <Icon
          name="mdi:magnify"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
      </div>
    </div>

    <!-- Lista de Comentários -->
    <div class="space-y-6">
      <div v-for="comment in filteredComments" :key="comment.id" 
           class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <!-- Cabeçalho do Comentário -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3">
            <img :src="comment.userAvatar" :alt="comment.userName" 
                 class="w-10 h-10 rounded-full" />
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-medium">{{ comment.userName }}</span>
                <span class="text-sm text-gray-500">{{ comment.platform }}</span>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(comment.date) }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button class="text-gray-400 hover:text-blue-500"
                    @click="togglePin(comment)">
              <Icon :name="comment.isPinned ? 'mdi:pin' : 'mdi:pin-outline'" 
                    class="w-5 h-5" />
            </button>
            <button class="text-gray-400 hover:text-red-500"
                    @click="deleteComment(comment)">
              <Icon name="mdi:delete" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Conteúdo do Comentário -->
        <p class="text-gray-700 mb-3">{{ comment.content }}</p>

        <!-- Métricas e Ações -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center space-x-1">
              <Icon name="mdi:thumb-up" class="w-4 h-4" />
              <span>{{ comment.likes }}</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon name="mdi:comment-outline" class="w-4 h-4" />
              <span>{{ comment.replies?.length || 0 }}</span>
            </span>
          </div>
          <button @click="showReplyForm(comment)"
                  class="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Responder
          </button>
        </div>

        <!-- Formulário de Resposta -->
        <div v-if="comment.showReplyForm" class="mt-4">
          <textarea
            v-model="comment.replyText"
            rows="2"
            placeholder="Digite sua resposta..."
            class="w-full px-3 py-2 border rounded-lg resize-none"
          ></textarea>
          <div class="flex justify-end space-x-2 mt-2">
            <button @click="cancelReply(comment)"
                    class="px-4 py-2 text-gray-600 hover:text-gray-700">
              Cancelar
            </button>
            <button @click="submitReply(comment)"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Enviar
            </button>
          </div>
        </div>

        <!-- Respostas -->
        <div v-if="comment.replies?.length" class="mt-4 pl-4 border-l">
          <div v-for="reply in comment.replies" :key="reply.id"
               class="mt-3 first:mt-0">
            <div class="flex items-start space-x-3">
              <img :src="reply.userAvatar" :alt="reply.userName"
                   class="w-8 h-8 rounded-full" />
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-medium">{{ reply.userName }}</span>
                  <span class="text-sm text-gray-500">{{ formatDate(reply.date) }}</span>
                </div>
                <p class="text-gray-700 mt-1">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div class="mt-6 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <span class="px-3 py-1">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
        >
          Próxima
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCommentsStore } from '~/stores/comments'

const commentsStore = useCommentsStore()

// Estado local
const searchQuery = ref('')
const selectedPlatform = ref('all')
const sortOrder = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed properties
const filteredComments = computed(() => {
  let comments = [...commentsStore.comments]

  // Filtrar por plataforma
  if (selectedPlatform.value !== 'all') {
    comments = comments.filter(c => c.platform === selectedPlatform.value)
  }

  // Filtrar por texto
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    comments = comments.filter(c => 
      c.content.toLowerCase().includes(query) ||
      c.userName.toLowerCase().includes(query)
    )
  }

  // Ordenar por data
  comments.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB
  })

  return comments
})

const totalPages = computed(() => 
  Math.ceil(filteredComments.value.length / itemsPerPage)
)

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredComments.value.slice(start, end)
})

// Métodos
const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showReplyForm = (comment) => {
  comment.showReplyForm = true
  comment.replyText = ''
}

const cancelReply = (comment) => {
  comment.showReplyForm = false
  comment.replyText = ''
}

const submitReply = async (comment) => {
  if (!comment.replyText?.trim()) return

  await commentsStore.addReply({
    commentId: comment.id,
    content: comment.replyText,
    platform: comment.platform
  })

  cancelReply(comment)
}

const togglePin = async (comment) => {
  await commentsStore.togglePin(comment.id)
}

const deleteComment = async (comment) => {
  if (confirm('Tem certeza que deseja excluir este comentário?')) {
    await commentsStore.deleteComment(comment.id)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
