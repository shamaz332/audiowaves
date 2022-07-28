import React, { useCallback, useRef, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { WaveSurfer, WaveForm, Region } from 'wavesurfer-react'
import './App.css'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min'
const Buttons = styled.div`
  display: inline-block;
`

const Button = styled.button``

function App() {
  const [timelineVis, setTimelineVis] = useState(true)

  const plugins = useMemo(() => {
    return [
      {
        plugin: RegionsPlugin,
        options: { dragSelection: true },
      },
      timelineVis && {
        plugin: TimelinePlugin,
        options: {
          container: '#timeline',
          primaryLabelInterval: 1,
          secondaryLabelInterval: 0.5,
          primaryLabelFormat: (time) => {
            return time / 1000 + 's'
          },
        },
      },
      {
        plugin: SpectrogramPlugin,
        options: {
          container: '#spectrogram-timeline',
        },
      },
    ].filter(Boolean)
  }, [timelineVis])

  const wavesurferRef = useRef()
  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer
    console.log(wavesurferRef.current)
    if (wavesurferRef.current) {
      wavesurferRef.current.load('/voiseed_sample.wav')

      wavesurferRef.current.on('ready', () => {
        console.log('WaveSurfer is ready')
        wavesurferRef.current
          .addPlugin(
            SpectrogramPlugin.create({
              container: '#spectrogram-timeline',
              labels: true,
            })
          )
          .initPlugin('spectrogram')
      })

      wavesurferRef.current.on('region-removed', (region) => {
        console.log('region-removed --> ', region)
      })

      wavesurferRef.current.on('loading', (data) => {
        console.log('loading --> ', data)
      })

      if (window) {
        window.surferidze = wavesurferRef.current
      }
    }
  }, [])

  const play = useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  return (
    <div className='App'>
      <WaveSurfer plugins={plugins} onMount={handleWSMount}>
        <WaveForm id='waveform'></WaveForm>
        <div id='timeline' />
        <br />
      </WaveSurfer>
      <Buttons>
        <Button onClick={play}>Play / Pause</Button>
      </Buttons>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
