import { Player } from '@lottiefiles/react-lottie-player';

import React from 'react'

export default function Trophy() {
  return (
  <div className='flex flex-col justify-center items-center'>
    <Player
      src='https://assets1.lottiefiles.com/packages/lf20_myejiggj.json'
      className="player"
      loop
      autoplay
      style={{ height:'300px', width :'500px'}}
    />
    </div>
  )
}


