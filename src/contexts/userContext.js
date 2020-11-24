import React, { createContext, useEffect, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'

export const UserContext = createContext()

const initialFormState = {
  username: '',
  password: '',
  email: '',
  authCode: '',
  formType: 'signUp',
}
export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [formState, updateFormState] = useState(initialFormState)

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => setUser(userData))
          break
        case 'signOut':
          deneme()
          break
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data)
          break
        default:
          return
      }
    })
  }, [])
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'))
  }
  async function deneme() {
    setUser(null)
    updateFormState(() => ({ ...formState, formType: 'signIn' }))
  }
  return (
    <UserContext.Provider value={{ user, setUser, formState, updateFormState }}>
      {props.children}
    </UserContext.Provider>
  )
}
