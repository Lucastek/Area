import './Close.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function Close(props) {
  if (props.state === 'activate') {
    return (
      <FontAwesomeIcon
        icon={faTimesCircle}
        color={props.color}
        size='lg'
        onClick={() => {
          props.setState('desactivate')
          props.setDisabled('0')
        }}
        className='button-unactive'
      ></FontAwesomeIcon>
    )
  } else if (props.state === 'desactivate') {
    return (
      <FontAwesomeIcon
        icon={faPlusCircle}
        size='lg'
        color={props.color}
        onClick={() => {
          props.setState('activate')
          props.setDisabled('1')
        }}
        className='button-active'
      ></FontAwesomeIcon>
    )
  }
  return <div>ERROR</div>
}

export default Close
