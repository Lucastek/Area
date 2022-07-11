import './App.scss'

import React, { useEffect, useState } from 'react'

import MobileView from './component/mobile/MobileView'
import Router from './component/router/Router'

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', changeView)
  }, [])

  function changeView() {
    setWidth(window.innerWidth)
  }
  if (width > 1600) {
    return <Router></Router>
  } else {
    return <MobileView />
  }
}

export default App
