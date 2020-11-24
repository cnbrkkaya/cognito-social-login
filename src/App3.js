import React, { useEffect, useState, useContext } from 'react'

import { Auth } from 'aws-amplify'
import { UserContext } from './contexts/userContext'
import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import OrderPage from './Pages/OrderPage'
import MenuPage from './Pages/MenuPage'
import Navbar from './Components/Navbar'
import AuthPage from './Pages/AuthPage'
const hist = createBrowserHistory()
function App() {
  const { user } = useContext(UserContext)

  console.log(user)

  return (
    <div>
      <Router history={hist}>
        <Navbar />
        <div>
          <Switch>
            <Route
              exact
              path='/order'
              render={(props) => {
                return <OrderPage {...props} />
              }}
            />
            <Route
              exact
              path='/menu'
              render={(props) => {
                return <MenuPage {...props} />
              }}
            />
            <Route
              exact
              path='/auth'
              render={(props) => {
                return <AuthPage {...props} />
              }}
            />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
