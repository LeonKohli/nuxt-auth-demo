
export default defineNitroPlugin(() => {
    sessionHooks.hook('fetch', async (session, event) => {
        const userEmail = session.user?.email
        if (!userEmail) {
            await clearUserSession(event)
            throw createError({ statusCode: 401, message: 'Not authenticated' })
        }

        const user = await getUserByEmail(userEmail)

        if (!user) {
            await clearUserSession(event)
            throw createError({ statusCode: 403, message: 'User not found' })
        }

        // Update session user data
        session.user = {
            id: user.id,
            name: user.name || '',
            email: user.email,
            role: user.role,
            userId: user.id,
            googleId: user.googleId ?? undefined,
            githubId: user.githubId ?? undefined,
        }
    })
})
