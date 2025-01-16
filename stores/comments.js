import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: []
  }),

  actions: {
    async fetchComments() {
      try {
        // Simular chamada à API
        // TODO: Implementar chamada real à API
        this.comments = [
          {
            id: 1,
            platform: 'youtube',
            content: 'Ótimo vídeo! Muito informativo.',
            userName: 'João Silva',
            userAvatar: 'https://via.placeholder.com/40',
            date: '2024-12-16T10:30:00',
            likes: 15,
            isPinned: false,
            replies: [
              {
                id: 101,
                content: 'Obrigado pelo feedback!',
                userName: 'Admin',
                userAvatar: 'https://via.placeholder.com/40',
                date: '2024-12-16T11:00:00'
              }
            ]
          },
          {
            id: 2,
            platform: 'instagram',
            content: 'Adorei as fotos! 📸',
            userName: 'Maria Santos',
            userAvatar: 'https://via.placeholder.com/40',
            date: '2024-12-16T09:15:00',
            likes: 25,
            isPinned: true,
            replies: []
          }
        ]
      } catch (error) {
        console.error('Erro ao carregar comentários:', error)
      }
    },

    async addReply({ commentId, content, platform }) {
      try {
        // TODO: Implementar chamada real à API
        const comment = this.comments.find(c => c.id === commentId)
        if (comment) {
          const reply = {
            id: Date.now(),
            content,
            userName: 'Admin',
            userAvatar: 'https://via.placeholder.com/40',
            date: new Date().toISOString()
          }
          
          if (!comment.replies) {
            comment.replies = []
          }
          comment.replies.push(reply)
        }
      } catch (error) {
        console.error('Erro ao adicionar resposta:', error)
      }
    },

    async togglePin(commentId) {
      try {
        // TODO: Implementar chamada real à API
        const comment = this.comments.find(c => c.id === commentId)
        if (comment) {
          comment.isPinned = !comment.isPinned
        }
      } catch (error) {
        console.error('Erro ao fixar/desafixar comentário:', error)
      }
    },

    async deleteComment(commentId) {
      try {
        // TODO: Implementar chamada real à API
        const index = this.comments.findIndex(c => c.id === commentId)
        if (index !== -1) {
          this.comments.splice(index, 1)
        }
      } catch (error) {
        console.error('Erro ao excluir comentário:', error)
      }
    }
  }
})
