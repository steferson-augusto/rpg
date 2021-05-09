import React, { useCallback, useRef } from 'react'

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
  StatData
} from '../../models'
import DialogRoll, {
  DialogRollHandles,
  DialogValues
} from '../../components/DialogRoll'
import Card from './Card'
import Advancement from './Advancement'
import Drawer, { DrawerHandles } from '../../components/Drawer'
import FormAdvancement from './FormAdvancement'
import api from '../../services/api'

const Dashboard: React.FC = () => {
  const dialogRef = useRef<DialogRollHandles>(null)
  const drawerRef = useRef<DrawerHandles>(null)
  const { selected } = usePlayer()

  const {
    data: character,
    loading: loadingCharacter,
    error: errorCharacter
  } = useSwr(`/character/user/${selected?.id}`)

  const { data: pools, loading: loadingPools, error: errorPools } = useSwr<
    StatData[]
  >(`/stats/user/${selected?.id}?energy=1`)

  const { data: stats, loading: loadingStats, error: errorStats } = useSwr<
    StatData[]
  >(`/stats/user/${selected?.id}?energy=0`)

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

  const handleOpenDrawer = useCallback(() => {
    drawerRef.current?.open()
  }, [drawerRef])

  const mutateAdvancement = useCallback(() => {
    mutateAdvancements(advancements, true)
  }, [advancements])

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
      } catch {
        console.error('Falha ao remover vantagem deste usuário')
      }
    },
    [advancements, selected]
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
        >
          {stats?.map(stat => (
            <Stat key={stat.id} data={stat} />
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
            onClick: handleOpenDrawer
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

      <Drawer ref={drawerRef}>
        <FormAdvancement
          handleCancel={drawerRef.current?.close}
          mutate={mutateAdvancement}
        />
      </Drawer>
    </Container>
  )
}

export default Dashboard
