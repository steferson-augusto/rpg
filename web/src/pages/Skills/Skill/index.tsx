/* eslint-disable indent */
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  IconButton,
  Tooltip
} from '@material-ui/core'
import produce from 'immer'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import CasinoIcon from '@material-ui/icons/Casino'

import { AccordionBody, Container, Dice } from './styles'
import stages from '../../../data/stages'
import useDebounce from '../../../hooks/useDebounce'
import api from '../../../services/api'
import SkillData from '../../../models/Skill'
import resumeDices from '../../../utils/resumeDices'
import { useDiscord } from '../../../contexts/discord'
import { DialogValues } from '../../../components/DialogRoll'
import withSign from '../../../utils/withSign'
import { useAuth } from '../../../contexts/auth'
import Conditional from '../../../components/Conditional'

interface SkillProps {
  data: SkillData
  openDialog: ((values: DialogValues) => void) | undefined
  mutateDeleteSkill: (id: number) => void
  mutateFavoriteSkill: (id: number) => void
}

const Skill: React.FC<SkillProps> = ({
  data,
  openDialog,
  mutateDeleteSkill,
  mutateFavoriteSkill
}) => {
  const [dices, setDices] = useState(data.dices)
  const [powerPoints, setPowerPoints] = useState({
    value: data.powerPoints,
    label: withSign(data.powerPoints)
  })
  const [loading, setLoading] = useState(false)
  const isFirstRun = useRef({ skill: true, powerPoints: true })
  const sum = useMemo(() => resumeDices(dices), [dices])
  const debounceDices = useDebounce(dices)
  const debouncePowerPoints = useDebounce(powerPoints)
  const { user } = useAuth()
  const { rollSkill } = useDiscord()

  useEffect(() => {
    if (isFirstRun.current?.skill) {
      isFirstRun.current.skill = false
      return
    }

    api.put(`/skills/${data.id}`, { dices })
  }, [debounceDices])

  useEffect(() => {
    if (!user?.isMaster) return

    if (isFirstRun.current?.powerPoints) {
      isFirstRun.current.powerPoints = false
      return
    }

    api.put(`/skills/${data.id}/power-points`, {
      powerPoints: powerPoints.value
    })
  }, [debouncePowerPoints])

  const handleUp = useCallback(
    (index: number) => () => {
      const stage = stages.indexOf(dices[index])
      if (stage < 10) {
        setDices(state =>
          produce(state, draft => {
            draft[index] = stages[stage + 1]
          })
        )
      }
    },
    [dices]
  )

  const handleDown = useCallback(
    (index: number) => () => {
      const stage = stages.indexOf(dices[index])
      if (stage > 0) {
        setDices(state =>
          produce(state, draft => {
            draft[index] = stages[stage - 1]
          })
        )
      }
    },
    [dices]
  )

  const handleDeleteDice = useCallback(
    (index: number) => () => {
      setDices(state =>
        produce(state, draft => {
          draft.splice(index, 1)
        })
      )
    },
    [dices]
  )

  const handleAddDice = useCallback(
    (skill: SkillData) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try {
        setDices(state =>
          produce(state, draft => {
            draft.push('d4')
          })
        )
      } catch {
        console.error(`Falha ao adicionar dado em ${skill.label}`)
      }
    },
    []
  )

  const handleToggleFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try {
        api.put(`/skills/${data.id}`, { pinned: !data.pinned })
        mutateFavoriteSkill(data.id)
      } catch {
        console.error(
          `Não foi possível ${
            data.pinned ? 'desfavoritar' : 'favoritar'
          } esta perícia`
        )
      }
    },
    [data]
  )

  const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      api.delete(`/skills/${data.id}`)
      mutateDeleteSkill(data.id)
    } catch {
      console.error(`Falha ao apagar ${data.label}`)
    }
  }, [])

  const handleRollSkill = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      setLoading(true)
      e.stopPropagation()
      const dices = data.powerPoints !== 0 ? `${sum} ${powerPoints}` : sum
      const values = await rollSkill(data.label, dices)
      openDialog?.({ title: data.label, dices, ...values })
      setLoading(false)
    },
    [data, sum, powerPoints]
  )

  const handleChangePowerPoints = useCallback(
    (value: number) => () => {
      setPowerPoints(prev => {
        const newValue = prev.value + value
        return {
          value: newValue,
          label: withSign(newValue)
        }
      })
    },
    []
  )

  return (
    <Accordion>
      <AccordionSummary
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div className="accordion-header">
          <h3>
            {data.label}
            <span>
              {sum}
              <Tooltip title="Pontos de poder">
                <span>{powerPoints.label}</span>
              </Tooltip>
            </span>
          </h3>

          <div className="actions">
            <Tooltip title="Adicionar novo dado">
              <IconButton onClick={handleAddDice(data)}>
                <AddIcon color="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Rolar dados">
              <IconButton onClick={handleRollSkill} disabled={loading}>
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  <CasinoIcon color="inherit" />
                )}
              </IconButton>
            </Tooltip>

            <Conditional visible={!user?.isMaster}>
              <Tooltip
                title={
                  data.pinned
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'
                }
              >
                <IconButton onClick={handleToggleFavorite}>
                  {data.pinned ? (
                    <StarIcon color="primary" />
                  ) : (
                    <StarOutlineIcon color="action" />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title={`Apagar ${data.label}`}>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </Conditional>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionBody>
          <Container>
            {dices.map((dice, index) => (
              <Dice key={index} elevation={2}>
                {dice === 'd4' ? (
                  <IconButton
                    color="default"
                    disabled={dices.length === 1}
                    onClick={handleDeleteDice(index)}
                    data-testid="btn-delete"
                  >
                    <DeleteIcon
                      color={dices.length > 1 ? 'error' : 'disabled'}
                      fontSize="inherit"
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    color="default"
                    onClick={handleDown(index)}
                    data-testid="btn-minus"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                )}

                <h4 data-testid="attr-dice">{dice}</h4>
                <IconButton
                  color="default"
                  onClick={handleUp(index)}
                  disabled={dice === 'd12+6'}
                  data-testid="btn-plus"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Dice>
            ))}

            <Conditional visible={Boolean(user?.isMaster)}>
              <Dice elevation={2}>
                <IconButton
                  color="default"
                  onClick={handleChangePowerPoints(-1)}
                  disabled={powerPoints.value <= 0}
                  data-testid="btn-minus-power-points"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Tooltip title="Pontos de poder">
                  <h4 data-testid="attr-power-points" className="power-points">
                    {powerPoints.label || '0'}
                  </h4>
                </Tooltip>

                <IconButton
                  color="default"
                  onClick={handleChangePowerPoints(1)}
                  data-testid="btn-plus-power-points"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Dice>
            </Conditional>
          </Container>
          <div className="actions responsive-actions">
            <Tooltip title="Adicionar novo dado">
              <IconButton onClick={handleAddDice(data)}>
                <AddIcon color="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Rolar dados">
              <IconButton onClick={handleRollSkill} disabled={loading}>
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  <CasinoIcon color="inherit" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip
              title={
                data.pinned
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
            >
              <IconButton onClick={handleToggleFavorite}>
                {data.pinned ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarOutlineIcon color="action" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={`Apagar ${data.label}`}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionBody>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(Skill)
