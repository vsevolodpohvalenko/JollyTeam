import React from 'react'
import { Footer } from '../layout/Footer/Footer'
import HeaderContainer from '../layout/Header/HeaderContainer'

 
export const MainTemplate = (props) => {
return ( <div >
    <HeaderContainer/>
    {props.children}
    <Footer/>
    </div>
)
}