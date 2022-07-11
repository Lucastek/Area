import './Facebook.scss'

import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useState } from 'react'

function Birthday(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')

  const objDefault = (
    <div style={{ opacity: disabled }} className="fb-content-container">
      <span>Your birthday is in <span className="fb-content">{dayBeforeBirthday(props.birthday)}</span> days.</span>
    </div>
  )
  const objAdd = (
    <div className="fb-content-container" style={{ opacity: disabled === '1' ? '0' : '1' }}>ADD A WIDGET !</div>
  )

  function dayBeforeBirthday(birthDate) {

    const currentDate = new Date();
    const birthday = new Date(birthDate);
    const currentYear = currentDate.getFullYear();

    birthday.setFullYear(currentYear)
    birthday.setFullYear( (birthday.getTime() < currentDate.getTime() ? currentYear + 1 : currentYear)  );
    const timeBeforeBirthday = birthday.getTime() - currentDate.getTime();
    const dayBeforeBirthday = (timeBeforeBirthday / (1000 * 3600 * 24)).toFixed(0)

    return (dayBeforeBirthday);
  }

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
            <span className='fb-title'>Birthday</span>
          </div>
          {disabled === '1' ? objDefault : objAdd}
        </div>
      </div>
    </Grid>
  )
}

export default Birthday
