"use client"

import Link from "next/link"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"


const Nav = () => {
  const {data: session, status} = useSession();
  const [providers, setProviders] = useState<null | Record<any, any>>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      if (response) {
        setProviders(response);
      }
    }

    setUpProviders();
  }, [session, status])

  // useEffect(() => {
  //   // Fetch providers only if the session is available
  //   console.log(status, session);
  //   if (status === 'authenticated') {
  //     const setUpProviders = async () => {
  //       const response = await getProviders();
  //       if (response) {
  //         setProviders(response);
  //       }
  //     };

  //     setUpProviders();
  //   }
  // }, [status]);



  // Using the signout function from next-auth directly in the element made typescript mad
  const handleSignOutClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    await signOut();
    event.preventDefault();
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="CodeTopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
      <p className="logo_text">CodeTopia</p>

      {/* Desktop Navigation - sm is based on min-width! USE "max-sm:flex" instead, max-sm uses max-width instead of min-width */}
      <div className="sm:flex hidden" id="large">

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">

            <Link href="/create-prompt" className="black_btn">
                Create Post
            </Link>

            <button type="button" onClick={handleSignOutClick} className="outline_btn">Sign Out</button>

            <Link href="/profile">
              <Image 
                src={session?.user?.image ?? "assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>

          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => {
                return <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              })
            }
          </>
        )}
      </div>

      {/* Mobile Navigation - on sml screens this container is hidden*/}
      <div className="sm:hidden flex relative" id="small">
            {session?.user ? (
              <div>
                <Image 
                  src={session?.user?.image ?? "assets/images/logo.svg"}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                  onClick={() => {setToggleDropdown(!toggleDropdown)}}
                />

                {toggleDropdown && (
                  <div className="dropdown">

                    <Link 
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>

                    <Link 
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>

                    <button 
                      type="button" 
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }} 
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <>
                {providers && 
                  Object.values(providers).map((provider) => {
                    return <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  })
                }
              </>
            )}
      </div>

    </nav>
  )
}

export default Nav
