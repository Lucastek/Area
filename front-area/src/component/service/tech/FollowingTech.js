import './Tech.scss'

import { useEffect, useState } from 'react'

import Carousel from 'react-elastic-carousel'
import Close from '../../close/Close'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import UserTechItem from './UserTechItem'

function FollowingTech(props) {
  const [state, setState] = useState('activate')
  const [disabled, setDisabled] = useState('1')
  const [itemArray, setItemArray] = useState([])

  const objDefault = (
    <div className='tc-content'>
      <Carousel
        className='tc-carousel-follower'
        itemsToShow={3}
        enableAutoPlay={true}
      >
        {itemArray}
      </Carousel>
    </div>
  )

  const objAdd = (
    <div
      className='tc-username-text'
      style={{ opacity: disabled === '1' ? '0' : '1', color: 'white' }}
    >
      ADD A WIDGET !
    </div>
  )

  useEffect(() => {
    const array = []
    function updateArray() {
      var i = 0
      while (props.data[i] !== undefined) {
        const obj = (
          <UserTechItem
            key={i}
            login={props.data[i].login}
            avatar={props.data[i].avatar_url}
          ></UserTechItem>
        )
        if (!!~array.indexOf(obj) === false) {
          array.push(obj)
        }
        i += 1
      }
      setItemArray((itemArray) => [...array])
    }
    updateArray()
  }, [props])

  return (
    <Grid item xs={5}>
      <div>
        <div className='tc-widget'>
          <div className='tc-title-container'>
            <Close
              setDisabled={setDisabled}
              setState={setState}
              state={state}
              color='white'
            ></Close>
            <span className='tc-title'>Following</span>
          </div>
          <div className='tc-content-container'>
            {disabled === '1' ? objDefault : objAdd}
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default FollowingTech
