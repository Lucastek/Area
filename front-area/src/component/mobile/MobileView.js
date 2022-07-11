import './MobileView.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons'

function MobileView() {
  return (
    <div className='mobile-container'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='400'
        height='200.5'
        viewBox='0 0 448 200.5'
      >
        <text
          id='AREA'
          fill='#2a2823'
          fontSize='140'
          fontFamily='Raleway-ExtraBold, Raleway'
          fontWeight='800'
        >
          <tspan x='41.37' y='132'>
            AREA
          </tspan>
        </text>
      </svg>
      <div className='mobile-warn-text'>
        Oops! It looks like your screen is too small...
      </div>
      <div className='mobile-grid'>
        <button className='mobile-dl-button'>
          <FontAwesomeIcon icon={faAppleAlt} size='lg'></FontAwesomeIcon>
          <span className='mobile-dl-text'>DOWNLOAD IOS APP HERE !</span>
        </button>
      </div>
    </div>
  )
}

export default MobileView
