/* eslint-disable multiline-ternary */
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
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { usePlayer } from '../../contexts/player'
import { useAuth } from '../../contexts/auth'

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const ref = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const { selected, players, changeSelected } = usePlayer()
  const location = useLocation()
  const open = Boolean(anchorEl)

  const title = useMemo(() => titles[location.pathname as keyof Titles], [
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
          {user?.isMaster ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={selected?.username}
                  src={`https://cdn.discordapp.com/avatars/${selected?.discordId}/${selected?.avatar}.png`}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose(-1)}
              >
                {players.map((player, index) => (
                  <MenuItem key={index} onClick={handleClose(index)}>
                    {player.username}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Avatar
              alt={user?.username}
              src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatar}.png`}
            />
          )}
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
