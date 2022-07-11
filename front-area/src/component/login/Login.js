import './Login.scss'

import { AnimatePresence, motion } from 'framer-motion'
import Radium, { StyleRoot } from 'radium'
import React, { useEffect, useState } from 'react'

import ErrorAlert from '../ErrorAlert'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Link } from 'react-router-dom'
import { fadeIn } from 'react-animations'
import host from '../../app.var'

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
}

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      props.history.push('/home')
    }
  }, [props])

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  async function handleSubmit(event, ID) {
    var obj = JSON.stringify({ email: email, password: password })
    if (event !== undefined) event.preventDefault()
    else obj = JSON.stringify({ email: ID, password: ID })
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: obj,
      withCredentials: true,
    }

    const call = await fetch(`${host}/auth/login`, requestOptions)
    if (call.status === 200) {
      localStorage.setItem('loggedIn', 'true')
      props.history.push('/home')
    }
    if (call.status === 401) {
      setError(true)
    }
  }

  async function handleExternServices(ID) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ID, password: ID }),
      credentials: 'include',
      withCredentials: true,
    }

    const call = await fetch(
      `${host}/auth/register`,
      requestOptions
    )
    if (call.status === 200) {
      localStorage.setItem('loggedIn', 'true')
      props.history.push('/home')
    } else if (call.status === 400) handleSubmit(undefined, ID)
  }

  return (
    <StyleRoot>
      <div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='448'
            height='280.5'
            viewBox='0 0 448 280.5'
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
            <path
              id='Rectangle_18'
              data-name='Rectangle 18'
              d='M42,0H54A42,42,0,0,1,96,42v0a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0v0A42,42,0,0,1,42,0Z'
              transform='translate(172 226)'
              fill='#2a2823'
            />
            <circle
              id='Ellipse_2'
              data-name='Ellipse 2'
              cx='22'
              cy='22'
              r='22'
              transform='translate(199 172)'
              fill='#2a2823'
            />
            <line
              id='Ligne_15'
              data-name='Ligne 15'
              x2='143'
              transform='translate(149 278)'
              fill='none'
              stroke='#2a2823'
              strokeLinecap='round'
              strokeWidth='5'
            />
          </svg>
        </div>
        <div style={styles.fadeIn}>
          <AnimatePresence>
            {error && (
              <motion.div
                isVisible={error}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorAlert></ErrorAlert>
              </motion.div>
            )}
          </AnimatePresence>
          <form className='containerform' onSubmit={handleSubmit}>
            <label> Email</label>
            <input
              autoFocus
              type='email'
              value={email}
              className='inputbar'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label> Password</label>
            <input
              type='password'
              value={password}
              className='inputbar'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='loginbutton'
              type='submit'
              disabled={!validateForm()}
            >
              Login
            </button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Login with Google'
              onSuccess={async (googleData) => {
                handleExternServices(googleData.googleId + 'g')
              }}
              onFailure={async (googleData) => {
                handleExternServices(googleData.googleId + 'g')
              }}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className='loginbutton-extern loginbutton-color-google'
                >
                  <b>Login with Google</b>
                </button>
              )}
            ></GoogleLogin>
            <FacebookLogin
              appId='377900860306439'
              autoLoad={false}
              fields='name,email,picture'
              onClick={async (data) => {
                handleExternServices(data.userID + 'f')
              }}
              callback={async (data) => {
                handleExternServices(data.userID + 'f')
              }}
              cssClass='loginbutton-extern loginbutton-color-fb'
            />
          </form>
          <Link to='/register'>Not registered yet ? Sign up</Link>
        </div>
      </div>
    </StyleRoot>
  )
}
export default Login
