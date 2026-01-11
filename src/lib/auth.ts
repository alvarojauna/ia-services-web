import { Amplify } from 'aws-amplify';
import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    },
  },
});

export interface AuthUser {
  userId: string;
  email: string;
  emailVerified: boolean;
}

// Sign up a new user
export async function registerUser(email: string, password: string, name: string) {
  const result = await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        name,
      },
    },
  });
  return result;
}

// Confirm sign up with verification code
export async function confirmRegistration(email: string, code: string) {
  const result = await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
  return result;
}

// Resend verification code
export async function resendVerificationCode(email: string) {
  const result = await resendSignUpCode({
    username: email,
  });
  return result;
}

// Sign in user
export async function loginUser(email: string, password: string) {
  const result = await signIn({
    username: email,
    password,
  });
  return result;
}

// Sign out user
export async function logoutUser() {
  await signOut();
}

// Get current authenticated user
export async function getCurrentAuthUser(): Promise<AuthUser | null> {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();

    return {
      userId: user.userId,
      email: user.signInDetails?.loginId || '',
      emailVerified: true,
    };
  } catch {
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
}

// Request password reset
export async function requestPasswordReset(email: string) {
  const result = await resetPassword({
    username: email,
  });
  return result;
}

// Confirm password reset with code
export async function confirmPasswordReset(email: string, code: string, newPassword: string) {
  const result = await confirmResetPassword({
    username: email,
    confirmationCode: code,
    newPassword,
  });
  return result;
}

// Get auth token for API calls
export async function getAuthToken(): Promise<string | null> {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() || null;
  } catch {
    return null;
  }
}
