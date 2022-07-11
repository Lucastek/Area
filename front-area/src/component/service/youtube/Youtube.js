import './Youtube.scss'
import '../Service.scss'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'

import Channel from './Channel'
import Grid from '@material-ui/core/Grid'
import Navbar from '../../navbar/Navbar'
import Slider from '@material-ui/core/Slider'
import Sub from './Sub'
import VideoCount from './VideoCount'
import View from './View'
import YoutubeLogin from './YoutubeLogin'
import host from '../../../app.var'
import isConnected from '../Connection'

function Youtube() {
  const [connect, setConnect] = useState(isConnected())
  const [datayt, setDatayt] = useState('')
  const [valid, setValid] = useState(false)
  const idRef = useRef()
  const [timeS, setTimeS] = useState(0)

  function handleClick() {
    setValid(!valid)
    if (valid !== true && timeS !== 0) {
      idRef.current = setInterval(function handler() {
        async function getInfo() {
          const requestOptions = {
            method: 'GET',
            credentials: 'include',
          }
          const call = await fetch(
            `${host}/service/google/chanel`,
            requestOptions
          )
          if (call.status < 400) {
            const data = await call.json()
            setDatayt(data)
          }
        }
        getInfo()
      }, timeS * 1000)
    } else {
      clearInterval(idRef.current)
    }
  }

  if (connect === false) {
    return <YoutubeLogin setConnect={setConnect} setDatayt={setDatayt} />
  } else {
    return (
      <>
        <div className='yt-bg'>
          <Navbar title='white' back='#FF0000' setValid={setValid}></Navbar>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={5} justify='center'>
                <Channel name={datayt.chanelName}></Channel>
                <View views={datayt.viewCount}></View>
                <Sub subs={datayt.suscriberCount}></Sub>
                <VideoCount count={datayt.videoCount}></VideoCount>
                <div className='slider-yt-container'>
                  How frequent do you want to refresh your service ? Every
                  <div className='slider'>
                    <Slider
                      defaultValue={90}
                      aria-labelledby='discrete-slider-small-steps'
                      step={15}
                      marks
                      min={0}
                      max={90}
                      disabled={valid}
                      onChange={(e, val) => {
                        setTimeS(val)
                      }}
                      valueLabelDisplay='auto'
                    />
                  </div>
                  Secondes.
                  <button onClick={handleClick}>{valid ? 'stop': 'validate'}</button>
                </div>
              </Grid>
            </motion.div>
          </AnimatePresence>
        </div>
      </>
    )
  }
}

export default Youtube
