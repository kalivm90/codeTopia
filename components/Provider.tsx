'use client'

import { SessionProvider } from 'next-auth/react'
                                                                      // not sure what type this needs to be
const Provider = ({children, session} : {children: React.ReactNode, session: any}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
