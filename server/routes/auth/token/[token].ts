// File: server/routes/auth/token/[token].ts

export default defineEventHandler(async (event) => {
  try {
    const token = getRouterParam(event, 'token')

    const userToken = await prisma.userToken.findUnique({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!userToken) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid or expired token: ${token}`,
      })
    }

    await prisma.userToken.delete({
      where: { id: userToken.id },
    })

    const user = await prisma.user.findUnique({
      where: { email: userToken.email },
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: `User not found: ${userToken.email}`,
      })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name ?? '',
        email: user.email ?? '',
        role: user.role as 'USER' | 'ADMIN',
        userId: user.id,
        googleId: user.googleId ?? undefined,
        githubId: user.githubId ?? undefined,
      },
      loggedInAt: new Date(),
    })

    const loginRedirect = getCookie(event, 'loginRedirect') || '/'
    deleteCookie(event, 'loginRedirect')
    return sendRedirect(event, loginRedirect)

  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    throw createError({
      statusCode: 400,
      statusMessage: `Token verification error: ${message}`,
    })
  }
})