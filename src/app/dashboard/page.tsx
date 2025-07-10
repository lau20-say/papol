
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const DasboardPage = async (props: Props) => {
  // Authentication
  const auth = await onAuthenticateUser()

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
  }

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in') // if account does not exist
  }

  
}

export default DasboardPage
