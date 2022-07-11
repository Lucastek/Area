import '../Service.scss'
import './Instagram.scss'

import InstagramLogin from 'react-instagram-login'
import Navbar from '../../navbar/Navbar'

function InstaLogin(props) {
  const handleLogin = async () => {
    props.setConnect(true)
  }

  return (
    <>
      <div>
        <Navbar back='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'></Navbar>
      </div>
      <div className='container-login-button'>
        <InstagramLogin
          clientId='2158266017636960'
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cssClass='login-button-instagram'
        />
      </div>
    </>
  )
}

export default InstaLogin
