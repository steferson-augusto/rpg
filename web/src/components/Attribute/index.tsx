/* eslint-disable multiline-ternary */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import produce from 'immer'
import IconButton from '@material-ui/core/IconButton'
import CasinoIcon from '@material-ui/icons/Casino'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Snackbar } from '@material-ui/core'

import { AttributeLabel, DiceData } from '../../models'
import stages from '../../data/stages'
import api from '../../services/api'
import { Container, Dice } from './styles'
import resumeDices from '../../utils/resumeDices'
import Conditional from '../Conditional'
import useDebounce from '../../hooks/useDebounce'
import { useDiscord } from '../../contexts/discord'
import { ModalValues } from '../../pages/Attributes'

interface AttributeProps {
  id: number
  title: AttributeLabel
  values: DiceData[]
  onRoll: (modal: ModalValues) => void
}

const Attribute: React.FC<AttributeProps> = ({ title, values, id, onRoll }) => {
  const [dices, setDices] = useState(values)
  const isFirstRun = useRef(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [snackbar, setSnackbar] = useState('')
  const debounce = useDebounce(dices)
  const sum = useMemo(() => resumeDices(dices), [dices])
  const { rollAttribute } = useDiscord()

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    api.put(`/attributes/${id}`, { dices })
  }, [debounce])

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

  const handleDelete = useCallback(
    (index: number) => () => {
      setDices(state =>
        produce(state, draft => {
          draft.splice(index, 1)
        })
      )
    },
    [dices]
  )

  const handleCopyDice = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(sum)
        .then(
          () => {
            setSnackbar('🚀 Copiado para área de transferência')
          },
          () => {
            setSnackbar('🔥 Falha ao copiar para área de transferência')
          }
        )
        .finally(() => setOpen(true))
    }
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleAddDice = useCallback(() => {
    setDices(state =>
      produce(state, draft => {
        draft.push('d4')
      })
    )
  }, [dices])

  const handleEditing = useCallback(() => {
    setEditing(prev => !prev)
  }, [editing])

  const handleRoll = useCallback(async () => {
    const result = await rollAttribute(title, sum)
    onRoll({ title, dices: sum, ...result })
  }, [sum])

  return (
    <Container editing={editing ? 1 : 0} elevation={1}>
      <div className="header">
        <h3 onClick={handleCopyDice}>
          {title}: <span>{sum}</span>
        </h3>
        <div>
          <IconButton color="default" onClick={handleEditing}>
            {editing ? (
              <i className="material-icons">edit_off</i>
            ) : (
              <EditIcon fontSize="inherit" />
            )}
          </IconButton>
          <IconButton color="default" onClick={handleAddDice}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <div className="content">
        <div className="dices">
          {dices.map((dice, index) => (
            <Dice key={index} elevation={2}>
              <Conditional visible={editing}>
                {dice === 'd4' ? (
                  <IconButton
                    color="default"
                    disabled={dices.length === 1}
                    onClick={handleDelete(index)}
                  >
                    <DeleteIcon
                      color={dices.length > 1 ? 'error' : 'disabled'}
                      fontSize="inherit"
                    />
                  </IconButton>
                ) : (
                  <IconButton color="default" onClick={handleDown(index)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                )}
              </Conditional>
              <h4>{dice}</h4>
              <Conditional visible={editing}>
                <IconButton
                  color="default"
                  onClick={handleUp(index)}
                  disabled={dice === 'd12+6'}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Conditional>
            </Dice>
          ))}
        </div>
        <IconButton color="default" onClick={handleRoll}>
          <CasinoIcon fontSize="large" />
        </IconButton>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar}
      />
    </Container>
  )
}

export default Attribute
