<template>
  <div class="dashboard">
    <!-- Tabs para cada rede social -->
    <div class="mb-6 border-b">
      <div class="flex space-x-4">
        <button v-for="platform in platforms" 
                :key="platform"
                @click="currentPlatform = platform"
                :class="['px-4 py-2', currentPlatform === platform ? 'border-b-2 border-blue-500' : '']">
          {{ platform }}
        </button>
      </div>
    </div>

    <!-- Área de agendamento -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Agendar Postagem</h2>
      <div class="space-y-4">
        <textarea v-model="newPost.content" 
                  class="w-full p-2 border rounded"
                  placeholder="Digite sua mensagem..."></textarea>
        <div class="flex space-x-4">
          <input type="datetime-local" 
                 v-model="newPost.scheduledDate"
                 class="border rounded p-2">
          <button @click="schedulePost"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Agendar
          </button>
        </div>
      </div>
    </div>

    <!-- Métricas e Interações -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Curtidas -->
      <div class="border rounded-lg p-4">
        <h3 class="text-xl font-semibold mb-4">Curtidas</h3>
        <div v-if="metrics.likes.length">
          <div v-for="like in metrics.likes" 
               :key="like.id"
               class="flex items-center space-x-2 mb-2">
            <img :src="like.userAvatar" 
                 class="w-8 h-8 rounded-full"
                 :alt="like.userName">
            <span>{{ like.userName }}</span>
          </div>
        </div>
        <p v-else>Nenhuma curtida ainda</p>
      </div>

      <!-- Comentários -->
      <div class="border rounded-lg p-4">
        <h3 class="text-xl font-semibold mb-4">
          Comentários ({{ metrics.comments.length }})
        </h3>
        <div v-if="metrics.comments.length">
          <div v-for="comment in metrics.comments" 
               :key="comment.id"
               class="mb-4">
            <div class="flex items-center space-x-2 mb-1">
              <img :src="comment.userAvatar" 
                   class="w-8 h-8 rounded-full"
                   :alt="comment.userName">
              <span class="font-semibold">{{ comment.userName }}</span>
            </div>
            <p class="ml-10">{{ comment.content }}</p>
          </div>
        </div>
        <p v-else>Nenhum comentário ainda</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platforms: ['Twitter', 'Instagram', 'YouTube', 'Facebook', 'TikTok'],
      currentPlatform: 'Twitter',
      newPost: {
        content: '',
        scheduledDate: '',
      },
      metrics: {
        likes: [],
        comments: []
      }
    }
  },
  methods: {
    async schedulePost() {
      try {
        // Implementar lógica de agendamento
        console.log('Agendando post:', {
          platform: this.currentPlatform,
          ...this.newPost
        })
        // Limpar formulário após agendar
        this.newPost = {
          content: '',
          scheduledDate: ''
        }
      } catch (error) {
        console.error('Erro ao agendar post:', error)
      }
    },
    async fetchMetrics() {
      try {
        // Implementar busca de métricas da API
        // This is a mock response
        this.metrics = {
          likes: [
            { id: 1, userName: 'User 1', userAvatar: 'https://via.placeholder.com/32' },
            { id: 2, userName: 'User 2', userAvatar: 'https://via.placeholder.com/32' }
          ],
          comments: [
            { 
              id: 1, 
              userName: 'User 1',
              userAvatar: 'https://via.placeholder.com/32',
              content: 'Great post!'
            }
          ]
        }
      } catch (error) {
        console.error('Erro ao buscar métricas:', error)
      }
    }
  },
  mounted() {
    this.fetchMetrics()
  }
}
</script>
