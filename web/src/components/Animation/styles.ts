import styled from 'styled-components'

import { AnimationProps } from './index'

export const Container = styled.div<AnimationProps>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`
