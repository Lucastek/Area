import './Sport.scss'
import '../Service.scss'

import Grid from '@material-ui/core/Grid';
import Navbar from "../../navbar/Navbar"
import React from 'react'

function Sport() {
  return (
    <>
    <div className="sp-bg">
      <Navbar back="#1F6118"></Navbar>
        <Grid container spacing={5} justify="center">
        </Grid>
    </div>
  </>
  )
}

export default Sport
