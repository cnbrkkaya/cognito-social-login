import React, { useEffect, useContext } from 'react'
import { listMenus } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { UserContext } from '../contexts/userContext'

const MenuPage = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    getAllCompanys()
  }, [])

  const getAllCompanys = async () => {
    if (!user) {
      try {
        const res = await API.graphql({
          query: listMenus,
          authMode: 'AWS_IAM',
        })

        console.log(res)
      } catch (err) {
        console.log('error getting all companies:', err)
      }
    } else {
      try {
        const todoData = await API.graphql(graphqlOperation(listMenus))
        console.log(todoData)
      } catch (err) {
        console.log('error getting all companies:', err)
      }
    }
  }
  return (
    <div>
      <p>MenuPage</p>
      {/* <button onClick={listMenus}>Click</button> */}
    </div>
  )
}

export default MenuPage
