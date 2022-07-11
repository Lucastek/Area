import '../Service.scss'

import FacebookLogin from 'react-facebook-login'
import Navbar from '../../navbar/Navbar'
import host from '../../../app.var'

function FBLogin(props) {
  const handleLogin = async (facebookData) => {
    const res = await fetch(`${host}/service/facebook/setToken/` + facebookData.accessToken, {
      method: "POST",
      credentials: 'include'
    })
    if (res.status < 400)
      props.setConnect(true)
  }

  return (
    <>
      <div>
        <Navbar back='#1877F2'></Navbar>
      </div>
      <div className='container-login-button'>
        <FacebookLogin
          appId='377900860306439'
          autoLoad={false}
          fields='id,name,friends,birthday,picture,likes'
          callback={handleLogin}
          cssClass='login-button-facebook'
        />
      </div>
    </>
  )
}

export default FBLogin
