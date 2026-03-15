import { createContext, useContext } from 'react'
import { useUser, useClerk } from '@clerk/react'

interface AuthContextType {
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    imageUrl: string
  } | null
  isSignedIn: boolean
  isLoaded: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()
  const { signOut: clerkSignOut } = useClerk()

  const user = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
  } : null

  const signOut = async () => {
    await clerkSignOut()
  }

  return (
    <AuthContext.Provider value={{ user, isSignedIn: isSignedIn ?? false, isLoaded: isLoaded ?? false, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}