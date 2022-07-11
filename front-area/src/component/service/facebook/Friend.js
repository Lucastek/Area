import './Facebook.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Friend(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div style={{ opacity: disabled }} className="fb-content-container">
      <span>You have <span className='fb-content'>{props.number}</span> friends.
      </span>
    </div>
  )
  const objAdd = (
    <div className="fb-content-container" style={{ opacity: disabled === '1' ? '0' : '1' }}>ADD A WIDGET !</div>
  )
  return (
    <Grid item xs={5}>
      <div>
        <div className='fb-widget'>
          <div className='fb-title-container'>
            <Close
              color="white"
              setDisabled={setDisabled}
              setState={setState}
              state={state}
            ></Close>
            <span className='fb-title'>Friend</span>
          </div>
          <div className=''>
          {disabled === '1' ? objDefault : objAdd}
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Friend
