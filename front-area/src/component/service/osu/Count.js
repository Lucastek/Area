import './Osu.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Count(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div className='content-centered' style={{ opacity: disabled }}>
      <div>
        <div className='perfect'>300</div>
        <div className='space'>{props.perfect}</div>
      </div>
      <div>
        <div className='good'>100</div>
        <div className='space'>{props.good}</div>
      </div>
      <div>
        <div className='bad'>50</div>
        <div className='space'>{props.bad}</div>
      </div>
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
            <span className='title'>Count</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default Count
