export default defineOAuthGoogleEventHandler({
    async onSuccess(event, { user, tokens }) {
      console.log('Received user data from Google:', JSON.stringify(user, null, 2))
      console.log('Received tokens from Google:', JSON.stringify(tokens, null, 2))
  
      if (!user || typeof user !== 'object') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid user data received from Google',
        })
      }
  
      const googleId = user.id?.toString() || user.sub?.toString()
      const email = user.email
      const name = user.name || user.given_name
      const picture = user.picture
  
      console.log('Extracted user data:', { googleId, email, name, picture })
  
      if (!googleId || !email) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing required user data from Google',
        })
      }
  
      return handleOAuthUser(event, {
        id: googleId,
        name,
        email,
        image: picture,
        provider: 'google'
      })
    },
    onError(event, error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/login?error=google_oauth_failed')
    },
  })
  