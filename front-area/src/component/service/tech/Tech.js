import './Tech.scss'
import '../Service.scss'

import React, { useState } from 'react'

import FollowerTech from './FollowerTech'
import FollowingTech from './FollowingTech'
import GitLogin from './TechLogin'
import Grid from '@material-ui/core/Grid'
import Navbar from '../../navbar/Navbar'
import UserTech from './UserTech'
import isConnected from '../Connection'

function Tech() {
  const [connect, setConnect] = useState(isConnected())
  const [userdata, setUserdata] = useState('')

  if (connect === false) {
    return <GitLogin setConnect={setConnect} setUserdata={setUserdata} />
  } else if (userdata !== undefined) {
    return (
      <>
        <div className='tc-bg'>
          <Navbar back='#6e5494'></Navbar>
          <Grid container spacing={5} justify='center'>
            <UserTech username={userdata.login} avatar={userdata.avatar} />
            <FollowerTech data={userdata.followers}></FollowerTech>
            <FollowingTech data={userdata.following}></FollowingTech>
          </Grid>
        </div>
      </>
    )
  }
}

export default Tech
