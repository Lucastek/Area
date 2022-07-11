import './Instagram.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Post(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')
  return (
    <Grid item xs={5}>
      <div>
        <div className='ig-widget'>
          <div className='ig-title-container'>
            <Close
              setDisabled={setDisabled}
              setState={setState}
              state={state}
            ></Close>
            <span className='ig-title'>Post</span>
          </div>
          <div style={{ opacity: disabled }}>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Post
