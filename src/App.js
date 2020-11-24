/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import { useState, useEffect, useContext } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { UserContext } from './contexts/userContext'

function App() {
  const context = useContext(UserContext)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      context.setUser(user)

      context.updateFormState(() => ({
        ...context.formState,
        formType: 'signedIn',
      }))
    } catch (error) {
      //updateUser(null)
    }
  }

  // async function setAuthListener() {
  //   Hub.listen('auth', (data) => {
  //     switch (data.payload.event) {
  //       case 'signIn':
  //         console.log('user signed in')
  //         break
  //       case 'signUp':
  //         console.log('user signed up')
  //         break
  //       case 'signOut':
  //         updateFormState(() => ({ ...formState, formType: 'signIn' }))
  //         break
  //       // case 'signIn_failure':
  //       //   console.log('user sign in failed')
  //       //   break
  //       // case 'configured':
  //       //   console.log('the Auth module is configured')
  //       default:
  //         return
  //     }
  //   })
  // }

  const onChange = (e) => {
    e.persist()
    context.updateFormState(() => ({
      ...context.formState,
      [e.target.name]: e.target.value,
    }))
    // console.log(formState)
  }
  const { formType } = context.formState

  async function signUp() {
    const { username, email, password } = context.formState
    await Auth.signUp({ username, password, attributes: { email } })
    context.updateFormState(() => ({
      ...context.formState,
      formType: 'confirmSignUp',
    }))
  }
  async function confirmSignUp() {
    const { username, authCode } = context.formState
    await Auth.confirmSignUp(username, authCode)
    context.updateFormState(() => ({
      ...context.formState,
      formType: 'signIn',
    }))
  }
  async function signIn() {
    const { username, password } = context.formState
    await Auth.signIn({ username, password })
    context.updateFormState(() => ({
      ...context.formState,
      formType: 'signedIn',
    }))
    checkUser()
  }
  console.log(context.user)
  console.log(context.formState.formType)

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
              context.updateFormState(() => ({
                ...context.formState,
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
              context.updateFormState(() => ({
                ...context.formState,
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
          Hello {context.user.username}
          <button onClick={async () => await Auth.signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default App
