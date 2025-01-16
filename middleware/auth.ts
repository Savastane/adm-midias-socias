import { supabase } from '~/utils/supabase'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, checkUser } = useAuth()
  await checkUser()

  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
  
  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})
