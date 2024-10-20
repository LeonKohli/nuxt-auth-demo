// File: server/api/auth/email/login.post.ts

import { randomUUID } from 'uncrypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const email: string = body.email

    console.log('Received login request for email:', email)

    if (!email || typeof email !== 'string') {
      console.error('Invalid email provided:', email)
      return {
        success: false,
        error: 'Invalid email provided',
      }
    }

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      console.log('User not found, creating new user for email:', email)
      // Create a new user if one doesn't exist
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Use part of the email as a default name
          role: 'USER',
        },
      })
      console.log('New user created:', user)
    } else {
      console.log('Existing user found:', user)
    }

    const { token, link, otp } = createCodes(getRequestURL(event))
    console.log('Generated codes:', { token, link, otp })

    await saveToken(email, token, otp)
    console.log('Token saved to database')

    const { emails } = useResend()

    console.log('Attempting to send email to:', email)
    try {
      const emailResult = await emails.send({
        from: "Flavorsaver <contact@flavorsaver.leonkohli.dev>",
        to: [email],
        subject: "Login Information",
        text: buildMail({ email, link, otp }),
      })
      console.log('Email sent successfully:', emailResult)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      throw emailError
    }

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    }
  }
})

const createCodes = (url: URL) => {
  const token = randomUUID()
  const link = `${url.origin}/auth/token/${token}`
  const otp = Math.random().toString().slice(-6)
  console.log('Created codes:', { token, link, otp })
  return { token, link, otp }
}

const saveToken = async (email: string, token: string, otp: string) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 4) // 4 hours from now

  try {
    const createdToken = await prisma.userToken.create({
      data: {
        email,
        token,
        otp,
        expiresAt,
      },
    })
    console.log('Token saved:', createdToken)

    // Delete old tokens for this email
    const deletedTokens = await prisma.userToken.deleteMany({
      where: {
        email,
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    console.log('Old tokens deleted:', deletedTokens)
  } catch (dbError) {
    console.error('Error saving token to database:', dbError)
    throw dbError
  }
}

const buildMail = (data: { email: string, link: string, otp: string }) => {
  const mailContent = `
Verification code and verification link.

${data.otp}

${data.link}

This verification code and link will expire in 4 hours.
If you do not recognize this email, please ignore it.
--
Your Application Name
`.trim()
  console.log('Built email content:', mailContent)
  return mailContent
}
