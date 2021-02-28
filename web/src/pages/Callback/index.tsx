/* eslint-disable multiline-ternary */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lottie from 'lottie-web'

import { useAuth } from '../../contexts/auth'
import Animation from '../../components/Animation'
import { BackgroundAnimation, Absolute } from './styles'
import Unauthorized from '../../components/Unauthorized'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Callback: React.FC = () => {
  const query = useQuery()
  const { signin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!loading) {
      Lottie.loadAnimation({
        container: (ref.current as unknown) as Element,
        loop: false,
        renderer: 'svg',
        autoplay: true,
        animationData: require('../../assets/animations/login_background.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMinYMin slice'
        }
      })
    }
  }, [loading])

  const onError = useCallback(() => {
    setLoading(false)
    setTimeout(() => {
      seterror(true)
    }, 1000)
  }, [])

  useEffect(() => {
    const code = query.get('code')
    console.log(code)
    setTimeout(() => {
      setLoading(false)
    }, 750)
    signin(`${code}`).catch(() => onError())
  }, [])

  return (
    <BackgroundAnimation ref={ref}>
      <Absolute>
        {error ? <Unauthorized /> : <Animation width="50vh" height="50vh" />}
      </Absolute>
    </BackgroundAnimation>
  )
}

export default Callback
