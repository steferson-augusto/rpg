import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { Description } from './styles'
import { DrawerForm } from '../../../../components/Drawer'
import FormButton, {
  FormButtonHandles
} from '../../../../components/FormButton'
import api from '../../../../services/api'
import Input from '../../../../components/Input'
import Character from '../../../../models/Character'

import dwarf from '../../../../assets/images/races/dwarf.png'
import elf from '../../../../assets/images/races/elf.png'
import atlant from '../../../../assets/images/races/atlant.png'
import human from '../../../../assets/images/races/human.png'
import rakashan from '../../../../assets/images/races/rakashan.png'
import halfling from '../../../../assets/images/races/halfling.png'

interface Races {
  [key: string]: {
    description: string
    src: string
    width: string
  }
}

const races: Races = {
  Anão: {
    description: 'A raça mais bela e poderosa de todas',
    src: dwarf,
    width: '250'
  },
  Atlante: {
    description: 'Mesmo tão raro, alguém já tentou fritar um desse?',
    src: atlant,
    width: '250'
  },
  Elfo: {
    description: 'Ainda não foram extintos...',
    src: elf,
    width: '270'
  },
  Humano: {
    description: 'Maior das pragas, basta balançar uma árvore que caem três',
    src: human,
    width: '180'
  },
  Rakashano: {
    description: 'Um novelo de lã se torna uma arma poderosa',
    src: rakashan,
    width: '250'
  },
  Pequenino: {
    description: 'Dos males, o menor',
    src: halfling,
    width: '150'
  }
}

interface FormValues {
  name: string
}

interface CharacterFormProps {
  data: Character | null | undefined
  handleCancel: (() => void) | undefined
  mutate: (data: Character) => void
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  data,
  handleCancel,
  mutate
}) => {
  const [race, setRace] = useState(data?.race)
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)

  const raceObject = races?.[race || ''] || undefined

  useEffect(() => {
    const nameRef = formRef.current?.getFieldRef('name')
    nameRef?.current?.focus()
  }, [])

  const handleChangeRace = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setRace(event.target.value as string)
  }

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const response = await api.put<Character>(`/characters/${data?.id}`, {
          race,
          name: values.name
        })
        mutate?.(response.data)
        handleCancel?.()
      } catch {
        console.error('Não foi possível editar este personagem')
      }
    },
    [race, data]
  )

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>EDITAR PERSONAGEM</h4>
        <Input
          name="name"
          label="Nome"
          variant="outlined"
          defaultValue={data?.name}
          required
          fullWidth
        />
        <Select
          name="race"
          label="Raça"
          variant="outlined"
          onChange={handleChangeRace}
          defaultValue={data?.race}
          fullWidth
          required
        >
          <MenuItem value="Anão">Anão</MenuItem>
          <MenuItem value="Atlante">Atlante</MenuItem>
          <MenuItem value="Elfo">Elfo</MenuItem>
          <MenuItem value="Humano">Humano</MenuItem>
          <MenuItem value="Pequenino">Pequenino</MenuItem>
          <MenuItem value="Rakashano">Rakashano</MenuItem>
        </Select>

        <Description>{raceObject?.description}</Description>
        <img src={raceObject?.src} width={raceObject?.width} />
      </div>

      <div className="actions">
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
        <FormButton ref={formButtonRef} editing={Boolean(data?.id)} />
      </div>
    </DrawerForm>
  )
}

export default React.memo(CharacterForm)
