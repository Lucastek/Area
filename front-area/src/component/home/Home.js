import './Home.scss'

import Radium, { StyleRoot } from 'radium'

import Navbar from '../navbar/Navbar'
import Select from '../select/Select'
import { fadeInUp } from 'react-animations'

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  },
  fadeInSec: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  },
}

function Home(props) {
  function handleLogout() {
    localStorage.clear()
    props.history.push('/')
  }
    return (
      <StyleRoot>
        <div>
          <Navbar back='#42413f'></Navbar>
          <div style={styles.fadeIn}>
            <h2 className='selectservices'>
              Select the services you want to appear on your dashboard
            </h2>
          </div>
          <div style={styles.fadeInSec}>
            <Select></Select>
            <button className='logoutbutton' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </StyleRoot>
    )
}

export default Home
