export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session || !session.user || (session.user as { role?: string }).role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return users
})