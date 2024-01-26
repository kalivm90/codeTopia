'use client'
import {type Session} from "next-auth"
import { SessionProvider } from 'next-auth/react'
                                                                      // not sure what type this needs to be
const Provider = ({children, session} : {
  children: React.ReactNode,
  session?: Session,
}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
