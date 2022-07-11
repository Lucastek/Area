import host from '../../app.var'

function changeService(serviceName, serviceState) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serviceName: serviceName,
      serviceState: serviceState,
    }),
    credentials: 'include',
    withCredentials: true,
  }
  return fetch(`${host}/service`, requestOptions)
    .then((data) => data.json())
    .catch((err) => console.log(err))
}

export default changeService
