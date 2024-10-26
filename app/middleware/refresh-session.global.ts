export default defineNuxtRouteMiddleware(async () => {
    const { refreshSession } = useSessionRefresh()
    await refreshSession()
})
