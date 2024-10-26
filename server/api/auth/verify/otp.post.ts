// File: server/api/auth/verify/otp.post.ts

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, otp } = body

    console.log('Verifying OTP for email:', email)

    if (!email || !otp) {
      console.error('Missing email or OTP')
      return {
        success: false,
        error: 'Missing email or OTP',
      }
    }

    const userToken = await prisma.userToken.findFirst({
      where: {
        email,
        otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!userToken) {
      console.error('Invalid or expired OTP')
      return {
        success: false,
        error: 'Invalid or expired OTP',
      }
    }

    const user = await getUserByEmail(email)

    if (!user) {
      console.error('User not found')
      return {
        success: false,
        error: 'User not found',
      }
    }

    // Delete the used token
    await prisma.userToken.delete({
      where: {
        id: userToken.id,
      },
    })

    // Set the user session
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

    console.log('OTP verification successful for user:', user.id)

    return {
      success: true,
    }
  } catch (error) {
    console.error('OTP verification error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred during OTP verification',
    }
  }
})
