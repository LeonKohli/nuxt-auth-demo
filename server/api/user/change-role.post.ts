export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    if (!session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const body = await readBody(event)
    const { role } = body

    if (role !== 'USER' && role !== 'ADMIN') {
        throw createError({
            statusCode: 400,
            message: 'Invalid role'
        })
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { role }
        })

        return { success: true, user: updatedUser }
    } catch (error) {
        console.error('Failed to update user role:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to update user role'
        })
    }
})
