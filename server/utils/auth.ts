// File: server/utils/auth.ts

export async function handleOAuthUser(event: any, userData: {
  id: string,
  name: string,
  email: string,
  image: string,
  provider: 'google' | 'github'
}) {
  const { id, name, email, image, provider } = userData

  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { [provider + 'Id']: id },
        { email },
      ],
    },
  })

  if (user) {
    // Update existing user
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        [provider + 'Id']: id,
        name: name || user.name,
        email,
        image: image || user.image,
      },
    })
  } else {
    // Create a new user
    user = await prisma.user.create({
      data: {
        [provider + 'Id']: id,
        name,
        email,
        image,
        emailVerified: new Date(),
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  console.log(`User from database (${provider}):`, JSON.stringify(user, null, 2))

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

  const to = getCookie(event, 'loginRedirect') || '/'
  setCookie(event, 'loginRedirect', '')
  return sendRedirect(event, to)
}
