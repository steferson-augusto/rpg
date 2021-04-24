/* eslint-disable indent */
import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Button, IconButton, Typography } from '@material-ui/core'

import { Container } from './styles'
import Input from '../../../components/Input'
import roll from '../../../utils/roll'
import InputDices from '../../../components/InputDices'
import { useSnackbar } from '../../../contexts/snackbar'

interface FormValues {
  quantity: number
  grade: number
  weight: number
  time: number
  dices: string[]
}

interface State {
  failed: number
  success: number
  difficulty: number
  time: number
}

const WeaponSmith: React.FC = () => {
  const [state, setState] = useState<State | null>(null)
  const [items, setItems] = useState<Array<[number, number]>>([])
  const formRef = useRef<FormHandles>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const snackbar = useSnackbar()

  const handleSubmit = useCallback((values: FormValues) => {
    const { grade, quantity, weight, dices, time: timeGlobal } = values
    let time = timeGlobal

    const minTime = grade * (120 + 15 * grade * 1.1 * (weight - 1))

    if (time > 0 && minTime - Math.abs(time) * 30 < 30) {
      time = Math.floor((minTime - 30) / 30)
    }

    const percent =
      time < 0
        ? Math.pow(0.9, Math.abs(time))
        : time > 0
        ? Math.pow(1.25, time)
        : 1
    const difficulty = Math.ceil(
      (grade * 15 + (weight + (grade * 0.15 * minTime) / 60)) * percent
    )

    let success = 0
    const list = new Map<number, number>()
    for (let i = 0; i < quantity; i++) {
      const { total } = roll(dices)
      if (total >= difficulty) {
        success = success + 1
        const quality = Math.floor(
          ((total + weight) / 125) * (125 * grade + total + weight)
        )
        const sum = list.get(quality) || 0
        list.set(quality, sum + 1)
      }
    }

    const newList = Array.from(list)
    newList.sort(([a], [b]) => a - b)
    setItems(newList)
    setState({
      difficulty,
      success,
      failed: quantity - success,
      time: minTime - time * 30
    })
  }, [])

  const handleCopyTable = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tableRef?.current?.innerText ?? '').then(
        () => {
          snackbar.open('🚀 Copiado para área de transferência')
        },
        () => {
          snackbar.open('🔥 Falha ao copiar para área de transferência')
        }
      )
    }
  }, [tableRef?.current])

  return (
    <Container>
      <Form ref={formRef} className="form" onSubmit={handleSubmit}>
        <div className="content">
          <Input
            name="quantity"
            label="Tentativas"
            variant="outlined"
            defaultValue="1"
            type="number"
            maxWidth={100}
            min={1}
          />
          <Input
            name="grade"
            label="Grau"
            variant="outlined"
            type="number"
            defaultValue="1"
            maxWidth={100}
            min={1}
            max={10}
          />
          <Input
            name="weight"
            label="Peso (kg)"
            defaultValue="1"
            variant="outlined"
            type="number"
            maxWidth={100}
            min={1}
          />
          <Input
            name="time"
            label="Dedicação"
            variant="outlined"
            defaultValue="0"
            type="number"
            maxWidth={100}
          />
          <InputDices
            name="dices"
            label="Dados"
            variant="outlined"
            required
            placeholder="5d12 2d4 +12"
            defaultValue="5d12 2d4 +12"
            minWidth={300}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          Calcular
        </Button>
      </Form>
      {Boolean(state) && (
        <div className="state">
          <Typography>Dificuldade: {state?.difficulty}</Typography>
          <Typography>Tempo: {state?.time} minutos</Typography>
          <Typography color="primary">Acertos: {state?.success}</Typography>
          <Typography color="error">Falhas: {state?.failed}</Typography>
        </div>
      )}

      {items.length > 0 && (
        <div className="items">
          <table ref={tableRef} className="items">
            <thead>
              <tr>
                <th>Qualidade</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {items.map(([quality, quantity], index) => (
                <tr key={index}>
                  <td>{quality}</td>
                  <td>{quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <IconButton
            onClick={handleCopyTable}
            color="primary"
            className="copy"
          >
            <i className="material-icons">content_copy</i>
          </IconButton>
        </div>
      )}
    </Container>
  )
}

export default WeaponSmith
