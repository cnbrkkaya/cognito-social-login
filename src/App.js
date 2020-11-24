/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import { useState, useEffect, useContext } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { UserContext } from './contexts/userContext'

function App() {
  const { updateFormState, formState, user, setUser } = useContext(UserContext)

  const onChange = (e) => {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
    console.log(formState)
  }
  const { formType } = formState
  async function signUp() {
    const { username, email, password } = formState
    await Auth.signUp({ username, password, attributes: { email } })
    updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }))
  }
  async function confirmSignUp() {
    const { username, authCode } = formState
    await Auth.confirmSignUp(username, authCode)
    updateFormState(() => ({ ...formState, formType: 'signIn' }))
  }
  async function signIn() {
    const { username, password } = formState
    await Auth.signIn({ username, password })
    const tempUser = await Auth.currentAuthenticatedUser()
    setUser(tempUser)
    updateFormState(() => ({ ...formState, formType: 'signedIn' }))
  }
  console.log(user)
  console.log(formState.formType)

  return (
    <div>
      {formType === 'signUp' && (
        <div>
          <input name='username' onChange={onChange} placeholder='username' />
          <input
            name='password'
            type='password'
            onChange={onChange}
            placeholder='password'
          />
          <input
            name='email'
            type='email'
            onChange={onChange}
            placeholder='email'
          />
          <button onClick={signUp}>Sign Up</button>
          <button
            onClick={() =>
              updateFormState(() => ({
                ...formState,
                formType: 'signIn',
              }))
            }
          >
            Sign In
          </button>
        </div>
      )}
      {formType === 'confirmSignUp' && (
        <div>
          <input name='authCode' onChange={onChange} placeholder='authCOde' />

          <button onClick={confirmSignUp}>Confirm Sign Up</button>
        </div>
      )}
      {formType === 'signIn' && (
        <div>
          <input name='username' onChange={onChange} placeholder='username' />
          <input
            name='password'
            type='password'
            onChange={onChange}
            placeholder='password'
          />

          <button onClick={signIn}>Sign In</button>
          <button
            onClick={() =>
              updateFormState(() => ({
                ...formState,
                formType: 'signUp',
              }))
            }
          >
            Sign Up
          </button>
        </div>
      )}
      {formType === 'signedIn' && (
        <div>
          Hello {user.username}
          <button
            onClick={() => {
              Auth.signOut()
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default App
