import React, { useEffect, useRef } from 'react'
import { Button } from '@material-ui/core'
import Lottie from 'lottie-web'

import { BackgroundAnimation, Content, Image } from './styles'
import DiscordIcon from '../../components/DiscordIcon'
import DiscordImage from '../../assets/images/bot-image.png'

const Login: React.FC = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref?.current) {
      Lottie.loadAnimation({
        container: (ref.current as unknown) as Element,
        loop: true,
        renderer: 'svg',
        autoplay: true,
        animationData: require('../../assets/animations/login.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMinYMin slice'
        }
      })
    }
  }, [])

  return (
    <BackgroundAnimation ref={ref}>
      <Content>
        <Image src={DiscordImage} />
        <h3>RPGzin</h3>
        <Button
          variant="contained"
          size="large"
          color="primary"
          href="https://discord.com/api/oauth2/authorize?client_id=783853712409231360&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback&response_type=code&scope=identify%20email%20guilds"
        >
          <DiscordIcon />
          <span className="text-btn">Login com discord</span>
        </Button>
      </Content>
    </BackgroundAnimation>
  )
}

export default Login
