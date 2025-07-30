// pages/users/[id].tsx
import { GetServerSideProps, NextPage } from 'next'
import prisma from '@/lib/prisma'
import { Visibility } from '@/services/goal'
import Link from 'next/link'

type GoalType = {
  id: string
  title: string
  description: string | null
  frequency: string
  visibility: Visibility
  createdAt: string
}

type ProfilePageProps = {
  profileUser: {
    id: string
    name: string | null
    email: string | null
  }
  publicGoals: GoalType[]
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profileUser, publicGoals }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          {profileUser.name ?? profileUser.email}
        </h1>
        <p className="text-gray-500">User ID: {profileUser.id}</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Public Goals</h2>
        {publicGoals.length === 0 ? (
          <p className="text-gray-600">This user has no public goals yet.</p>
        ) : (
          <ul className="space-y-4">
            {publicGoals.map(goal => (
              <li key={goal.id} className="border p-4 rounded">
                <h3 className="text-xl font-medium">{goal.title}</h3>
                <p className="text-gray-700">
                  {goal.description ?? 'No description'}
                </p>
                <div className="mt-2 text-sm text-gray-500 space-x-4">
                  <span>Frequency: {goal.frequency}</span>
                  <span>
                    Created:{' '}
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </span>
                  <span>🔓 Public</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-center">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          ← Back to your dashboard
        </Link>
      </p>
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (ctx) => {
  const { id } = ctx.params! as { id: string }

  // Fetch the user’s basic info
  const profileUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })

  if (!profileUser) {
    return { notFound: true }
  }

  // Fetch only their public goals
  const goals = await prisma.goal.findMany({
    where: {
      userId: id,
      visibility: Visibility.PUBLIC,
    },
    orderBy: { createdAt: 'desc' },
  })

  // Serialize dates to strings
  const publicGoals: GoalType[] = goals.map(g => ({
    id: g.id,
    title: g.title,
    description: g.description,
    frequency: g.frequency,
    visibility: g.visibility,
    createdAt: g.createdAt.toISOString(),
  }))

  return {
    props: {
      profileUser,
      publicGoals,
    },
  }
}
