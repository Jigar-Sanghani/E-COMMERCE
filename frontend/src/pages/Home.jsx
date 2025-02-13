import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Newslaterbox from '../components/Newslaterbox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Ourpolicy />
      <Newslaterbox />
    </div>
  )
}

export default Home