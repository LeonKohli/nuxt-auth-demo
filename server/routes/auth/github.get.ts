// File: server/routes/auth/github.get.ts

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    console.log('Received user data from GitHub:', JSON.stringify(user, null, 2))
    console.log('Received tokens from GitHub:', JSON.stringify(tokens, null, 2))

    if (!user || typeof user !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid user data received from GitHub',
      })
    }

    const githubId = user.id?.toString()
    const email = user.email
    const name = user.name
    const picture = user.avatar_url

    console.log('Extracted user data:', { githubId, email, name, picture })

    if (!githubId || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required user data from GitHub',
      })
    }

    return handleOAuthUser(event, {
      id: githubId,
      name,
      email,
      image: picture,
      provider: 'github'
    })
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/login?error=github_oauth_failed')
  },
})