import './Osu.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Rank(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div className='content' style={{ opacity: disabled }}>
      <Grid>
        <Grid
          container
          direction='row'
          justify='space-around'
          alignItems='center'
        >
          <span className='rank'>Global Rank</span>
          <span className='player-rank'>#{props.rankg}</span>
        </Grid>
        <Grid
          container
          direction='row'
          justify='space-around'
          alignItems='center'
        >
          <span className='rank'>Country Rank</span>
          <span className='player-rank'>#{props.rankc}</span>
        </Grid>
      </Grid>
    </div>
  )
  const objAdd = (
    <div
      className='add-widget-osu'
      style={{
        opacity: disabled === '1' ? '0' : '1',
        fontSize: '25px',
      }}
    >
      ADD A WIDGET !
    </div>
  )
  return (
    <Grid item xs={5}>
      <div>
        <div className='widget'>
          <div className='title-container'>
            <Close
              color='rgb(255, 215, 85)'
              setDisabled={setDisabled}
              setState={setState}
              state={state}
            ></Close>
            <span className='title'>Ranking</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default Rank
