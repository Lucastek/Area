import './Tech.scss'

import Avatar from '@material-ui/core/Avatar'
import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function UserTech(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div className='tc-content' style={{ opacity: disabled }}>
      <Avatar
        alt='Error loading avatar.'
        src={props.avatar}
        style={{ width: '150px', height: '150px' }}
      />
      <span className='tc-username-text'>{props.username}</span>
    </div>
  )

  const objAdd = (
    <div
      className='tc-username-text'
      style={{ opacity: disabled === '1' ? '0' : '1', color: 'white' }}
    >
      ADD A WIDGET !
    </div>
  )
  return (
    <Grid item xs={5}>
      <div>
        <div className='tc-widget'>
          <div className='tc-title-container'>
            <Close
              setDisabled={setDisabled}
              setState={setState}
              state={state}
              color='white'
            ></Close>
            <span className='tc-title'>User Information</span>
          </div>
          <div className='tc-content-container'>
            {disabled === '1' ? objDefault : objAdd}
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default UserTech
