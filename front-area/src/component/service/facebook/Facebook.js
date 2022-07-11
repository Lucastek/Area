import './Facebook.scss'
import '../Service.scss'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import Birthday from './Birthday'
import FBLogin from './FacebookLogin'
import Friend from './Friend'
import Grid from '@material-ui/core/Grid'
import Information from './Information'
import Navbar from '../../navbar/Navbar'
import PageLike from './PageLike'
import host from '../../../app.var'
import isConnected from '../Connection'

function Facebook() {
  const [connect, setConnect] = useState(isConnected())
  const [ userFB, setUserFB] = useState()

  useEffect(() => {
    async function getFacebook() {
      const test = await fetch(`${host}/service/facebook/user`, {
        method: "GET",
        credentials: 'include'
      });
      setUserFB(await test.json())
    }
    setTimeout(getFacebook, 1000)
  }, [connect])

  if (connect === false) {
    return <FBLogin setConnect={setConnect} />
  } else if (userFB !== undefined) {
    return (
      <AnimatePresence>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className='fb-bg'
        >
          <Navbar title='white' back='#1877F2'></Navbar>
          <Grid container spacing={5} justify='center'>
            <Information name={userFB.name} picture={userFB.picture.data.url}></Information>
            <PageLike like={userFB.likes.data.length}></PageLike>
            <Friend number={userFB.friends.summary.total_count}></Friend>
            <Birthday birthday={userFB.birthday}></Birthday>
          </Grid>
        </motion.div>
      </AnimatePresence>
    )
  }
}

export default Facebook
