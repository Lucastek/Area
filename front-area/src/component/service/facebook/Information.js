import './Facebook.scss'

import Avatar from '@material-ui/core/Avatar'
import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Information(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div style={{ opacity: disabled }} className="fb-content-name">
      <Avatar
        alt='Error loading avatar.'
        src={props.picture}
        style={{ width: '150px', height: '150px' }}
      />
      <span className="fb-username-text">{props.name}</span>
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
            <span className='fb-title'>User Information</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default Information
