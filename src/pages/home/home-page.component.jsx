import React from 'react'
import homeSvg from '../../assets/home.svg'
//style
import { HomepageContainer, HeroContainer } from './home.style'

const HomePage = () => {
    return (
        <HomepageContainer>
            THIS PAGE IS TESTING FOR CREATELLA
            <HeroContainer src={homeSvg}/>
        </HomepageContainer>
    )
}

export default HomePage
