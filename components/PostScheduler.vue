<template>
  <UModal :model-value="modelValue" @update:model-value="$emit('update:modelValue')" :ui="{ width: 'max-w-3xl' }">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">{{ title }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Conteúdo do Post -->
        <div v-if="platform !== 'youtube'" class="space-y-2">
          <label class="block font-medium">Texto do Post</label>
          <textarea
            v-model="postData.content"
            :placeholder="contentPlaceholder"
            rows="4"
            class="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <!-- Campos específicos do YouTube -->
        <template v-if="platform === 'youtube'">
          <div class="space-y-2">
            <label class="block font-medium">Título do Vídeo</label>
            <input
              v-model="postData.title"
              type="text"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="block font-medium">Descrição</label>
            <textarea
              v-model="postData.description"
              rows="4"
              class="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>
        </template>

        <!-- Upload de Mídia -->
        <div class="space-y-2">
          <label class="block font-medium">
            {{ mediaLabel }}
          </label>
          <div class="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              :accept="mediaAccept"
              @change="handleFileChange"
              class="hidden"
              ref="fileInput"
              :multiple="platform === 'instagram'"
            />
            <div v-if="!postData.media.length" @click="$refs.fileInput.click()" 
                 class="cursor-pointer">
              <Icon :name="mediaIcon" class="w-12 h-12 mx-auto text-gray-400" />
              <p class="mt-2 text-sm text-gray-600">
                Clique para fazer upload ou arraste e solte
              </p>
            </div>
            <div v-else class="grid grid-cols-2 gap-4">
              <div v-for="(file, index) in postData.media" :key="index" 
                   class="relative group">
                <img
                  v-if="file.type.startsWith('image')"
                  :src="URL.createObjectURL(file)"
                  class="w-full h-40 object-cover rounded-lg"
                />
                <video
                  v-else
                  :src="URL.createObjectURL(file)"
                  class="w-full h-40 object-cover rounded-lg"
                  controls
                ></video>
                <button
                  @click="removeMedia(index)"
                  class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="mdi:close" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Agendamento -->
        <div class="space-y-2">
          <label class="block font-medium">Agendamento</label>
          <div class="flex space-x-4">
            <select
              v-model="postData.scheduleType"
              class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="now">Publicar Agora</option>
              <option value="schedule">Agendar</option>
            </select>
            <input
              v-if="postData.scheduleType === 'schedule'"
              v-model="postData.scheduleDate"
              type="datetime-local"
              class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              :min="minDateTime"
              required
            />
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :class="[
              'px-4 py-2 text-white rounded-lg transition-colors',
              buttonClasses
            ]"
          >
            {{ postData.scheduleType === 'schedule' ? 'Agendar' : 'Publicar' }}
          </button>
        </div>
      </form>
    </div>
  </UModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePostsStore } from '~/stores/posts'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  platform: {
    type: String,
    required: true,
    validator: value => ['youtube', 'instagram', 'facebook', 'twitter', 'tiktok'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'post-scheduled'])

const postsStore = usePostsStore()
const fileInput = ref(null)

const postData = ref({
  content: '',
  title: '',
  description: '',
  media: [],
  scheduleType: 'now',
  scheduleDate: '',
})

// Computed properties para personalização por plataforma
const title = computed(() => {
  const titles = {
    youtube: 'Novo Vídeo',
    instagram: 'Novo Post',
    facebook: 'Novo Post',
    twitter: 'Novo Tweet',
    tiktok: 'Novo TikTok'
  }
  return titles[props.platform]
})

const contentPlaceholder = computed(() => {
  const placeholders = {
    instagram: 'Digite a legenda do seu post...',
    facebook: 'No que você está pensando?',
    twitter: 'O que está acontecendo?',
    tiktok: 'Digite a descrição do seu TikTok...'
  }
  return placeholders[props.platform]
})

const mediaLabel = computed(() => {
  const labels = {
    youtube: 'Upload do Vídeo',
    instagram: 'Fotos/Vídeos',
    facebook: 'Fotos/Vídeos',
    twitter: 'Mídia',
    tiktok: 'Vídeo'
  }
  return labels[props.platform]
})

const mediaAccept = computed(() => {
  const accepts = {
    youtube: 'video/*',
    instagram: 'image/*,video/*',
    facebook: 'image/*,video/*',
    twitter: 'image/*,video/*',
    tiktok: 'video/*'
  }
  return accepts[props.platform]
})

const mediaIcon = computed(() => {
  const icons = {
    youtube: 'mdi:video',
    instagram: 'mdi:image-multiple',
    facebook: 'mdi:image-multiple',
    twitter: 'mdi:image-multiple',
    tiktok: 'mdi:video'
  }
  return icons[props.platform]
})

const buttonClasses = computed(() => {
  const classes = {
    youtube: 'bg-red-600 hover:bg-red-700',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    facebook: 'bg-blue-600 hover:bg-blue-700',
    twitter: 'bg-blue-400 hover:bg-blue-500',
    tiktok: 'bg-black hover:bg-gray-800'
  }
  return classes[props.platform]
})

const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
})

// Methods
const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  if (props.platform === 'instagram' && files.length > 10) {
    alert('Máximo de 10 arquivos permitidos para o Instagram')
    return
  }
  postData.value.media = files
}

const removeMedia = (index) => {
  postData.value.media.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    await postsStore.schedulePost({
      platform: props.platform,
      ...postData.value
    })
    emit('post-scheduled')
    close()
  } catch (error) {
    console.error('Erro ao agendar post:', error)
  }
}

const close = () => {
  emit('update:modelValue', false)
  postData.value = {
    content: '',
    title: '',
    description: '',
    media: [],
    scheduleType: 'now',
    scheduleDate: ''
  }
}
</script>
