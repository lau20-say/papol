'use server'

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try{
        const user = await currentUser();
        if(!user) {
            return {status: 403}
        }
        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkId: user.id,
                        }
                    }
                }
            }
        })
        if(userExist){
            return { status: 200, user: userExist}
        }
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {},
                },
                subscription: {
                    create: {},
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: 'PERSONAL'
                    }
                }

            },
            include: {
                workspace: {
                    where:{
                        User: {
                            clerkId: user.id,
                        }
                    }
                },
                subscription: {
                    select: {
                        plan: true,
                    }
                }
            }
        })
        if(newUser){
            return {status: 201, user: newUser}
        }
        return {status: 400}
    }catch(error){
        return {status: 500, error}

    }
}

export const getNotifications = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }
    const notifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    })

    if (notifications && notifications.notification.length > 0)
      return { status: 200, data: notifications }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 400, data: [] }
  }
}
