import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/userContext'
import { Link } from 'react-router-dom'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createOrder } from '../graphql/mutations'
import { listOrders } from '../graphql/queries'

const OrderPage = () => {
  const { user } = useContext(UserContext)

  useEffect(() => {
    listOrders()
  }, [])

  async function listOrders() {
    try {
      const orderData = await API.graphql(graphqlOperation(listOrders))
      const orders = orderData.data.listOrders.items
      console.log(orders)
    } catch (err) {
      console.log('error ', err)
    }
  }

  async function createOrder() {
    const input = {
      id: '123231',
      menuName: 'aaa',
      totalPrice: 12,
    }
    try {
      const orderData = await API.graphql(
        graphqlOperation(createOrder, { input })
      )
      console.log(orderData)
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <p>OrderPage</p>
          <button onClick={createOrder}>createOrder</button>
          <button onClick={listOrders}>listOrders</button>
        </div>
      ) : (
        <div>
          You are not Authenticated <Link to='auth'>Click</Link>
        </div>
      )}
    </div>
  )
}

export default OrderPage
