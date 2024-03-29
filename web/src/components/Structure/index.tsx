import React, { useCallback, useMemo, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { usePlayer } from '../../contexts/player'
import { useAuth } from '../../contexts/auth'

const titles = {
  '/dashboard': 'DASHBOARD',
  '/atributos': 'ATRIBUTOS',
  '/pericias': 'PERÍCIAS',
  '/inventario': 'INVENTÁRIO',
  '/macros': 'MACROS',
  '/macros/forja-de-armas': 'FORJA DE ARMAS',
  '/escudo-do-mestre': 'ESCUDO DO MESTRE',
  '/escudo-do-mestre/vantagens': 'VANTAGENS'
}

type Titles = keyof typeof titles

const Structure: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const ref = useRef<HTMLInputElement>(null)
  const { user, signout } = useAuth()
  const { selected, players, changeSelected } = usePlayer()
  const location = useLocation()
  const open = Boolean(anchorEl)
  const matches = useMediaQuery('(min-width:600px)')

  const title = useMemo(() => titles[location.pathname as Titles], [
    location?.pathname
  ])

  const handleToogleMenu = useCallback(() => {
    if (ref.current !== null) ref.current.checked = !ref.current.checked
  }, [ref])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = useCallback(
    (index: number) => () => {
      if (index >= 0) {
        changeSelected(index)
      }
      setAnchorEl(null)
    },
    [changeSelected]
  )

  const handleLogout = useCallback(() => {
    signout()
  }, [])

  return (
    <Container>
      <AppBar position="static" color="inherit">
        <Header>
          {matches && (
            <IconButton
              edge="start"
              color="default"
              aria-label="menu"
              onClick={handleToogleMenu}
            >
              <i className="material-icons">menu</i>
            </IconButton>
          )}
          <Mark>
            <Left>
              <h3>{title}</h3>
            </Left>
          </Mark>

          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user?.isMaster ? (
                <Avatar
                  alt={selected?.username}
                  src={`https://cdn.discordapp.com/avatars/${selected?.discordId}/${selected?.avatar}.png`}
                />
              ) : (
                <Avatar
                  alt={user?.username}
                  src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatar}.png`}
                />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              style={{ marginTop: -12 }}
              keepMounted
              open={open}
              onClose={handleClose(-1)}
            >
              {players.map((player, index) => (
                <MenuItem key={index} onClick={handleClose(index)}>
                  {player.username}
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </>
        </Header>
      </AppBar>

      <Wrapper>
        {matches && <Check type="checkbox" id="check" ref={ref} />}
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
          <NavLink to="/inventario" className="link">
            <i className="material-icons">backpack</i>
            <span>Inventário</span>
          </NavLink>
          <NavLink to="/macros" className="link">
            <i className="material-icons">smart_toy</i>
            <span>Macros</span>
          </NavLink>
          {user?.isMaster && (
            <NavLink to="/escudo-do-mestre" className="link">
              <i className="material-icons">map</i>
              <span>Escudo do Mestre</span>
            </NavLink>
          )}
        </Sidebar>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  )
}

export default Structure
