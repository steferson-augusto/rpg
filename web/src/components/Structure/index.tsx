import React, { useCallback, useMemo, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'

import {
  Header,
  Left,
  Sidebar,
  Mark,
  Container,
  Wrapper,
  Check,
  Content
} from './styles'

interface Titles {
  '/dashboard': string
  '/atributos': string
  '/pericias': string
  '/itens': string
}

const titles: Titles = {
  '/dashboard': 'DASHBOARD',
  '/atributos': 'ATRIBUTOS',
  '/pericias': 'PERÍCIAS',
  '/itens': 'ITENS'
}

const Structure: React.FC = ({ children }) => {
  const ref = useRef<HTMLInputElement>(null)
  const location = useLocation()

  const title = useMemo(() => titles[location.pathname as keyof Titles], [
    location?.pathname
  ])

  const handleToogleMenu = useCallback(() => {
    if (ref.current !== null) ref.current.checked = !ref.current.checked
  }, [ref])

  return (
    <Container>
      <AppBar position="static">
        <Header>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToogleMenu}
          >
            <i className="material-icons">menu</i>
          </IconButton>
          <Mark>
            <Left>
              <h3>{title}</h3>
            </Left>
          </Mark>
        </Header>
      </AppBar>

      <Wrapper>
        <Check type="checkbox" id="check" ref={ref} />
        <Sidebar className="sidebar">
          <NavLink to="/dashboard" className="link" activeClassName="active">
            <i className="material-icons">dashboard</i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/atributos" className="link">
            <i className="material-icons">fitness_center</i>
            <span>Atributos</span>
          </NavLink>
          <NavLink to="/pericias" className="link">
            <i className="material-icons">directions_run</i>
            <span>Perícias</span>
          </NavLink>
          <NavLink to="/itens" className="link">
            <i className="material-icons">backpack</i>
            <span>Itens</span>
          </NavLink>
        </Sidebar>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  )
}

export default Structure
