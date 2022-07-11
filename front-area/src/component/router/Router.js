import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import Facebook from '../service/facebook/Facebook'
import Home from '../home/Home'
import Instagram from '../service/instagram/Instagram'
import Login from '../login/Login'
import Osu from '../service/osu/Osu'
import ProtectedRoute from './ProtectedRoute'
import React from 'react'
import Register from '../register/Register'
import Sport from '../service/sport/Sport'
import Tech from '../service/tech/Tech'
import Youtube from '../service/youtube/Youtube'

function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route path='/login' component={Login}></Route>
            <Route component={Register} path='/register'></Route>
            <ProtectedRoute component={Home} path='/home'></ProtectedRoute>
            <ProtectedRoute
              component={Instagram}
              path='/instagram'
            ></ProtectedRoute>
            <ProtectedRoute
              component={Facebook}
              path='/facebook'
            ></ProtectedRoute>
            <ProtectedRoute
              component={Youtube}
              path='/youtube'
            ></ProtectedRoute>
            <ProtectedRoute component={Sport} path='/sport'></ProtectedRoute>
            <ProtectedRoute component={Tech} path='/tech'></ProtectedRoute>
            <ProtectedRoute component={Osu} path='/osu'></ProtectedRoute>
            <Route path='*' component={() => '404 not found'} />
          </Switch>
        </div>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default Router
