import './Youtube.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function View(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div style={{ opacity: disabled }}>
      <span>
        Your channel cumulate <span className='yt-views'>{props.views}</span>{' '}
        views.
      </span>
    </div>
  )
  const objAdd = (
    <div style={{ opacity: disabled === '1' ? '0' : '1' }}>ADD A WIDGET !</div>
  )

  return (
    <Grid item xs={5}>
      <div>
        <div className='yt-widget'>
          <div className='yt-title-container'>
            <Close
              color='#FF0000'
              setDisabled={setDisabled}
              setState={setState}
              state={state}
            ></Close>
            <span className='yt-title'>Views</span>
          </div>
          <div className='yt-view-content-container'>
            {disabled === '1' ? objDefault : objAdd}
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default View
