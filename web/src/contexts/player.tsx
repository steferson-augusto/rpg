/* eslint-disable camelcase */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'

import api from '../services/api'
import { useAuth, UserData } from './auth'

interface PlayerContextData {
  selected: UserData | null
  players: UserData[]
  changeSelected: (index: number) => void
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData)

export const PlayerProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<UserData | null>(null)
  const [players, setPlayers] = useState<UserData[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user?.isMaster) {
      api.get<UserData[]>('/users').then(({ data }) => {
        setSelected(data.length > 0 ? data[0] : null)
        setPlayers(data.filter(player => player.isPlayer))
      })
    } else {
      setSelected(user)
    }
  }, [user])

  const changeSelected = useCallback(
    (index: number) => {
      setSelected(players[index] ?? null)
    },
    [players]
  )

  return (
    <PlayerContext.Provider value={{ selected, players, changeSelected }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = (): PlayerContextData => {
  const context = useContext(PlayerContext)

  return context
}
