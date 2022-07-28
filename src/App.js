import React, { useState } from 'react';
import Wavesurfer from 'react-wavesurfer';

function App() {
  const [position, setPosition] = useState(0);
  const [muted, setMuted] = useState(false);

  const handlePositionChange = (position) => { /* ... */ };
  const onReadyHandler = () => console.log('done loading!');

  return (
    <Wavesurfer
      src="./assets/128-Dhoke Pyaar Ke - B Praak 128 Kbps.mp3"
      position={position}
      onPositionChange={handlePositionChange}
      onReady={onReadyHandler}
      playing={playing}
      muted={muted}
    />
  );
}

export default App