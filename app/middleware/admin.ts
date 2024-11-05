export default defineNuxtRouteMiddleware((to, from) => {
  const { user, loggedIn } = useUserSession()

  if (!loggedIn.value || user.value?.role !== 'ADMIN') {
    return navigateTo('/')
  }
})
