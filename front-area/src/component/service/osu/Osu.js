import './Osu.scss'
import '../Service.scss'

import { useEffect, useState } from 'react'

import Acc from './Accuracy'
import Count from './Count'
import Grid from '@material-ui/core/Grid'
import Level from './Level'
import Navbar from '../../navbar/Navbar'
import Rank from './Rank'
import React from 'react'
import dataInit from './data.json'
import host from '../../../app.var'

function Osu() {
  const [ username, setUsername ] = useState("WhiteCat");
  const [ dataOsu , setDataOsu ] = useState(dataInit)

  useEffect(() => {
    const handleLogin = async () => {
      const res = await fetch(`${host}/service/osu/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ u: username }),
        credentials: 'include',
        withCredentials: true,
      })
      const data = await res.json()
      if (data.length !== 0) {
        if (data[0].accuracy !== null)
          setDataOsu(data)
      }
    }
    handleLogin()
  }, [username])

    return (
      <>
        <div className='osubg'>
          <Navbar title='white' back='#E866A0'></Navbar>
          <input
              autoFocus
              type='username'
              value={username}
              className='username-box-osu'
              onChange={(e) => setUsername(e.target.value)}
              placeholder="search for any user"
            />
          <Grid container spacing={5} justify='center'>
            <Rank rankg={dataOsu[0].pp_rank} rankc={dataOsu[0].pp_country_rank}></Rank>
            <Count perfect={dataOsu[0].count300} good={dataOsu[0].count100} bad={dataOsu[0].count50}></Count>
            <Level level={dataOsu[0].level} playcount={dataOsu[0].playcount}></Level>
            <Acc accuracy={dataOsu[0].accuracy} pp={dataOsu[0].pp_raw}></Acc>
          </Grid>
        </div>
      </>
    )
}
//
export default Osu
