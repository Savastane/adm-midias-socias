import { supabase } from '~/utils/supabase'
import { ref } from 'vue'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(true)

  const checkUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      user.value = null
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    checkUser,
    signOut
  }
}
