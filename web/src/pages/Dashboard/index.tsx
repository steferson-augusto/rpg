import React, { useCallback, useRef, useState } from 'react'

import { Container } from './styles'
import Pool from './Pool'
import Stat from './Stat'
import Dice from './Dice'
import useSwr from '../../hooks/useSWR'
import { usePlayer } from '../../contexts/player'
import {
  AttributeData,
  AdvancementData,
  SkillData,
  StatData,
  CharacterData
} from '../../models'
import DialogRoll, {
  DialogRollHandles,
  DialogValues
} from '../../components/DialogRoll'
import Card from './Card'
import Advancement from './Advancement'
import Drawer, { DrawerHandles } from '../../components/Drawer'
import FormAdvancement from './Forms/FormAdvancement'
import api from '../../services/api'
import Conditional from '../../components/Conditional'
import FormStat from './Forms/FormStat'
import { useAuth } from '../../contexts/auth'
import FormCharacter from './Forms/FormCharacter'
import produce from 'immer'

type Form = 'advancement' | 'stat' | 'character' | null

const Dashboard: React.FC = () => {
  const [formType, setFormType] = useState<Form>('advancement')
  const dialogRef = useRef<DialogRollHandles>(null)
  const drawerRef = useRef<DrawerHandles>(null)
  const stat = useRef<StatData | null>(null)
  const { user } = useAuth()
  const { selected } = usePlayer()

  const {
    data: character,
    loading: loadingCharacter,
    error: errorCharacter,
    mutate: mutateCharacters
  } = useSwr<CharacterData>(`/character/user/${selected?.id}`)

  const { data: pools, loading: loadingPools, error: errorPools } = useSwr<
    StatData[]
  >(`/stats/user/${selected?.id}?energy=1`)

  const {
    data: stats,
    loading: loadingStats,
    error: errorStats,
    mutate: mutateStats
  } = useSwr<StatData[]>(`/stats/user/${selected?.id}?energy=0`)

  const {
    data: advancements,
    loading: loadingAdvancements,
    error: errorAdvancements,
    mutate: mutateAdvancements
  } = useSwr<AdvancementData[]>(`/advancements/user/${selected?.id}`)

  const {
    data: attributes,
    loading: loadingAttributes,
    error: errorAttributes
  } = useSwr<AttributeData[]>(`/attributes/${selected?.id}`)

  const { data: skills, loading: loadingskills, error: errorSkills } = useSwr<
    SkillData[]
  >(`/skills/user/${selected?.id}?favorites=1`)

  const handleOpenDialog = useCallback(
    (values: DialogValues) => {
      dialogRef.current?.open(values)
    },
    [dialogRef]
  )

  const handleOpenDrawer = useCallback(
    (type: Form) => () => {
      setFormType(type)
      drawerRef.current?.open()
    },
    [drawerRef]
  )

  const handleCloseDrawer = useCallback(() => {
    setFormType(null)
  }, [])

  const mutateAdvancement = useCallback(() => {
    mutateAdvancements(advancements, true)
    mutateStats(stats, true)
  }, [advancements, stats])

  const mutateStat = useCallback(() => {
    mutateStats(stats, true)
  }, [stats])

  const mutateCharacter = useCallback(
    (data: CharacterData) => {
      if (character) {
        const newCharacter = produce(character, draft => {
          draft.name = data.name
          draft.race = data.race
        })
        mutateCharacters(newCharacter, false)
      }
    },
    [character]
  )

  const handleDeleteAdvancement = useCallback(
    (id: number) => async () => {
      try {
        await api.delete(`/user/advancements/${id}`, {
          data: { userId: selected?.id }
        })
        const newData = advancements?.filter(
          advancement => advancement.id !== id
        )
        mutateAdvancements(newData, false)
        mutateStats(stats, true)
      } catch {
        console.error('Falha ao remover vantagem deste usuário')
      }
    },
    [advancements, selected, stats]
  )

  const handleEditStat = useCallback(
    (data: StatData) => () => {
      stat.current = data
      setFormType('stat')
      drawerRef.current?.open()
    },
    [drawerRef]
  )

  return (
    <Container>
      <div className="column">
        <Card
          className="character"
          title="Personagem"
          loading={loadingCharacter}
          error={errorCharacter}
          empty={false}
          loadingHeight="50px"
          action={{
            icon: 'edit',
            onClick: handleOpenDrawer('character')
          }}
        >
          <ul>
            <li>{character?.name}</li>
            <li>{character?.race}</li>
          </ul>
          <p>{character?.xp} XP</p>
        </Card>
        <Card
          title="Status"
          loading={loadingStats}
          error={errorStats}
          empty={stats?.length === 0}
          action={{
            icon: 'add',
            onClick: handleOpenDrawer('stat')
          }}
        >
          {stats?.map(stat => (
            <Stat
              key={stat.id}
              data={stat}
              canDelete={Boolean(user?.isMaster)}
              handleEdit={handleEditStat}
              mutate={mutateStat}
            />
          ))}
        </Card>
        <Card
          title="Vantagens"
          preTitle="des"
          loading={loadingAdvancements}
          error={errorAdvancements}
          empty={advancements?.length === 0}
          action={{
            icon: 'add',
            onClick: handleOpenDrawer('advancement')
          }}
        >
          {advancements?.map(advancement => (
            <Advancement
              key={advancement.id}
              data={advancement}
              handleDelete={handleDeleteAdvancement}
            />
          ))}
        </Card>
      </div>
      <div className="column">
        <Card
          className="pools"
          title="Energias"
          loading={loadingPools}
          error={errorPools}
          empty={pools?.length === 0}
        >
          {pools?.map(pool => (
            <Pool key={pool.id} data={pool} />
          ))}
        </Card>
      </div>
      <div className="column">
        <Card
          title="Atributos"
          loading={loadingAttributes}
          error={errorAttributes}
          empty={attributes?.length === 0}
        >
          {attributes?.map(attribute => (
            <Dice
              key={attribute.id}
              data={attribute}
              handleOpenDialog={handleOpenDialog}
            />
          ))}
        </Card>
        <Card
          title="Perícias"
          loading={loadingskills}
          error={errorSkills}
          empty={skills?.length === 0}
        >
          {skills?.map(skill => (
            <Dice
              key={skill.id}
              data={skill}
              handleOpenDialog={handleOpenDialog}
            />
          ))}
        </Card>
        <div className="spacer" />
      </div>
      <DialogRoll ref={dialogRef} />

      <Drawer ref={drawerRef} onClose={handleCloseDrawer}>
        <Conditional visible={formType === 'advancement'}>
          <FormAdvancement
            handleCancel={drawerRef.current?.close}
            mutate={mutateAdvancement}
          />
        </Conditional>
        <Conditional visible={formType === 'stat'}>
          <FormStat
            data={stat.current}
            handleCancel={drawerRef.current?.close}
            mutate={mutateStat}
          />
        </Conditional>
        <Conditional visible={formType === 'character'}>
          <FormCharacter
            data={character}
            handleCancel={drawerRef.current?.close}
            mutate={mutateCharacter}
          />
        </Conditional>
      </Drawer>
    </Container>
  )
}

export default Dashboard
