import './Facebook.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function PageLike(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div style={{ opacity: disabled }} className="fb-content-container">
      <span>You liked <span className="fb-content">{props.like}</span> pages.</span>
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
            <span className='fb-title'>Liked</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default PageLike
