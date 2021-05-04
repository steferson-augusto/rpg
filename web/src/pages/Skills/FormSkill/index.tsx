import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Button, CircularProgress } from '@material-ui/core'

import { Container } from './styles'
import InputDices from '../../../components/InputDices'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import api from '../../../services/api'
import Skill from '../../../models/Skill'
import Autocomplete from '../../../components/Autocomplete'
import useSwr from '../../../hooks/useSWR'
import { useAuth } from '../../../contexts/auth'
import { usePlayer } from '../../../contexts/player'

interface FormSkillProps {
  handleCancel: () => void
  mutate: (skill: Skill) => void
}

const FormSkill: React.FC<FormSkillProps> = ({ handleCancel, mutate }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { user } = useAuth()
  const { selected } = usePlayer()

  const { data, loading: loadingSkills } = useSwr<Array<{ label: string }>>(
    '/skills'
  )

  useEffect(() => {
    const label = formRef?.current?.getFieldRef('label')
    label?.focus?.()
  }, [])

  const handleSubmit = useCallback(
    async values => {
      setLoading(true)
      try {
        if (user?.isMaster) {
          values.userId = selected?.id
        }
        const { data } = await api.post<Skill>('/skills', values)
        mutate(data)
        setLoading(false)
        handleCancel?.()
      } catch {
        setLoading(false)
        console.error('Não possível adicionar esta perícia')
      }
    },
    [user, selected]
  )

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>ADICIONAR PERÍCIA</h4>
        <Autocomplete
          name="label"
          label="Nome da perícia"
          loading={loadingSkills}
          options={data?.map(({ label }) => ({ label, value: label })) || []}
          fullWidth
          required
        />

        <InputDices
          name="dices"
          label="Dados"
          grouped={false}
          variant="outlined"
          required
          fullWidth
        />
        {user?.isMaster && (
          <Input
            name="powerPoints"
            label="Pontos de poder"
            type="number"
            min={0}
            defaultValue="0"
            variant="outlined"
            fullWidth
          />
        )}
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
            <CircularProgress size={24} color="secondary" />
          ) : (
            'Adicionar'
          )}
        </Button>
      </div>
    </Container>
  )
}

export default FormSkill
