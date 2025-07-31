import prisma from '@/lib/prisma'

export async function followUser(followerId: string, followingId: string) {
  if (followerId === followingId) {
    throw new Error("You can't follow yourself.")
  }
  return prisma.follower.create({
    data: { followerId, followingId },
  })
}

export async function unfollowUser(followerId: string, followingId: string) {
  await prisma.follower.deleteMany({
    where: { followerId, followingId },
  })
  return { success: true }
}

export async function listFollowing(userId: string) {
  return prisma.follower.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  })
}

export async function listFollowers(userId: string) {
  return prisma.follower.findMany({
    where: { followingId: userId },
    select: { followerId: true },
  })
}
