import '../Service.scss'

import GoogleLogin from 'react-google-login'
import Navbar from '../../navbar/Navbar'
import host from '../../../app.var'

function YoutubeLogin(props) {
  const handleLogin = async (googleData) => {
    const res = await fetch(
      `${host}/service/google/setToken/` + googleData.accessToken,
      {
        method: 'POST',
        credentials: 'include',
      }
    )
    if (res.status < 400) {
      const data = await fetch(`${host}/service/google/chanel`, {
        method: 'GET',
        credentials: 'include',
      })
      const datayt = await data.json()
      if (data.status < 400) {
        props.setDatayt(datayt)
        props.setConnect(true)
      }
    }
  }

  return (
    <>
      <div>
        <Navbar back='#FF0000'></Navbar>
      </div>
      <div className='container-login-button'>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
          scope='https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className='login-button-youtube'
            >
              Login with Youtube
            </button>
          )}
        >
          Login with Youtube
        </GoogleLogin>
      </div>
    </>
  )
}

export default YoutubeLogin
