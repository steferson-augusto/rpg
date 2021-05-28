import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { Container } from './styles'
import Animation from '../../../components/Animation'
import Conditional from '../../../components/Conditional'

interface CardProps {
  title: string
  preTitle?: string
  loading: boolean
  loadingHeight?: string
  error: boolean
  empty: boolean
  className?: string
  action?: {
    icon: 'add' | 'edit'
    shouldRender?: boolean | undefined
    onClick: () => void
  }
}

const Card: React.FC<CardProps> = ({
  title,
  preTitle,
  children,
  loading,
  loadingHeight = '100px',
  error,
  empty,
  className,
  action
}) => {
  return (
    <Container className={className}>
      <div
        className={
          action?.icon && action?.shouldRender ? 'title with-action' : 'title'
        }
      >
        <h3>
          <span>{preTitle}</span>
          {title}
        </h3>
        <Conditional visible={action?.icon && action?.shouldRender}>
          <IconButton size="small" onClick={action?.onClick}>
            <Icon>{action?.icon}</Icon>
          </IconButton>
        </Conditional>
      </div>
      <Conditional visible={loading}>
        <Animation height={loadingHeight} />
      </Conditional>
      <Conditional visible={error}>
        <h6 className="failed">Tente novamente mais tarde</h6>
      </Conditional>
      <Conditional visible={empty}>
        <h6 className="empty">Sem conteúdo</h6>
      </Conditional>
      <Conditional visible={!loading && !error && !empty}>
        {children}
      </Conditional>
    </Container>
  )
}

export default Card
