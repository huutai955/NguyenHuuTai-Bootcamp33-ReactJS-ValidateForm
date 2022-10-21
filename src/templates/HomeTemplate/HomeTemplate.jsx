import React from 'react'
import HeaderHome from '../../Components/HeaderHome/HeaderHome'
import {Outlet} from 'react-router-dom'
import FooterHome from '../../Components/HeaderHome/FooterHome'

export default function HomeTemplate() {
  return (
    <div>
        <HeaderHome />
        <div style={{minHeight:600}}>
        <Outlet  />
        </div>
        <FooterHome />
    </div>
  )
}
