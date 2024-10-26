export function useSessionRefresh() {
    const { fetch: fetchSession, user } = useUserSession()

    const refreshSession = async () => {
        await fetchSession()
        return user.value
    }

    return {
        refreshSession
    }
}
