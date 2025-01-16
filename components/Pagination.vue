<template>
  <div class="flex items-center justify-between px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="$emit('previous')"
        :disabled="currentPage === 1"
        :class="[
          'relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : `${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.border}`
        ]"
      >
        Anterior
      </button>
      <button
        @click="$emit('next')"
        :disabled="currentPage === totalPages"
        :class="[
          'relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : `${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.border}`
        ]"
      >
        Próxima
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Mostrando
          <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span>
          até
          <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
          de
          <span class="font-medium">{{ totalItems }}</span>
          resultados
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            @click="$emit('previous')"
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center rounded-l-md px-2 py-2',
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : `${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.border}`
            ]"
          >
            <span class="sr-only">Anterior</span>
            <Icon name="mdi:chevron-left" class="h-5 w-5" aria-hidden="true" />
          </button>
          
          <template v-for="page in displayedPages" :key="page">
            <span
              v-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
            >
              ...
            </span>
            <button
              v-else
              @click="$emit('page', page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                page === currentPage
                  ? `${colorClasses.activeBg} ${colorClasses.activeText}`
                  : `${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.border}`
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="$emit('next')"
            :disabled="currentPage === totalPages"
            :class="[
              'relative inline-flex items-center rounded-r-md px-2 py-2',
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : `${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.border}`
            ]"
          >
            <span class="sr-only">Próxima</span>
            <Icon name="mdi:chevron-right" class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'pink', 'red', 'sky', 'black'].includes(value)
  }
})

const colorClasses = computed(() => {
  const variants = {
    blue: {
      text: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      border: 'ring-1 ring-inset ring-gray-300',
      activeBg: 'bg-blue-600',
      activeText: 'text-white'
    },
    pink: {
      text: 'text-pink-600',
      hoverBg: 'hover:bg-pink-50',
      border: 'ring-1 ring-inset ring-gray-300',
      activeBg: 'bg-pink-600',
      activeText: 'text-white'
    },
    red: {
      text: 'text-red-600',
      hoverBg: 'hover:bg-red-50',
      border: 'ring-1 ring-inset ring-gray-300',
      activeBg: 'bg-red-600',
      activeText: 'text-white'
    },
    sky: {
      text: 'text-sky-600',
      hoverBg: 'hover:bg-sky-50',
      border: 'ring-1 ring-inset ring-gray-300',
      activeBg: 'bg-sky-500',
      activeText: 'text-white'
    },
    black: {
      text: 'text-gray-900',
      hoverBg: 'hover:bg-gray-100',
      border: 'ring-1 ring-inset ring-gray-300',
      activeBg: 'bg-black',
      activeText: 'text-white'
    }
  }
  return variants[props.variant]
})

const displayedPages = computed(() => {
  const pages = []
  const maxDisplayed = 7 // Número máximo de páginas mostradas
  
  if (props.totalPages <= maxDisplayed) {
    // Se tivermos menos páginas que o máximo, mostra todas
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Sempre mostra primeira página
    pages.push(1)
    
    if (props.currentPage > 3) {
      pages.push('...')
    }
    
    // Páginas ao redor da página atual
    const start = Math.max(2, props.currentPage - 1)
    const end = Math.min(props.totalPages - 1, props.currentPage + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (props.currentPage < props.totalPages - 2) {
      pages.push('...')
    }
    
    // Sempre mostra última página
    pages.push(props.totalPages)
  }
  
  return pages
})
</script>
