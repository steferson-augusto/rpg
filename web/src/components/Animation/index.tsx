import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'

import { Container } from './styles'

export interface AnimationProps {
  name?: 'loading'
  loop?: boolean
  width?: string
  height?: string
}

const Animation: React.FC<AnimationProps> = ({
  name = 'loading',
  loop = true,
  ...rest
}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current !== null) {
      Lottie.loadAnimation({
        container: (ref.current as unknown) as Element,
        renderer: 'svg',
        loop: loop,
        autoplay: true,
        animationData: require(`../../assets/animations/${name}.json`)
      })
    }
  }, [])

  return <Container ref={ref} {...rest} />
}

export default Animation
