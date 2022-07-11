import './Osu.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Level(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div
      className='level-container level-content'
      style={{ opacity: disabled }}
    >
      <div className='playcount-container'>
        <span className='playcounttext'>Play Count</span>
        <span className='playcount'>{props.playcount}</span>
      </div>
      <button className='osu-levelbox'>
        <span className='level'>{Math.floor(props.level)}</span>
      </button>
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
            <span className='title'>Level</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default Level
