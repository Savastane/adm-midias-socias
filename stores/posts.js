import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    instagramPosts: [],
    facebookPosts: [],
    twitterPosts: [],
    youtubePosts: [],
    scheduledPosts: [],
    posts: {
      youtube: [],
      instagram: [],
      facebook: [],
      twitter: [],
      tiktok: []
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchInstagramPosts() {
      this.loading = true
      try {
        // Simulated API call - replace with actual API integration
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            {
              id: 1,
              image: 'https://picsum.photos/600/600',
              caption: 'Explorando novos horizontes! 🌅 #Aventura #Fotografia',
              author: 'johndoe',
              authorAvatar: 'https://i.pravatar.cc/150?u=johndoe',
              likes: 1234,
              likesList: [
                { id: 1, username: 'user1', name: 'User One', avatar: 'https://i.pravatar.cc/150?u=user1' },
                { id: 2, username: 'user2', name: 'User Two', avatar: 'https://i.pravatar.cc/150?u=user2' }
              ],
              comments: [
                { id: 1, username: 'user1', avatar: 'https://i.pravatar.cc/150?u=user1', text: 'Incrível!', time: '2h' },
                { id: 2, username: 'user2', avatar: 'https://i.pravatar.cc/150?u=user2', text: 'Que foto linda!', time: '1h' }
              ]
            },
            // Add more mock posts here
          ])
        }, 1000))
        this.instagramPosts = response
      } catch (error) {
        this.error = 'Erro ao carregar posts do Instagram'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchFacebookPosts() {
      this.loading = true
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            {
              id: 1,
              content: 'Compartilhando momentos especiais!',
              image: 'https://picsum.photos/600/400',
              author: 'Jane Doe',
              authorAvatar: 'https://i.pravatar.cc/150?u=janedoe',
              reactions: 2345,
              comments: [
                { id: 1, username: 'user3', avatar: 'https://i.pravatar.cc/150?u=user3', text: 'Maravilhoso!', time: '3h' }
              ]
            }
          ])
        }, 1000))
        this.facebookPosts = response
      } catch (error) {
        this.error = 'Erro ao carregar posts do Facebook'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchTwitterPosts() {
      this.loading = true
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            {
              id: 1,
              text: 'Compartilhando pensamentos interessantes! #pensamentos',
              author: '@twitteruser',
              authorAvatar: 'https://i.pravatar.cc/150?u=twitteruser',
              retweets: 123,
              likes: 456,
              replies: [
                { id: 1, username: 'user4', avatar: 'https://i.pravatar.cc/150?u=user4', text: 'Concordo!', time: '1h' }
              ]
            }
          ])
        }, 1000))
        this.twitterPosts = response
      } catch (error) {
        this.error = 'Erro ao carregar posts do Twitter'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchYoutubePosts() {
      this.loading = true
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            {
              id: 1,
              title: 'Como criar conteúdo incrível',
              thumbnail: 'https://picsum.photos/600/338',
              views: '10K',
              likes: 1500,
              comments: [
                { id: 1, username: 'user5', avatar: 'https://i.pravatar.cc/150?u=user5', text: 'Ótimo vídeo!', time: '2h' }
              ]
            }
          ])
        }, 1000))
        this.youtubePosts = response
      } catch (error) {
        this.error = 'Erro ao carregar posts do YouTube'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async schedulePost({ platform, content, title, description, media, scheduleType, scheduleDate }) {
      try {
        const post = {
          id: Date.now(),
          platform,
          content,
          title,
          description,
          mediaUrls: media.map(file => URL.createObjectURL(file)),
          scheduledFor: scheduleType === 'schedule' ? new Date(scheduleDate) : new Date(),
          status: scheduleType === 'schedule' ? 'scheduled' : 'published',
          createdAt: new Date()
        }

        // Aqui você faria a chamada à API real
        // await api.schedulePost(post)

        this.scheduledPosts.push(post)
        return post
      } catch (error) {
        console.error('Erro ao agendar post:', error)
        throw error
      }
    },

    async fetchScheduledPosts() {
      try {
        // Aqui você faria a chamada à API real
        // const response = await api.getScheduledPosts()
        // this.scheduledPosts = response.data
      } catch (error) {
        console.error('Erro ao buscar posts agendados:', error)
        throw error
      }
    },

    async deleteScheduledPost(postId) {
      try {
        // Aqui você faria a chamada à API real
        // await api.deleteScheduledPost(postId)
        this.scheduledPosts = this.scheduledPosts.filter(post => post.id !== postId)
      } catch (error) {
        console.error('Erro ao excluir post agendado:', error)
        throw error
      }
    },

    async editScheduledPost(postId, updates) {
      try {
        // Aqui você faria a chamada à API real
        // await api.updateScheduledPost(postId, updates)
        const index = this.scheduledPosts.findIndex(post => post.id === postId)
        if (index !== -1) {
          this.scheduledPosts[index] = { ...this.scheduledPosts[index], ...updates }
        }
      } catch (error) {
        console.error('Erro ao editar post agendado:', error)
        throw error
      }
    }
  }
})
