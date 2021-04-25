import React, { useCallback, useState } from 'react'
import { CircularProgress, IconButton, Paper, Tooltip } from '@material-ui/core'
import StarIcon from '@material-ui/icons/StarOutline'
import CasinoIcon from '@material-ui/icons/Casino'

import { Container } from './styles'
import Skill from '../../../models/Skill'
import resumeDices from '../../../utils/resumeDices'
import { useDiscord } from '../../../contexts/discord'
import { DialogValues } from '../../../components/DialogRoll'
import api from '../../../services/api'
import withSign from '../../../utils/withSign'

interface FavoritesProps {
  data: Skill[]
  openDialog: ((values: DialogValues) => void) | undefined
  mutateFavoriteSkill: (id: number) => void
}

const Favorites: React.FC<FavoritesProps> = ({
  data,
  openDialog,
  mutateFavoriteSkill
}) => {
  const [loading, setLoading] = useState(false)
  const { rollSkill } = useDiscord()

  const handleRoll = useCallback(
    (index: number) => async () => {
      setLoading(true)
      const skill = data?.[index]
      const dicesDirty = resumeDices(skill.dices)
      const dices =
        skill.powerPoints !== 0
          ? `${dicesDirty} ${withSign(skill.powerPoints)}`
          : dicesDirty
      const values = await rollSkill(skill.label, dices)
      openDialog?.({ title: skill.label, dices, ...values })
      setLoading(false)
    },
    [openDialog]
  )

  const handleRemoveFavorite = useCallback(
    (index: number) => () => {
      try {
        const id = data?.[index].id
        api.put(`/skills/${id}`, { pinned: false })
        mutateFavoriteSkill(id)
      } catch {
        console.error('Não foi possível dessfavoritar esta perícia')
      }
    },
    []
  )

  return (
    <Container>
      {data?.map((skill, index) => (
        <Paper key={skill.id} className="skill">
          <p>{skill.label}</p>
          <span className="dices">{`${resumeDices(skill.dices)} ${withSign(
            skill.powerPoints
          )}`}</span>
          <div className="actions">
            <Tooltip title="Rolar dados">
              <IconButton onClick={handleRoll(index)} disabled={loading}>
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  <CasinoIcon color="inherit" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Remover dos favoritos">
              <IconButton onClick={handleRemoveFavorite(index)}>
                <StarIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      ))}
    </Container>
  )
}

export default React.memo(Favorites)
