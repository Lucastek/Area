import './Navbar.scss'

import { AnimatePresence, motion } from 'framer-motion'

import React from 'react'
import { withRouter } from 'react-router-dom'

function ItemNav(props) {
  const path = '/' + props.to


  function goToPage() {
    props.history.push(path)
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.button
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='navbutton'
        onClick={goToPage}
      >
        {props.to.toUpperCase()}
      </motion.button>
    </AnimatePresence>
  )
}

export default withRouter(ItemNav)
