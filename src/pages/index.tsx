// pages/index.tsx
import { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p className="p-8 text-center">Loading…</p>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to KeepUp</h1>

      {session ? (
        <>
          <p className="mb-4">Hello, <strong>{session.user?.name || session.user?.email}</strong>!</p>
          <div className="space-x-4">
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Go to Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">Track your goals, stay accountable, and share your progress with friends.</p>
          <button
            onClick={() => signIn()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Sign In / Sign Up
          </button>
        </>
      )}
    </div>
  )
}

export default Home
