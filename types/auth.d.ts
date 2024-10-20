// File: auth.d.ts

declare module '#auth-utils' {
  interface User {
    // Add your own user fields here
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    userId: string;
  }

  interface UserSession {
    // Add your own session fields here
    loggedInAt: Date;
  }

  interface SecureSessionData {
    // Add your own secure fields here
    apiToken: string;
  }
}

export {}
