import React, { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { UserContext } from '../contexts/userContext'
const AuthPage = () => {
  const context = useContext(UserContext)
  console.log(context)
  return (
    <div>
      <p>
        User: {context.user ? JSON.stringify(context.user.attributes) : 'None'}
      </p>
      {context.user ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <div>
          <button
            onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
          >
            Open Facebook
          </button>
          <button onClick={() => Auth.federatedSignIn()}>
            hostedUi Sign In
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthPage
