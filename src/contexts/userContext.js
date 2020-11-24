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
    console.log('UseEffect ici')
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log('HUB ici')
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          checkUser()
          break
        case 'signOut':
          updateFormState(() => ({ ...formState, formType: 'signIn' }))
          setUser(null)
          break
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data)
          break
        default:
          return
      }
    })

    checkUser()
  }, [])

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
      console.log('user', user)
      updateFormState(() => ({ ...formState, formType: 'signedIn' }))
    } catch (error) {
      //updateUser(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateFormState, formState }}>
      {props.children}
    </UserContext.Provider>
  )
}

// function getUser() {
//   return Auth.currentAuthenticatedUser()
//     .then((userData) => userData)
//     .catch(() => console.log('Not signed in'))
// }

// getUser().then((userData) => setUser(userData))
