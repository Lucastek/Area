import './Navbar.scss'

import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../store/Store'
import ItemNav from './ItemNav'
import host from '../../app.var'

function Navbar(props) {
  const { state } = useContext(Context)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const array = [<ItemNav key='H' to='Home'></ItemNav>]
    function updateArray(status, name, key) {
      const obj = <ItemNav key={key} to={name}></ItemNav>
      if (status === true) {
        if (!!~array.indexOf(obj) === false) array.push(obj)
      } else array.slice(array.indexOf(obj))
      setSelected((selected) => [...array])
    }
    async function fillNavBar() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        withCredentials: true,
      }
      const call = await fetch(`${host}/services`, requestOptions)
      if (call.status === 200) {
        const datajson = await call.json()
        updateArray(datajson.services[3].active, 'Youtube', 'Y')
        updateArray(datajson.services[1].active, 'Facebook', 'F')
        updateArray(datajson.services[0].active, 'Instagram', 'I')
        updateArray(datajson.services[2].active, 'Osu', 'O')
        updateArray(datajson.services[5].active, 'Sport', 'S')
        updateArray(datajson.services[4].active, 'Tech', 'T')
        return datajson
      }
    }
    setTimeout(fillNavBar, 100)
  }, [state.validateService])

  return (
    <div
      style={{
        position: 'fixed',
        top: '0px',
        width: '100%',
        backgroundColor: props.back,
        background: props.back,
        boxShadow: '0px 0px 13px 1px rgba(0,0,0,0.45)',
      }}
    >
      {selected}
    </div>
  )
}

export default Navbar
