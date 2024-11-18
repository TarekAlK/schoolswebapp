import React from 'react'
import NavBar from './components/NavBar'
import MainContent from './components/MainContent'
import Curriculum from './components/Curriculum'
import MoreInfos from './components/MoreInfos'

export default function App() {
  return (
    <div>
      <NavBar />
      <MainContent />
      <Curriculum />
      <MoreInfos />
    </div>
  )
}
