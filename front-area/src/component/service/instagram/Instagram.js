import '../Service.scss'

import React, { useState } from 'react'

import Follower from './Follower'
import Grid from '@material-ui/core/Grid'
import InstaLogin from './InstagramLogin'
import Navbar from '../../navbar/Navbar'
import Post from './Post'
import UserData from './UserData'
import isConnected from '../Connection'

function Instagram() {
  const [connect, setConnect] = useState(isConnected())

  if (connect === false) {
    return <InstaLogin setConnect={setConnect} />
  } else if (document.URL === 'localhost:3000/InstagramValid') {
    setConnect(true)
    return (
      <>
        <div className='ig-bg'>
          <Navbar back='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'></Navbar>
          <Grid container spacing={5} justify='center'>
            <Follower></Follower>
            <Post></Post>
            <UserData></UserData>
          </Grid>
        </div>
      </>
    )
  }
}

export default Instagram
