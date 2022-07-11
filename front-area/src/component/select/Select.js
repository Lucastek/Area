import './Select.scss'

import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../store/Store'
import changeService from './ServiceState'
import host from '../../app.var'

const NB_SERVICES = 6

function Select() {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(Context)
  const [trigger, setTrigger] = useState(0)
  const tabService = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]

  useEffect(() => {
    async function getSelectedServices() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        withCredentials: true,
      }
      const call = await fetch(`${host}/services`, requestOptions)
      if (call.status === 200) {
        const datajson = await call.json()
        let i = 0
        while (i !== NB_SERVICES) {
          tabService[i] = datajson.services[i].active
          i += 1
        }
      }
    }
    getSelectedServices()
    // eslint-disable-next-line
  }, [trigger])

  return (
    <>
      <div className='container'>
        <div className='selectcontainer'>
          <button
            className='selectyoutube'
            onClick={() => {
              changeService('Youtube', !tabService[3])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            YOUTUBE
          </button>
          <button
            className='selectfacebook'
            onClick={() => {
              changeService('Facebook', !tabService[1])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            FACEBOOK
          </button>
          <button
            className='selectinstagram'
            onClick={() => {
              changeService('Instagram', !tabService[0])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            INSTAGRAM
          </button>
          <button
            className='selectosu'
            onClick={() => {
              changeService('Osu', !tabService[2])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            OSU
          </button>
          <button
            className='selectsport'
            onClick={() => {
              changeService('Sport', !tabService[5])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            SPORT
          </button>
          <button
            className='selecttech'
            onClick={() => {
              changeService('Tech', !tabService[4])
              dispatch({ type: 'VALIDATE_SERVICE', payload: null })
              setTrigger(trigger + 1)
            }}
          >
            TECH
          </button>
        </div>
      </div>
    </>
  )
}

export default Select
