export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    const redirect = useCookie('loginRedirect')
    redirect.value = to.fullPath
    return navigateTo('/login', { replace: true })
  }
})