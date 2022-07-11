import '../Service.scss'

import GitHubLogin from 'react-github-login2'
import Navbar from '../../navbar/Navbar'
import host from '../../../app.var'

function GitLogin(props) {
  const handleLogin = async (GitHubData) => {
    const res = await fetch(`${host}/service/github/getUser`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const data = await res.json()
    props.setUserdata(data)
    props.setConnect(true)
  }

  return (
    <>
      <div>
        <Navbar back='#6e5494'></Navbar>
      </div>
      <div className='container-login-button'>
        <GitHubLogin
          clientId='919dcc45602ba0b18b15'
          className='login-button-github'
          onSuccess={handleLogin}
          onFailure={handleLogin}
        />
      </div>
    </>
  )
}

export default GitLogin
