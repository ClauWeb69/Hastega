import { useRouter } from "next/router";
import { useState } from 'react';
import { signIn, signOut, getSession, useSession } from 'next-auth/react';

export default function LoginForm() {
  const { data: session, status } = useSession()

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkUser = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result.error) {
      console.log(result.error)
    } else {
      router.push('/Auth/Home')
    }
  }
  if (status === "authenticated") {
    return (
      <>
        Loggato con {session.user.email} <br />
        <button onClick={() => signOut()}>Logout</button>
      </>
    )
  }
  return (
        
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md px-6 py-8 bg-white shadow-md">
              <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
              <form onSubmit={checkUser}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    Accedi
                  </button>
                </div>
              </form>
            </div>
          </div>
       
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session }
  }
}