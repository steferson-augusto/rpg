import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Button, CircularProgress } from '@material-ui/core'

import { Container } from './styles'
import Input from '../../../components/Input'
import InputDices from '../../../components/InputDices'
import Checkbox from '../../../components/Checkbox'
import api from '../../../services/api'
import Skill from '../../../models/Skill'

interface FormSkillProps {
  handleCancel: (() => void) | undefined
  mutate: (skill: Skill) => void
}

const FormSkill: React.FC<FormSkillProps> = ({ handleCancel, mutate }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async values => {
    setLoading(true)
    try {
      const { data } = await api.post<Skill>('/skills', values)
      mutate(data)
      setLoading(false)
      handleCancel?.()
    } catch {
      setLoading(false)
      console.error('Não possível adicionar esta perícia')
    }
  }, [])

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>ADICIONAR PERÍCIA</h4>
        <Input
          name="label"
          label="Nome da perícia"
          variant="outlined"
          required
          fullWidth
        />
        <InputDices
          name="dices"
          label="Dados"
          grouped={false}
          variant="outlined"
          required
          fullWidth
        />
        <Input
          name="powerPoints"
          label="Pontos de poder"
          variant="outlined"
          type="number"
          min={0}
          fullWidth
        />
        <Checkbox name="pinned" label="Favorito" fullWidth />
      </div>

      <div className="actions">
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ minWidth: 108 }}
        >
          {loading ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            'Adicionar'
          )}
        </Button>
      </div>
    </Container>
  )
}

export default FormSkill
