
import { getNotifications, onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getWorkSpace, getWorkspaceFolders, verifyAccessToWorkspace } from '@/actions/workspace'
import Sidebar from '@/components/global/sidebar'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({ params: { workspaceId }, children }: Props) => {
    const auth = await onAuthenticateUser()
    if (!auth.user?.workspace) redirect('/auth/sign-in')
    if (!auth.user.workspace.length) redirect('/auth/sign-in')

    const hasAccess = await verifyAccessToWorkspace(workspaceId)

    if (!hasAccess.data?.workspace) return null

    const query = new QueryClient();
    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: () => getWorkspaceFolders(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: () => getAllUserVideos(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: () => getWorkSpace()
    })
    await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: () => getNotifications()
    })
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='flex h-screen w-screen'>
                <Sidebar activeWorkspaceId={workspaceId} />
            </div>
        </HydrationBoundary>
    )
}

export default Layout
